const State = require('../models/admin/state');
const City = require('../models/admin/city');
const User = require('../models/user');
const mongoose = require('mongoose');
const ResponseVM = require('../shared/response');
const StatusCode = require('../shared/statusCode');
const Status = require('../models/status');
const configrations = {
    addState: async (req, res, next) => {
        const response = new ResponseVM();
        try {
            const data = JSON.parse(req.body.data);
            const state = await State.findOne({
                stateName: data.stateName,
            });
            if (state) {
                response.status = StatusCode.Duplicate;
                response.message = 'State name already Exists';
                res.json(response);
            } else {
                await new State({
                    stateName: data.stateName,
                    status: data.status,
                    userId: req.userId,
                }).save();
                response.status = StatusCode.OK;
                response.message = 'Data saved successfully';
                res.json(response);
            }
        } catch (err) {
            console.log(err);
        }
    },
    updateState: async (req, res, next) => {
        const response = new ResponseVM();
        try {
            const data = JSON.parse(req.body.data);
            let stateId = req.params['stateId'];
            const state = await State.findByIdAndUpdate(stateId, {
                stateName: data.stateName,
                status: data.status,
                updatedBy: req.userId,
            });
            if (state) {
                response.status = StatusCode.OK;
                response.message = 'Data saved successfully!';
            } else {
                response.status = StatusCode.InternalServerError;
                response.message = 'Something went wrong!';
            }
            res.json(response);
        } catch (err) {
            console.log(err);
        }
    },
    getStates: async (req, res, next) => {
        const response = new ResponseVM();
        try {
            const states = await State.find({})
                .populate({ path: 'userId', model: User, select: 'email', })
                .populate({ path: 'updatedBy', model: User, select: 'email', })
                .populate({ path: 'status', model: Status, select: 'name', }).sort({ createdAt: -1 });
            // const states = await State.aggregate([
            //   {
            //     $lookup: {
            //       from: 'users',
            //       localField: 'userId',
            //       foreignField: '_id',
            //       as: 'userData',
            //     },
            //   },
            // ]);
            response.status = StatusCode.OK;
            response.resultData = states;
            res.json(response);
        } catch (err) {
            console.log(err);
        }
    },
    getStatus: async (req, res, next) => {
        const response = new ResponseVM();
        try {
            const statusList = await Status.find({ isActive: true }).exec();
            response.status = StatusCode.OK;
            response.resultData = statusList;
            res.json(response);
        } catch (err) {
            console.log(err);
        }
    },

    //----------------------------------- CITES---------------------------//
    addCity: async (req, res, next) => {
        const response = new ResponseVM();
        try {
            const data = JSON.parse(req.body.data);
            const city = await City.findOne({
                cityName: data.cityName,
            });
            if (city) {
                response.status = StatusCode.Duplicate;
                response.message = 'City name already Exists';
                res.json(response);
            } else {
                await new City({
                    cityName: data.cityName,
                    state: data['state'],
                    status: data['status'],
                    createdBy: req.userId,
                }).save();
                response.status = StatusCode.OK;
                response.message = 'Data saved successfully';
                res.json(response);
            }
        } catch (err) {
            console.log(err);
        }
    },
    updateCity: async (req, res, next) => {
        const response = new ResponseVM();
        try {
            const data = JSON.parse(req.body.data);
            let cityId = req.params['cityId'];
            const state = await City.findByIdAndUpdate(cityId, {
                cityName: data.cityName,
                state: data['state'],
                status: data['status'],
                updatedBy: req.userId,
            });
            if (state) {
                response.status = StatusCode.OK;
                response.message = 'Data saved successfully!';
            } else {
                response.status = StatusCode.InternalServerError;
                response.message = 'Something went wrong!';
            }
            res.json(response);
        } catch (err) {
            console.log(err);
        }
    },

    getCityList: async (req, res, next) => {
        const response = new ResponseVM();
        try {
            const states = await City.find({})
                .populate({ path: 'state', model: State, select: 'stateName _id'})
                .populate({ path: 'createdBy', model: User, select: 'email', })
                .populate({ path: 'updatedBy', model: User, select: 'email', })
                .populate({ path: 'status', model: Status, select: 'name _id', }).sort({ createdAt: -1 });
            response.status = StatusCode.OK;
            response.resultData = states;
            res.json(response);
        } catch (err) {
            console.log(err);
        }
    },
};

module.exports = configrations;
