const sql = require("./db.js");

const Event = function(event) {
    this.name = event.name;
    this.description = event.description;
    this.lat = event.lat;
    this.lon = event.lon;
    this.time = event.time;
    this.category = event.category;
    this.contact_phone = event.contact_phone;
    this.contact_email = event.contact_email;
    this.school_id = event.school_id;
    this.rso_id = event.rso_id;
};

Event.create = (newEvent, result) => {
    sql.query("INSERT INTO event SET ?", newEvent, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }

        console.log("created event: ", {id: res.insertId, ...newEvent});
        result(null, {id: res.insertId, ...newEvent});
    });
}

Event.findById = (eventId, result) => {
    sql.query(`SELECT * FROM event WHERE id = ${eventId}`, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found event: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({kind: "not_found"}, null);
    });
};

Event.updateById = (eventId, event, result) => {
    sql.query(
        "UPDATE event " +
        "SET name = ?, " +
        "description = ?, " +
        "lat = ?, " +
        "lon = ?, " +
        "time = ?, " +
        "category = ?, " +
        "contact_phone = ?, " +
        "contact_email = ?, " +
        "school_id = ?, " +
        "rso_id = ? " +
        "WHERE id = ?",
        [
            event.name,
            event.description,
            event.lat,
            event.lon,
            event.time,
            event.category,
            event.contact_phone,
            event.contact_email,
            event.school_id,
            event.rso_id,
            eventId
        ],
        (err, res) => {
            if (err) {
                console.log(err);
                result(null, err);
                return;
            }

            if (res.affectedRows) {
                console.log("updated event: ", {id: eventId, ...event});
                result(null, {id: eventId, ...event});
                return;
            }

            result({kind: "not_found"}, null);
        }
    );
}

Event.remove = (eventId, result) => {
    sql.query("DELETE FROM event WHERE id = ?", eventId, (err, res) => {
        if (err) {
            console.log(err);
            result(null, err);
            return;
        }

        if (res.affectedRows) {
            console.log("deleted event with id: ", eventId);
            result(null, res);
            return;
        }

        result({kind: "not_found"}, null);
    });
};

module.exports = Event;