const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fizzy = require('./Schemas/fizzy.js');
const fizzyID = require('./fizzyID.js');

mongoose.connect('', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../')));

app.set('views', path.join(__dirname, './Website'));
app.set('view engine', 'ejs');

app.get('/', async (request, response) => {
    response.render('home');
});

app.get('/home', async (request, response) => {
    response.render('home');
});

app.get('/link', async (request, response) => {
    const fizzylink = await fizzy.find();

    response.render('link', { fizzylink: fizzylink });
});

app.get('/:fizzy', async (request, response) => {
    const fizzylink = await fizzy.findOne({
        data: {
            shortURL: request.params.fizzy
        }
    });

    if (fizzylink === null) {
        return response.redirect('/');
    }

    fizzylink.clicks++;
    fizzylink.save();

    response.redirect(fizzylink.data.longURL)
});

app.post('/fizzylink', async (request, response) => {
    if (request.body.link === '') {
        return response.redirect('link');
    };

    await fizzy.create({
        data: {
            shortURL: fizzyID(6),
            longURL: request.body.link
        }
    });

    response.redirect('link');
});

app.listen(3000, () => {
    console.log('Beep!')
});