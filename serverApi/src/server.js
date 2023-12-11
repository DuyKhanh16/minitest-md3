var express = require('express')
var app = express()
const routerJob = require("../route/apiJob");
var bodyParser = require('body-parser')
const cors = require("cors");
app.use(cors({
    origin: "*"
}));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use("/", routerJob);


app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})