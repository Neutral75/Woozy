const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const user = require('./Schemas/user.js');
const fizzy = require('./Schemas/fizzy.js');
const fizzyID = require('./fizzyID.js');

mongoose.connect('', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './Website')));

app.set('views', path.join(__dirname, './Website'));
app.set('view engine', 'ejs');

app.get('/', async (request, response) => {
    response.render('home');
});

app.get('/home', async (request, response) => {
    response.render('home');
});

app.get('/link', async (request, response) => {
    response.render('link');
});

app.get('/:fizzy', async (request, response) => {
    const fizzylink = await fizzy.findOne({
        shortURL: request.params.fizzy
    });

    if (fizzylink === null) {
        return response.redirect('/');
    };

    fizzylink.clicks++;
    fizzylink.save();

    response.redirect(fizzylink.longURL);
});

app.post('/fizzylink', async (request, response) => {
    if (!request.body.link) {
        return response.redirect('link');
    };

    if (request.body.email) {
        const userSchema = await user.findOne({
            email: request.body.email 
        }) || await user.create({
            email: request.body.email
        });

        userSchema.urls += 1;
        userSchema.save();
    };

    const shortURL = fizzyID(6);
    const longURL = request.body.link;

    await fizzy.create({
        email: request.body.email || 'None',
        shortURL: shortURL,
        longURL: longURL,
        date: new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' })
    });

    response.render('success', {
        shortURL: shortURL,
        longURL: longURL
    });
});

app.post('/fizzyinfo', async (request, response) => {
    if (!request.body.email) {
        return response.redirect('link');
    };

    const userSchema = await user.findOne({
        email: request.body.email
    });

    const fizzylink = await fizzy.find({
        email: request.body.email
    });

    response.render('info', {
        userSchema: userSchema,
        fizzylink: fizzylink
    });
});

app.listen(3000, () => {
    console.log('Beep!');
});