//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});



app.post("/", function(req, res) {

  var baseUrl = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var mainUrl = baseUrl + crypto + fiat;
  request(mainUrl, function(error, response, body) {
    var data = JSON.parse(body);
    var value = data.last;
    var date = data.display_timestamp;
    var cryptoValue = value.toFixed(2);
    res.write("<h1>" + crypto + " VALUE IS " + cryptoValue + " " + fiat + "</h1>");
    res.write("<h3>Date: " + date + "</h3>");
    res.send();
  });
});

app.listen(3000, function() {
  console.log("Server is running at port 3000.");
});
