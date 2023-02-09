const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  roleName: {
    type: String,
  },
});
module.exports = mongoose.model("userRole", userSchema);
