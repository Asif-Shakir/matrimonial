const State = require('../models/admin/state');
const User = require('../models/user');
const ResponseVM = require('../shared/response');
const StatusCode = require('../shared/statusCode');
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
  getStates: async (req, res, next) => {
    const response = new ResponseVM();
    try {
      const states = await State.find({}).populate({
        path: 'userId',
        model: User,
        select: 'email',
      });
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
};

module.exports = configrations;
