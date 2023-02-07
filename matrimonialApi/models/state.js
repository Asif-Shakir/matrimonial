const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stateSchema = new Schema(
  {
    staeName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model('State', stateSchema);
