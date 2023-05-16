const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const statusSchema = new Schema(
  {
    isActive: {
      type: Boolean,
    },
    name: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Status', statusSchema);
