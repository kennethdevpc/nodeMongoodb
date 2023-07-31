const mongoose = require('mongoose');

const { NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE, MONGODB_URI_C } = process.env;
const MONGODB_URI_l = `mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DATABASE}`;
const MONGODB_URI = MONGODB_URI_C;
mongoose
  .connect(MONGODB_URI || MONGODB_URI_l, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((db) => console.log('Database is connected'))
  .catch((err) => console.log(err));
