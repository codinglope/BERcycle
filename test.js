const mongoose = require("mongoose");
const User = require("./models/Users");

mongoose.connect("mongodb://localhost/basic-auth");

User.find().then(users => {
  console.log(users[0].id);
  mongoose.connection.close();
});
