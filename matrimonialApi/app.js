const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');

//init & middleware
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${Math.floor(Math.random() * 100000000)}-${file.originalname}`
    );
  },
});
const app = express();
// const bookRoutes = require('./routes/bookRoutes');
// const authRoutes = require('./routes/authRoutes');
app.use(bodyParser.json());
app.use(multer({ storage: fileStorage }).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(cors());
// app.use(authRoutes);
// app.use(bookRoutes);
mongoose
  .connect(
    'mongodb+srv://asifshakir:123mongodb123@cluster0.6h1tvmj.mongodb.net/Matrimonial?retryWrites=true&w=majority'
  )
  .then(() => {
    app.listen(8080);
    console.log('app started');
  })
  .catch((err) => {
    console.log(err);
  });
