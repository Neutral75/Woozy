const mongoose = require('mongoose');

const nano = new mongoose.Schema({
    userID: String,
    userEmail: String,
    link: {
        type: String
    },
    nanolink: {
        type: String
    },
    clicks: {
        type: Number,
        default: 0
    },
});

module.exports = mongoose.model('nano', nano);