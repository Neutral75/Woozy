const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const nano = require('./Schemas/nano.js');

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


app.listen(3000);