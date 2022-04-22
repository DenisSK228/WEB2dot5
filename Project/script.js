const express = require('express');
const nunjucks = require("nunjucks")
const app = express();
const path = require('path');
const sqlite = require('sqlite3')

nunjucks.configure(path.resolve(__dirname, 'templates'), {
    autoescape: true,
    express: app
});
app.use(express.static('static'));

app.get('/', function (req, res) {

    res.render("Spotify.html")

});

app.get('/signup', function (req, res) {

    res.render("Signup.html")

});
app.get("/index", function (req, res) {
    res.render("index.hbs")
});

let db = new sqlite.Database("autor.db", (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("DB Open...");
    }
});

db.serialize(function () {
    let query = "SELECT * FROM autor";
    db.each(query, function (err, row) {
        if (err) {
            console.log(err.message);
        } else {
            // for (rows in row) {
            //     var a = rows.param;
            //     console.log(a);
            // }
            console.log(row);
        }
    })
})


db.close();

app.listen(7344, function () {
    console.log("'Spotify free' started work");
});