const Event = require('../models/event.model.js');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({message: "Content can not be empty"});
        return;
    }

    const event = new Event({
        name: req.body.name,
        description: req.body.description,
        lat: req.body.lat,
        lon: req.body.lon,
        time: req.body.time,
        category: req.body.category,
        contact_phone: req.body.contact_phone,
        contact_email: req.body.contact_email,
        school_id: req.body.school_id,
        rso_id: req.body.rso_id
    });

    Event.create(event, (err, data) => {
        if (err) {
            res.status(500).send({message: err.message});
        } else {
            res.send(data);
        }
    })
}

exports.findOne = (req, res) => {
    Event.findById(req.params.eventId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found event with id ${req.params.eventId}`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving event with id ${req.params.eventId}`
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

    Event.updateById(req.params.eventId,
        new Event(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found event with id ${req.params.eventId}`
                    });
                } else {
                    res.status(500).send({
                        message: `Error updating event with id ${req.params.eventId}`
                    });
                }
            } else res.send(data);
        });
};

exports.delete = (req, res) => {
    Event.remove(req.params.eventId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found event with id ${req.params.eventId}`
                });
            } else {
                res.status(500).send({
                    message: `Error deleting event with id ${req.params.eventId}`
                });
            }
        } else res.send({message: `school deleted successfully`});
    });
};