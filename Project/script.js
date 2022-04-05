const express = require('express');
const nunjucks = require("nunjucks")
const app = express();
const path = require('path');

nunjucks.configure(path.resolve(__dirname, 'templates'), {
    autoescape: true,
    express: app
});
app.use(express.static('static'));

app.get('/', function (req, res) {

    let tracks = {

    }


    res.render("Spotify.html")

});
app.get('/signup', function (req, res) {

    res.render("Signup.html")

})

app.listen(7344, function () {
    console.log("'Spotify free' started work");
});