const User = require('../models/user.model.js');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({message: "Content can not be empty"});
    }

    const user = new User({
        email: req.body.email,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        type: req.body.type
    });

    User.create(user, (err, data) => {
        if (err)
            res.status(500).send({message: err.message});
        res.send(data);
    })
}

exports.findOne = (req, res) => {
    User.findById(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found user with id ${req.params.userId}`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving user with id ${req.params.userId}`
                });
            }
        } else res.send(data);
    });
};