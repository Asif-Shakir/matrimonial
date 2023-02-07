const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
exports.postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const findUserByEmail = await User.findOne({ email: email });

    if (findUserByEmail) {
      const matchPassword = await bcrypt.compare(
        password,
        findUserByEmail.password
      );
      if (matchPassword) {
        const token = jwt.sign(
          {
            email: findUserByEmail.email,
            userId: findUserByEmail._id.toString(),
          },
          'myspecialsecret',
          { expiresIn: '5h' }
        );
        res.json({
          status: 200,
          message: 'Token created successfully!',
          resultData: {
            token,
            userId: findUserByEmail._id.toString(),
            email: findUserByEmail.email,
          },
        });
      } else {
        res.json({
          status: 401,
          message: 'Invalid email or password',
        });
      }
    } else {
      res.json({ status: 401, message: 'User not found' });
    }
  } catch (err) {
    console.log(err);
  }
};
exports.postSignup = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  try {
    bcrypt
      .hash(password, 12)
      .then((hashed) => {
        const user = new User({
          name: name,
          email: email,
          password: hashed,
        });
        return user.save();
      })
      .then((user) => {
        if (user) {
          res.json({ status: 200, message: 'User created' });
        }
      })
      .catch((err) => console.log(err)) //user catch
      .catch((err) => console.log(err)); //bcrypt catch
  } catch (err) {
    console.log(err);
  }
};
