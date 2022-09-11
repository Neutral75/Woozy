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

app.post('/nanolink', async (request, response) => {
    await nano.create({ 
        link: request.body.link,
        nanolink: nanoID(7)
    });
    res.redirect('/');
});

app.listen(3000);