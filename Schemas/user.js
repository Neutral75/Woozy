const mongoose = require('mongoose');

const user = new mongoose.Schema({
    email: {
        type: String
    },

    premium: {
        type: Boolean,
        default: false
    },

    urls: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('user', user);