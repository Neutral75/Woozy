const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config()
const user = require('./Schemas/user.js');
const woozy = require('./Schemas/woozy.js');
const woozyID = require('./woozyID.js');

mongoose.connect(`${process.env.mongodbURL}`, {
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

app.get('/:woozy', async (request, response) => {
    const woozylink = await woozy.findOne({
        shortURL: request.params.woozy
    });

    if (woozylink === null) {
        return response.redirect('/');
    };

    woozylink.clicks++;
    woozylink.save();

    response.redirect(woozylink.longURL);
});

app.post('/woozylink', async (request, response) => {
    if (!request.body.url) {
        return response.redirect('/');
    };

    if (request.body.email.toLowerCase()) {
        const userSchema = await user.findOne({
            email: request.body.email.toLowerCase()
        }) || await user.create({
            email: request.body.email.toLowerCase()
        });

        userSchema.urls += 1;
        userSchema.save();
    };

    const shortURL = woozyID(7);
    const longURL = request.body.url;

    await woozy.create({
        email: request.body.email.toLowerCase() || 'None',
        shortURL: shortURL,
        longURL: longURL,
        date: new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' })
    });

    response.render('success', {
        email: request.body.email,
        shortURL: shortURL,
        longURL: longURL
    });
});

app.post('/woozyinfo', async (request, response) => {
    if (!request.body.email) {
        return response.redirect('/');
    };

    const userSchema = await user.findOne({
        email: request.body.email.toLowerCase()
    });

    const woozylink = await woozy.find({
        email: request.body.email.toLowerCase()
    });

    response.render('info', {
        userSchema: userSchema,
        woozylink: woozylink
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Beep!');
});