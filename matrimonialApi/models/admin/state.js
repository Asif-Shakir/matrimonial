const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const stateSchema = new Schema(
  {
    stateName: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("State", stateSchema);
