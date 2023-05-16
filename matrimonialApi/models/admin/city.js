const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const citySchema = new Schema(
    {
        cityName: {
            type: String,
            required: true,
        },
        state: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'state',
            require: true,
        },
        status: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'state',
            require: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            require: true,
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            require: true,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model('City', citySchema);
