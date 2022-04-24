const express = require('express');
const app = express();
const sqlite = require('sqlite3');
const hbs = require('hbs');

async function getData() {

    let db = new sqlite.Database("autor.db", (err) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log("DB Open...");
        }
    });

    let prom = new Promise((res, rej) => {
        db.serialize(function () {
            let query = "SELECT * FROM autor";
            db.all(query, function (err, row) {
                if (err) {
                    rej(err.message);
                } else {
                    res({ "rows": row });
                }
            })
        })
    });
    let data = await prom
    db.close();

    return data
}

app.use(express.static(__dirname + '/static'));
app.set("view engine", "hbs");
app.set("views", './templates');

app.get('/', function (req, res) {

    res.render("Spotify.html")

});

app.get('/signup', function (req, res) {

    res.render("Signup.html")

});
app.get("/index", function (req, res) {
    getData().then(function (rows) {
        // console.log(rows);
        res.render("index.hbs", rows)
    }, (err) => {
        res.send(err)
    })

});


app.listen(7344, function () {
    console.log("'Spotify free' started work");
});