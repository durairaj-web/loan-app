const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const serveStatic = require('serve-static')
const path = require('path')
const UserRoutes = require("./express/routes/user");
const LoanRoutes = require("./express/routes/loan");
const MiscRoutes = require("./express/routes/misc");

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", UserRoutes);
app.use("/misc", MiscRoutes);
app.use("/loan", LoanRoutes);

app.use((err, req, res, next) => {
  if(err.code === "INCORRECT_FILETYPE"){
    res.status(400).json({error: 'Invalid file type'});
    return;
  }
})

//here we are configuring dist to serve app files
app.use('/', serveStatic(path.join(__dirname, '/dist')))

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
	res.sendFile(path.join(__dirname, '/dist/index.html'))
})

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});