const { ObjectId } = require('mongodb');
const mongodb = require('../database/connect');

const getData = async (req, res, next) => {
    const result = await mongodb.getDB().db("User").collection("contacts").find();
    result.toArray().then((lists) => {
        if(lists.length > 0) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        } else {
            res.status(400).send("Not Found Results");
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).send("Error in server");
    })
}

const getSingleData = async (req, res, next) => {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDB().db("User").collection('contacts').find({ _id:contactId });
    result.toArray().then((lists) => {
        if(lists.length > 0) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
        } else {
            res.status(400).send("Not Found Results");
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).send("Error in server");
    })
}

module.exports = {
    getData,
    getSingleData,
}