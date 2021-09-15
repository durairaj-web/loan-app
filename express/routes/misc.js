const os = require("os");
const express = require("express");
const db = require("../lib/db");

const Router = express.Router();

Router.get("/system", (req, res) => {
  var ut_sec = os.uptime();
  var ut_min = ut_sec / 60;
  var ut_hour = ut_min / 60;

  ut_sec = Math.floor(ut_sec);
  ut_min = Math.floor(ut_min);
  ut_hour = Math.floor(ut_hour);

  ut_hour = ut_hour % 60;
  ut_min = ut_min % 60;
  ut_sec = ut_sec % 60;

  var uptime =
    (ut_hour < 10 ? "0" + ut_hour : ut_hour) +
    ":" +
    (ut_min < 10 ? "0" + ut_min : ut_min) +
    ":" +
    (ut_sec < 10 ? "0" + ut_sec : ut_sec);

  return res.status(200).send({
    message: "System info",
    data: {
      no_of_cpu: os.cpus().length,
      type: os.type(),
      uptime: uptime,
      home_dir: os.homedir(),
    },
  });
});

module.exports = Router;
