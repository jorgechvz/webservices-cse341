const { ObjectId } = require('mongodb');
const mongodb = require('../database/connect');

const getData = async (req, res, next) => {
  const result = await mongodb.getDB().db('User').collection('contacts').find();
  result
    .toArray()
    .then((lists) => {
      if (lists.length > 0) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      } else {
        res.status(400).send('Not Found Results');
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error in server');
    });
};

const getSingleData = async (req, res, next) => {
  const contactId = new ObjectId(req.params.id);
  const result = await mongodb.getDB().db('User').collection('contacts').find({ _id: contactId });
  result
    .toArray()
    .then((lists) => {
      if (lists.length > 0) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
      } else {
        res.status(400).send('Not Found Results');
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error in server');
    });
};

const createData = async (req, res, next) => {
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;
  const newContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const result = await mongodb.getDB().db('User').collection('contacts').insertOne(newContact);
  if (result.acknowledged) {
    const createdContact = {
      _id: result.insertedId.toString(),
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    };
    console.log(createdContact);
    res.status(201).json(result);
  } else {
    res.status(500).json(result.error || 'An error with create new contact');
  }
};

const updateData = async (req, res, next) => {
  const contactId = new ObjectId(req.params.id);
  const updateContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const result = await mongodb
    .getDB()
    .db('User')
    .collection('contacts')
    .replaceOne({ _id: contactId }, updateContact);
  if (result.modifiedCount > 0) {
    res.status(204).send();
    console.log('Contact Updated Successfully');
  } else {
    res.status(500).json(result.error || 'Some error occurred while updating the contact.');
  }
};

const deleteData = async (req, res, next) => {
  const contactId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDB()
    .db('User')
    .collection('contacts')
    .deleteOne({ _id: contactId }, true);
  if (result.deletedCount > 0) {
    res.status(200).send('Contact deleted successfully');
  } else {
    res.status(500).json(result.error || 'Some error occurred while delete the contact.');
  }
};

module.exports = {
  getData,
  getSingleData,
  createData,
  updateData,
  deleteData
};
