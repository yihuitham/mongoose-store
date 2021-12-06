const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT;
const DATABASE = process.env.DATABASE;
const MONGO_BASEURL = process.env.MONGO_BASEURL;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_URL = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_BASEURL}/${DATABASE}?retryWrites=true&w=majority`;

mongoose.connect(MONGO_URL).then(() => {
  console.log('Database connected');
  app.listen(PORT, () => {
    console.log('Mongoose store app listening at port', PORT);
  });
});
