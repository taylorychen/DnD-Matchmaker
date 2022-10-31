const mongoose = require('mongoose');
const User = require('./models/user');
const Post = require('./models/post');

mongoose.connect(process.env.MONGO_URL);
mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open to ' + process.env.MONGO_URL);
});

mongoose.connection.on('error', err => {
  console.log('Mongoose default connection error: ' + err);
});

module.exports = {
    User,
    Post,
  };