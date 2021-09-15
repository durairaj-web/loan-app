const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../lib/db");

const Router = express.Router();

Router.post("/login", (req, res) => {
  if (req.body.email === "" || req.body.email === undefined) {
    return res.status(400).send({
      message: "Email is required",
    });
  }

  if (req.body.password === "" || req.body.password === undefined) {
    return res.status(400).send({
      message: "Password is required",
    });
  }

  db.query(
    `SELECT * FROM users WHERE email = ${db.escape(req.body.email)}`,
    (err, result) => {
      if (err) {
        throw err;
        return res.status(400).send({
          message: err,
        });
      }
      if (!result.length) {
        return res.status(400).send({
          message: "Email or password incorrect",
        });
      }

      bcrypt.compare(
        req.body.password,
        result[0]["password"],
        (bErr, bResult) => {
          if (bErr) {
            return res.status(400).send({
              message: "Email or password incorrect",
            });
          }

          if (bResult) {
            return res.status(200).send({
              message: "Logged in!",
              data: {
                user: {
                  id: result[0].id,
                  name: result[0].name,
                  email: result[0].email,
                },
              },
            });
          }
          return res.status(400).send({
            message: "Email or password incorrect",
          });
        }
      );
    }
  );
});

module.exports = Router;
