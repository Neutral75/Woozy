const mongoose = require('mongoose');

const fizzy = new mongoose.Schema({
    data: {
        email: {
            type: String,
            default: 'None'
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
        }
    }
});

module.exports = mongoose.model('fizzy', fizzy);