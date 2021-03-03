const sql = require("./db.js");

const University = function(University) {
    this.name = University.name;
    this.image_url = University.image_url;
    this.Location_id = University.Location_id;
};

University.create = (newUniversity, result) => {
    sql.query("INSERT INTO University SET ?", newUniversity, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }

        console.log("created University: ", {id: res.insertId, ...newUniversity});
        result(null, res);
    });
}

University.findAll = (result) => {
    sql.query(`SELECT U.name, U.id FROM University U`, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found Universities: ", res);
            result(null, res);
            return;
        }

        result({kind: "not_found"}, null);
    });
};

University.findById = (UniversityId, result) => {
    sql.query(`SELECT * FROM University WHERE id = ${UniversityId}`, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found University: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({kind: "not_found"}, null);
    });
};

University.updateById = (universityId, University, result) => {
    sql.query(
        "UPDATE University " +
        "SET name = ?, " +
        "lat = ?, " +
        "lon = ? " +
        "WHERE id = ?",
        [University.name, University.lat, University.lon, universityId],
        (err, res) => {
            if (err) {
                console.log(err);
                result(null, err);
                return;
            }

            if (res.affectedRows) {
                console.log("updated University: ", {id: universityId, ...University});
                result(null, {id: universityId, ...University});
                return;
            }

            result({kind: "not_found"}, null);
        }
    );
}

University.remove = (universityId, result) => {
    sql.query("DELETE FROM University WHERE id = ?", universityId, (err, res) => {
        if (err) {
            console.log(err);
            result(null, err);
            return;
        }

        if (res.affectedRows) {
            console.log("deleted University with id: ", universityId);
            result(null, res);
            return;
        }

        result({kind: "not_found"}, null);
    });
};

module.exports = University;