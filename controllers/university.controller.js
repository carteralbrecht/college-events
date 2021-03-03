const University = require('../models/university.model.js');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({message: "Content can not be empty"});
        return;
    }

    const university = new University({
        name: req.body.name,
        image_url: req.body.image_url,
        Location_id: req.body.Location_id,
    });

    University.create(university, (err, data) => {
        if (err) {
            res.status(500).send({message: err.message});
        } else {
            res.send(data);
        }
    })
}

exports.findOne = (req, res) => {
    University.findById(req.params.universityId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found university with id ${req.params.universityId}`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving university with id ${req.params.universityId}`
                });
            }
        } else res.send(data);
    });
};

exports.findAll = (req, res) => {
    University.findAll((err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No universities found`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving universities`
                });
            }
        } else res.send(data);
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({message: "Content can not be empty"});
        return;
    }

    University.updateById(req.params.universityId,
        new University(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found university with id ${req.params.universityId}`
                    });
                } else {
                    res.status(500).send({
                        message: `Error updating university with id ${req.params.universityId}`
                    });
                }
            } else res.send(data);
        });
};

exports.delete = (req, res) => {
    University.remove(req.params.universityId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found university with id ${req.params.universityId}`
                });
            } else {
                res.status(500).send({
                    message: `Error deleting university with id ${req.params.universityId}`
                });
            }
        } else res.send({message: `university deleted successfully`});
    });
};