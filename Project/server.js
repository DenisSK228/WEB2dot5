const express = require('express');
const app = express();
const sqlite = require('sqlite3');
const hbs = require('hbs');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser')

let secret = 'qwerty';

async function getData() {

    let db = new sqlite.Database("autor.db", (err) => {
        if (err) {
            console.log(err.message);
        } else {
            // console.log("DB Open...");
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
    // db.close();

    return data
}

async function InsertInto() {
    let db = new sqlite3.Database('autor.db');
    db.run('INSERT INTO fav(autor, track, poster) VALUES("123", 32, "xz che pisat")', ['C'], function (err) {
        if (err) {
            return console.log(err.message);
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
    db.close();
}

app.use(express.static(__dirname + '/static'));
app.set("view engine", "hbs");
app.set("views", './templates');
app.use(cookieParser(secret));
app.use(expressSession({
    secret: secret,
}));

app.get('/', function (req, res) {

    res.render("Spotify.hbs")

});

app.get('/signup', function (req, res) {

    res.render("Signup.hbs")

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