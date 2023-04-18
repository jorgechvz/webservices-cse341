const mongodb = require('../database/connect');

const getData = async (req, res, next) => {
    const result = await mongodb.getDB().db("User").collection("test").find();
    result.toArray().then((lists) => {
        if (lists.length > 0) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
        } else {
            res.status(404).send('Not Found Results');
        }
    }).catch((err) => {
        console.error(err);
        res.status(500).send('Error in Server');
    });
}

module.exports = { getData };