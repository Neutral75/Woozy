const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.listen(3000);