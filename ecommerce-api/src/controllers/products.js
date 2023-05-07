const db = require('../models');
const { ObjectId } = require('mongodb');
const Products = db.Products;

const { createProductValidation, updateProductValidation } = require('../utils/productsValidation');

const getAllProducts = async (req, res) => {
  try {
    await Products.find({})
      .then((data) => {
        if (!data) res.status(404).send({ message: `Not Products Found` });
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

const getSingleProduct = async (req, res) => {
  try {
    const productId = new ObjectId(req.params.id);
    await Products.find({ _id: productId })
      .then((data) => {
        if (!data) res.status(404).send({ message: `Not Product Found with id:${userId}` });
        else res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: `Error with find product with id:${userId}`,
          error: err
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

const createProduct = async (req, res) => {
  try {
    const { error, value } = createProductValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const products = new Products(req.body);
    await products
      .save()
      .then((data) => {
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while creating the product.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateProduct = async (req, res) => {
  const productId = new ObjectId(req.params.id);
  const userId = new ObjectId(req.params.id);
    const { error, value } = updateProductValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  const updateProduct = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image_url: req.body.image_url,
    category: req.body.category,
    quantity: req.body.quantity,
    updated_at: Date.now()
  };
  await Products.findByIdAndUpdate({ _id: productId }, { $set: updateProduct }, { new: true })
    .then((data) => {
      if (!data) {
        throw new Error('Product not found!');
      }
      res.status(204).send();
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while updating the product.'
      });
    });
};

const deleteProduct = async (req, res) => {
  const productId = new ObjectId(req.params.id);
  await Products.deleteOne({ _id: productId })
    .then((data) => {
      res.status(200).send('Product deleted successfully');
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct
};
