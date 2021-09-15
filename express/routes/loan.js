const express = require("express");
const db = require("../lib/db");
const AWS = require("aws-sdk");
var stream = require("stream");
const multer = require("multer");
const { validateLocaleAndSetLanguage } = require("typescript");

const Router = express.Router();

Router.get("/products", (req, res) => {
  db.query(`SELECT * from product_types`, (err, result) => {
    if (err) {
      throw err;
      return res.status(400).send({
        message: err,
      });
    }
    if (!result.length) {
      return res.status(200).send({
        message: "No products found!",
      });
    }

    return res.status(200).send({
      message: "List of products",
      data: result,
    });
  });
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Incorrect file");
    error.code = "INCORRECT_FILETYPE";
    return cb(error, false);
  }
  cb(null, true);
};

const upload = multer({
  dest: "/uploads",
  fileFilter,
});

Router.post("/create", upload.single("doc"), (req, res) => {
  if (req.body.userId === "" || req.body.userId === undefined) {
    return res.status(400).send({
      message: "User id is required",
    });
  }

  if (req.body.productType === "" || req.body.productType === undefined) {
    return res.status(400).send({
      message: "Product type is required",
    });
  }

  if (req.body.loanAmount === "" || req.body.loanAmount === undefined) {
    return res.status(400).send({
      message: "Loan amount is required",
    });
  }

  if (req.body.interestRate === "" || req.body.interestRate === undefined) {
    return res.status(400).send({
      message: "Interest rate is required",
    });
  }

  if (req.body.terms === "" || req.body.terms === undefined) {
    return res.status(400).send({
      message: "Terms is required",
    });
  }

  if (req.file === undefined) {
    return res.status(400).send({
      message: "Document is required",
    });
  }

  const query = `INSERT INTO loans (user_id, product_type, loan_amount, interest_rate, terms, amortization, principal_approved) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

  const loanAmount = req.body.loanAmount;
  const interestRate = req.body.interestRate;
  const terms = req.body.terms;
  const userId = req.body.userId;
  const productType = req.body.productType;

  //Calculate the interest percent
  const interestPercent = interestRate / 100;

  //Calculate the per month interest rate
  const monthlyRate = interestPercent / 12;

  //Calculate the amortization
  const amortization =
    loanAmount * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -terms)));

  const data = [
    userId,
    productType,
    loanAmount,
    interestRate,
    terms,
    amortization.toFixed(2),
    loanAmount,
  ];

  db.query(query, data, (err, result) => {
    if (err) {
      throw err;
      return res.status(400).send({
        message: err,
      });
    } else {
      // update loan id
      const query = `UPDATE loans SET loan_id=? WHERE id=?`;
      const inserted_id = result.insertId;
      let loan_id = "0000" + inserted_id;
      loan_id = "L" + loan_id.substr(loan_id.length - 4);
      db.query(query, [loan_id, inserted_id], (err, result) => {
        if (err) {
          throw err;
          return res.status(400).send({
            message: err,
          });
        } else {
          // s3 upload
          const s3 = new AWS.S3({
            accessKeyId: "AKIAWY5NJUSCOQM5F5EC",
            secretAccessKey: "OZCrrGb0gbdKjQkLXv58Qr9ZLXSHYRUVMLhfz86u",
            signatureVersion: "v4",
            region: "ap-south-1",
            Bucket: "my-sample-task-1",
          });

          const fileContent = req.file.path;
          let fileName = req.file.originalname;
          fileName = userId + "_" + loan_id + "." + fileName.split(".").pop();
          const params = {
            Bucket: "my-sample-task-1",
            Key: fileName,
            Body: fileContent,
            ACL: "public-read",
          };

          s3.upload(params, function(err) {
            if (err) {
              throw err;
            }

            // doc update
            const query = `UPDATE loans SET documents=? WHERE id=?`;
            db.query(query, [fileName, inserted_id], (err, result) => {
              if (err) {
                throw err;
                return res.status(400).send({
                  message: err,
                });
              }
              return res.status(200).send({
                message: "Loan created successfully",
              });
            });
          });
        }
      });
    }
  });
});

Router.get("/all/:userId", (req, res) => {
  db.query(
    `SELECT loans.*, product_types.name AS product_type FROM loans LEFT JOIN product_types ON product_types.id = loans.product_type
    WHERE user_id = ${db.escape(req.params.userId)} ORDER BY loans.id DESC`,
    (err, result) => {
      if (err) {
        throw err;
        return res.status(400).send({
          message: err,
        });
      }
      if (!result.length) {
        return res.status(200).send({
          message: "No Loans found!",
        });
      }

      return res.status(200).send({
        message: "List of loans",
        data: result,
      });
    }
  );
});

Router.get("/files/:filename", (req, res) => {
  const s3 = new AWS.S3({
    accessKeyId: "AKIAWY5NJUSCOQM5F5EC",
    secretAccessKey: "OZCrrGb0gbdKjQkLXv58Qr9ZLXSHYRUVMLhfz86u",
    signatureVersion: "v4",
    region: "ap-south-1",
    Bucket: "my-sample-task-1",
  });

  var getParams = {
    Bucket: "my-sample-task-1", // your bucket name,
    Key: req.params.filename, // path to the object you're looking for
    Expires: 3600,
  };

  const url = s3.getSignedUrl("getObject", getParams);
  return res.status(200).send({
    message: "File path",
    data: url,
  });
});

module.exports = Router;
