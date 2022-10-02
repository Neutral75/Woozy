const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const user = require('./Schemas/user.js');
const woozy = require('./Schemas/woozy.js');
const woozyID = require('./woozyID.js');

mongoose.connect('mongodb+srv://Neutral75:Gringotts@gringotts.tuvpqzf.mongodb.net/?retryWrites=true&w=majority', {
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
    if (!request.body.link) {
        return response.redirect('link');
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

    const shortURL = woozyID(6);
    const longURL = request.body.link;

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
        return response.redirect('link');
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

app.listen(3000, () => {
    console.log('Beep!');
});