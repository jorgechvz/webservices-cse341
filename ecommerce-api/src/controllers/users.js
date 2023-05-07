const db = require('../models');
const { ObjectId } = require('mongodb');

const {userValidation, updateUserValidation} = require('../utils/usersValidation');

const User = db.Users;

const getAllUsers = async (req, res) => {
  try {
    await User.find({})
      .then((data) => {
        if(!data) res.status(404).send({message: `Not Users Found` })
        else res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: `Error with find users`,
          error: err
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSingleUser = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    await User.find({ _id: userId })
      .then((data) => {
        if(!data) res.status(404).send({message: `Not Users Found with id:${userId}` })
        else res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: `Error with find users with id:${userId}`,
          error: err
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

const createUser = async (req, res) => {
  try {
    const { error, value } = userValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const newUser = new User(req.body);
    await newUser
      .save()
      .then((data) => {
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while creating the user.'
        });
      });
  } catch(err) {
    res.status(500).json(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const { error, value } = updateUserValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
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
        res.status(204).send();
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while updating the user.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    await User.deleteOne({ _id: userId })
      .then((data) => {
        res.status(200).send('User deleted successfully');
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while deleting the user.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser
};
