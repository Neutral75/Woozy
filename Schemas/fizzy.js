const mongoose = require('mongoose');

const fizzy = new mongoose.Schema({
    data: {
        id: {
            type: String
        },
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
        }
    }
});

module.exports = mongoose.model('fizzy', fizzy);