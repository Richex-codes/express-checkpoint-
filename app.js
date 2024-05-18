var express = require("express");
var createError = require("http-errors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var contactsRouter = require("./routes/contact");
var servicesRouter = require("./routes/service");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use(checkday);
// app.use(checkTime);
app.use("/", indexRouter);
app.use("/contact", contactsRouter);
app.use("/service", servicesRouter);

function checkTime(req, res, next) {
  if (new Date().getHours() >= 9 && new Date().getHours() < 17) {
    next();
  } else {
    res.send("Sorry, we are closed at the moment");
  }
}

function checkday(req, res, next) {
  if (new Date().getDay() >= 1 && new Date().getDay() <= 5) {
    next();
  } else {
    res.send("Sorry, we are closed at the moment");
  }
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
  res.render("error");
});

module.exports = app;


