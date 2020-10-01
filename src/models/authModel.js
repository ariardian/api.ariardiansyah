const sql = require("./db.js");

// constructor
const Auth = function(auth) {
  this.email = auth.email;
  this.password = auth.password;
};

Auth.create = (newAuth, result) => {
  sql.query("INSERT INTO users SET ?", newAuth, (err, res) => {
    try {
      if (err) {
        // console.log("ieu error: ", err);
        result(err, null);
        return;
      }

      console.log("created users: ", { id: res.insertId, ...newAuth });
      result(null, { id: res.insertId, ...newAuth });
    } catch (error) {
      console.log("NEW ERROR ", error);
    }
  });
};

Auth.findById = (userId, result) => {
  sql.query(`SELECT * FROM users WHERE id = ${userId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

module.exports = Auth;
