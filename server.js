const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const nano = require('./Schemas/nano.js');
const nanoID = require('./nanoID.js');

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
    response.render('index');
});

app.get('/link', async (request, response) => {
    const nanolinks = await nano.find();

    response.render('link', { nanolinks: nanolinks });
});

app.get('/:nano', async (request, response) => {
    const nanolink = await nano.findOne({ nanolink: request.params.nano });

    if (nanolink === null) {
        return response.redirect('/');
    }

    nanolink.clicks++;
    nanolink.save();

    response.redirect(nanolink.link)
});

app.post('/nanolink', async (request, response) => {
    if (request.body.link === '') {
        return response.redirect('/link');
    };

    await nano.create({
        link: request.body.link,
        nanolink: nanoID(7)
    });

    response.redirect('/link');
});

app.listen(3000, () => {
    console.log('Beep!')
});