const mongoose = require('mongoose');

const user = new mongoose.Schema({
    id: {
        type: String
    },

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