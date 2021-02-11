const School = require('../models/school.model.js');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({message: "Content can not be empty"});
        return;
    }

    const school = new School({
        name: req.body.name,
        lat: req.body.lat,
        lon: req.body.lon
    });

    School.create(school, (err, data) => {
        if (err) {
            res.status(500).send({message: err.message});
        } else {
            res.send(data);
        }
    })
}

exports.findOne = (req, res) => {
    School.findById(req.params.schoolId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found school with id ${req.params.schoolId}`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving school with id ${req.params.schoolId}`
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

    School.updateById(req.params.schoolId,
        new School(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found school with id ${req.params.schoolId}`
                    });
                } else {
                    res.status(500).send({
                        message: `Error updating school with id ${req.params.schoolId}`
                    });
                }
            } else res.send(data);
        });
};

exports.delete = (req, res) => {
    School.remove(req.params.schoolId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found school with id ${req.params.schoolId}`
                });
            } else {
                res.status(500).send({
                    message: `Error deleting school with id ${req.params.schoolId}`
                });
            }
        } else res.send({message: `school deleted successfully`});
    });
};