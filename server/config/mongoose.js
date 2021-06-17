const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const key = require("./keys").mongodb.dbURI;
mongoose.connect(key, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
mongoose.set("useFindAndModify", false);

const store = new MongoStore({ mongooseConnection: mongoose.connection });

module.exports = store;
