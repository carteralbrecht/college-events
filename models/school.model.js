const sql = require("./db.js");

const School = function(school) {
    this.name = school.name;
    this.lat = school.lat;
    this.lon = school.lon;
};

School.create = (newSchool, result) => {
    sql.query("INSERT INTO school SET ?", newSchool, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }

        console.log("created school: ", {id: res.insertId, ...newSchool});
        result(null, {id: res.insertId, ...newSchool});
    });
}

School.findById = (schoolId, result) => {
    sql.query(`SELECT * FROM school WHERE id = ${schoolId}`, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found school: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({kind: "not_found"}, null);
    });
};

School.updateById = (schoolId, school, result) => {
    sql.query(
        "UPDATE school " +
        "SET name = ?, " +
        "lat = ?, " +
        "lon = ? " +
        "WHERE id = ?",
        [school.name, school.lat, school.lon, schoolId],
        (err, res) => {
            if (err) {
                console.log(err);
                result(null, err);
                return;
            }

            if (res.affectedRows) {
                console.log("updated school: ", {id: schoolId, ...school});
                result(null, {id: schoolId, ...school});
                return;
            }

            result({kind: "not_found"}, null);
        }
    );
}

School.remove = (schoolId, result) => {
    sql.query("DELETE FROM school WHERE id = ?", schoolId, (err, res) => {
        if (err) {
            console.log(err);
            result(null, err);
            return;
        }

        if (res.affectedRows) {
            console.log("deleted school with id: ", schoolId);
            result(null, res);
            return;
        }

        result({kind: "not_found"}, null);
    });
};

module.exports = School;