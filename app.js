var createError = require('http-errors');
var express = require('express');
var path = require('path');
var session = require('express-session');
var cookieParser = require('cookie-parser');
//var session = require('express-session')
var logger = require('morgan');
var User = require('./model/user');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
r = require('rethinkdb')
conn = r.connect()
    //var testMw = require('./express/middleware');

var app = express();
//middleware
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'somesecret',
    cookie: { maxAge: 60000 }
}));

var server = app.listen(3000, "127.0.0.1", function() {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);;
app.use('/register', indexRouter);
r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {});
//app.use('/help', testMw);
//lenamdn: Let's look at this file, and routes/users.js
//Now go to your browser, type: 127.0.0.1:3000/users -> Should see "respond with a resource"
// app.use('/user', usersRouter);
// app.use('/testUser', usersRouter);
// app.use('/users/test', usersRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// app.use('/testUser', function(req, res, next) {
//     console.log('Resquest Type: ')
//     next()
// });

module.exports = app;