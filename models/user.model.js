const sql = require("./db.js");

const User = function(user) {
    this.email = user.email;
    this.password = user.password;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.type = user.type;
};

User.create = (newUser, result) => {
    sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }

        console.log("created user: ", {id: res.insertId, ...newUser});
        result(null, {id: res.insertId, ...newUser});
    });
}

User.findById = (userId, result) => {
    sql.query(`SELECT * FROM user WHERE id = ${userId}`, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({kind: "not_found"}, null);
    });
};

User.updateById = (userId, user, result) => {
    sql.query(
        "UPDATE user " +
            "SET email = ?, " +
            "password = ?, " +
            "firstname = ?, " +
            "lastname = ?, " +
            "type = ? " +
        "WHERE id = ?",
        [user.email, user.password, user.firstname, user.lastname, user.type, userId],
        (err, res) => {
            if (err) {
                console.log(err);
                result(null, err);
                return;
            }

            if (res.affectedRows) {
                console.log("updated user: ", {id: userId, ...user});
                result(null, {id: userId, ...user});
                return;
            }

            result({kind: "not_found"}, null);
        }
    );
}

module.exports = User;