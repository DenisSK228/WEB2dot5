const express = require('express');
const nunjucks = require("nunjucks")
const app = express();
const path = require('path');

nunjucks.configure(path.resolve(__dirname, 'templates'), {
    autoescape: true,
    express: app
});

app.get('/', function (req, res) {

    let tracks = {

    }

    res.render("Spotify.html")

});

app.listen(7000, function () {
    console.log("'Spotify free' started work");
});