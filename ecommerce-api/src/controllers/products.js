const db = require('../models');
const { ObjectId } = require('mongodb');
const Products = db.Products;

const getAllProducts = async (req, res) => {
  await Products.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const getSingleProduct = async (req, res) => {
  const productId = new ObjectId(req.params.id);
  await Products.find({ _id: productId })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const createProduct = async (req, res) => {
  const products = new Products(req.body);
  await products
    .save()
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const updateProduct = async (req, res) => {
  const productId = new ObjectId(req.params.id);
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
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const deleteProduct = async (req, res) => {
  const productId = new ObjectId(req.params.id);
  await Products.deleteOne({ _id: productId })
    .then((data) => {
      res.status(201).send('Product deleted successfully');
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
