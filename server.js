const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const path = require("path");

// parse requests of content-type - application/json (parse req)
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Ari Ardiansyah application for API." });
});
// if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "development") {
//   app.use(express.static("client/build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

require("./src/routes/customer.routes.js")(app);
require("./src/routes/authRoutes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
