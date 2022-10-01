const mongoose = require('mongoose');

const woozy = new mongoose.Schema({
    email: {
        type: String
    },

    shortURL: {
        type: String
    },

    longURL: {
        type: String
    },

    clicks: {
        type: Number,
        default: 0
    },

    date: {
        type: String
    }
});

module.exports = mongoose.model('woozy', woozy);