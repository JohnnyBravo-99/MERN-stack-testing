const db = require("../models");
const Tutorial = db.tutorials;

exports.create = (req, res) => {
    console.log('Received request body:', req.body);

    if (!req.body.title) {
        return res.status(400).send({ message: "Title can not be empty!" });
    }

    const tutorial = new Tutorial({
        title: req.body.title,
        description: req.body.description || "",
        published: req.body.published ? req.body.published : false,
    });

    tutorial
        .save()
        .then((data => {
            res.send(data);
        })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message || "Some error occured while creating the tutorial...",
                });
            })
        )

}; 

exports.findAll = (req, res) => {

};

exports.findOne = (req, res) => {

};
exports.update = (req, res) => {

};

exports.delete = (req, res) => {

};

exports.deleteAll = (req, res) => {

};

exports.findAllPublished = (req, res) => {

};


