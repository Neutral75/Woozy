const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fizzy = require('./Schemas/fizzy.js');
const fizzyID = require('./fizzyID.js');

mongoose.connect('mongodb+srv://Neutral75:GringottsPassword@gringotts.tuvpqzf.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../')));

app.set('views', path.join(__dirname, './Website'));
app.set('view engine', 'ejs');

app.get('/', async (request, response) => {
    response.render('index');
});

app.get('/link', async (request, response) => {
    const fizzylinks = await fizzy.find();

    response.render('link', { fizzylinks: fizzylinks });
});

app.get('/:fizzy', async (request, response) => {
    const fizzylink = await fizzy.findOne({
        date: {
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
        return response.redirect('/link');
    };

    await fizzy.create({
        data: {
            longURL: request.body.link,
            shortURL: fizzyID(7)
        }
    });

    response.redirect('/link');
});

app.listen(3000, () => {
    console.log('Beep!')
});