/* const express        = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
const bodyParser     = require('body-parser');
const expressSession = require('express-session');
const port = 8888;

const MongoClient    = require('mongodb').MongoClient;
const mongoose       = require('mongoose');
const db             = require('./config/db');
const app            = express();
const passport       = require('passport');

var path = require('path');


var LocalStrategy = require('passport-local').Strategy;


app.use(require('serve-static')(__dirname + '/../../public'));
app.use(require('cookie-parser')());

app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));

mongoose.connect(db.url);

MongoClient.connect(db.url, (err, db) => {
    const database = db.db('wishlist')

    if (err) return console.log(err)
    require('./app/routes')(app, database);

    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
})
require('./app/routes')(app);

app.listen(port, () => {
    console.log('We are live on ' + port);
}); */