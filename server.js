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

app.get('/', async (req, res) => {
    res.render('index');
});

app.get('/link', async (req, res) => {
    const nanolinks = await nano.find();

    res.render('link', { nanolinks: nanolinks });;
});

app.get('/:nano', async (req, res) => {
    const nanolink = await nano.findOne({ nanolink: req.params.nano });

    if (nanolink === null) {
        return res.redirect('/');
    }

    nanolink.clicks++;
    nanolink.save();

    res.redirect(nanolink.link)
});

app.post('/nanolink', async (req, res) => {
    await nano.create({
        link: req.body.link,
        nanolink: nanoID(7)
    });

    res.redirect('/link');
});

app.listen(3000, () => {
    console.log('Beep!')
});