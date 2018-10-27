var http = require("http");
const axios = require('axios');
const express = require("express");
const bodyParser = require("body-parser");
const cross = require("./cross.js");
const PORT = 8005;
const app = express();
app.use(bodyParser.json());
app.use(cross);

// Token
app.post('/token', (req, res, next) => {

  axios.post('https://github.com/login/oauth/access_token', {
    "client_id": "311e1101af57165b8225",
    "client_secret": "a06793b5b00ae6a0030a0c5f2e37235a1f842547",
    "code": req.body.code,
    "redirect_uri": "http://localhost:4200/posts",
    "state": "111111"
  })
    .then(function (response) {
      console.log(response.data.split('&')[0].split('=')[1]);
      res.send({ "access_token": response.data.split('&')[0].split('=')[1] })
    })
    .catch(function (error) {
      console.log(error);
    });
})

//Get User Data
app.post('/data', (req, res, next) => {
  axios.get('https://api.github.com/user?access_token='+req.body.accessToken)
    .then(function (data) {
      res.send(data.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});


app.listen(PORT, () => {
  console.log("Server starts on" + PORT);
});
