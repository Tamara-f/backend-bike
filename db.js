const mongoose = require('mongoose');
const dotenv = require('dotenv');
require('dotenv').config();

module.exports = async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    };
    await mongoose.connect(process.env.DB_URI, options);
    console.log('Connected to bikes database.');
  } catch (error) {
    console.log('Could not connect to database.', error);
  }
};
