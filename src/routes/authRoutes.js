module.exports = app => {
  const auth = require("../controllers/authController.js");

  // Register user baru
  app.post("/signup", auth.create);

  // Login User
  app.post("/signin", auth.signIn);
};
