const db = require('../models');
const Contacts = db.Contacts;
const { ObjectId } = require('mongodb');

const getAllContacts = async (req, res) => {
    await Contacts.find({})
    .then((data) => {
        res.send(data)
    })
}

const getSingleContacts = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    await Contacts.find({_id: contactId})
    .then ((data) => {
        res.send(data);
    }) 
}

module.exports = {
    getAllContacts,
    getSingleContacts
}