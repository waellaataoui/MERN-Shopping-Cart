const createError = require("http-errors");
const express = require("express");
const path = require("path");
const session = require("express-session");
require("./config/passport-setup");
const store = require("./config/mongoose");
const cors = require("cors");

const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const usersRouter = require("./routes/users");
const authRoutes = require("./routes/auth-routes");
const cartRouter = require("./routes/cart");
const productRouter = require("./routes/products");
const app = express();
const keys = require("./config/keys");
const publicPath = path.join(__dirname, "../client/build");
// view engine setup

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("thisismysecret"));

// set up session cookies
app.use(
  session({
    secret: "thisismysecret",
    secure: false,
    resave: false,
    saveUninitialized: true,
    unset: "destroy", //life saver
    store,
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use("/users", usersRouter);
app.use("/auth", authRoutes(passport));
app.use("/cart", cartRouter);
app.use("/products", productRouter);
if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    app.use(express.static(publicPath));

    res.sendFile(path.join(publicPath, "index.html"));
  });
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
});
module.exports = app;
