const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ContactSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    type: {
        type: String,
        default: 'Personal'
    },
    date: {
        type: Date,
        default: Date.now
    }
});
var Contact =mongoose.model('Contact', ContactSchema);
module.exports = Contact;