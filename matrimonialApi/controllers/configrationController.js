const User = require('../models/user');
const UserRole = require('../models/admin/userRole');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const StatusCode = require('../shared/statusCode');

exports.postAddCity = async (req, res, next) => {
  const data = JSON.parse(req.body.data);
};
