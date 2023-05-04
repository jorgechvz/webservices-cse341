const db = require('../models');
const { ObjectId } = require('mongodb');
const User = db.Users;

const getAllUsers = async (req, res) => {
  await User.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const getSingleUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  await User.find({ _id: userId })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const createUser = async (req, res) => {
  const newUser = new User(req.body);
  /* if (!req.params.name || !req.params.password || !req.params.email) {
    res.status(201).send({message: 'Content can not be empty'});
    return;
  } */
  await newUser
    .save()
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const updateUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const updateUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    updated_at: Date.now()
  };
  await User.findOneAndUpdate({ _id: userId }, { $set: updateUser }, { new: true })
    .then((data) => {
      if (!data) {
        throw new Error('User not found!');
      }
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const deleteUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  await User.deleteOne({ _id: userId })
    .then((data) => {
      res.status(201).send('User deleted successfully');
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser
};
