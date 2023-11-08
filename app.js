const express = require("express");
const app = express();
const ExpressError = require("./expressError");

app.use(express.json());

const dogRoutes = require("./routes/dogs");
app.use("/dogs", dogRoutes);

const catRoutes = require("./routes/cats");
app.use("/cats", catRoutes);

/** 404 handler */
app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

/** general error handler */
app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err.message,
  });
});

module.exports = app;
