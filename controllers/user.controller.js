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
        University_id: req.body.University_id
    });

    User.create(user, (err, data) => {
        if (err) {
            res.status(500).send({message: err.message});
        } else {
            res.send(data);
        }
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

exports.findByEmailPassword = (req, res) => {
    User.findByEmailPassword(req.body.email, req.body.password, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found user`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving user`
                });
            }
        } else res.send(data);
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({message: "Content can not be empty"});
    }

    User.updateById(req.params.userId,
        new User(req.body),
        (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found user with id ${req.params.userId}`
                });
            } else {
                res.status(500).send({
                    message: `Error updating user with id ${req.params.userId}`
                });
            }
        } else res.send(data);
    });
};

exports.delete = (req, res) => {
    User.remove(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found user with id ${req.params.userId}`
                });
            } else {
                res.status(500).send({
                    message: `Error deleting user with id ${req.params.userId}`
                });
            }
        } else res.send({message: `user deleted successfully`});
    });
};