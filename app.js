var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var Client = require('./models/client').Client;
var Sale = require('./models/sale').Sale;

// Router
var clients = require('./routes/clients');
var sales = require('./routes/sales');
var verify = require('./routes/verify');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));

app.use(express.static(path.join(__dirname, 'public')));

//Api routes
app.use('/api/clients', clients);
app.use('/api/sales', sales);
app.use('/api/verify', verify);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500).json({error: res.locals.error});
});

module.exports = app;