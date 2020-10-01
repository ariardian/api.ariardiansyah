const Auth = require("../models/authModel.js");
const jwt = require("jsonwebtoken");

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Users inhe
  const auth = new Auth({
    email: req.body.email,
    password: req.body.password
  });

  // Save Users in the database
  Auth.create(auth, async (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    } else {
      try {
        const token = jwt.sign(
          { userId: data.id },
          "MY_SECRET_KEY",
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
        // res.send({ token: token });
      } catch (err) {
        return res.status(422).send(err.message);
      }
    }
  });
};

// Find a single Customer with a customerId
exports.signIn = (req, res) => {
  // console.log(req.params)
  Auth.findBy(req.body.email, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.customerId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.customerId
        });
      }
    } else res.send(data);
  });
};
