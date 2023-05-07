const mongoose = require('mongoose');

const contactsSchema = new mongoose.Schema ({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    favoriteColor: {
        type: String
    },
    birthday: {
        type: String
    }
});

const Contacts = mongoose.model('contacts', contactsSchema);

module.exports = Contacts;