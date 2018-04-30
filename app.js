var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
let mongoose = require('mongoose');
var appRoutes = require('./routes/app');
let messageRoutes = require('./routes/message');
let userRoutes = require('./routes/user');

var app = express();
mongoose.connect(process.env.database||'mongodb://localhost:27017/node-angular');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//middleware section
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
//serves static hosting - available to public
app.use(express.static(path.join(__dirname, 'public')));

//this is to allow server (machine, which host nodejs) to communicate with client (machine, which hosts the angular code)
//for cross-communication, else there might be security errors
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/message', messageRoutes);
app.use('/user', userRoutes);
app.use('/', appRoutes);

// catch 404 and forward to error handler
//always let angular app handle the any 404 error (path location strategy)
app.use(function (req, res, next) {
    return res.render('index');
});


module.exports = app;
