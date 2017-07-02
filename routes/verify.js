var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


// To get sales of specific client
router.get('/', function(req, res) {
    var verifyConnection = mongoose.connection.readyState;
    var result = JSON.stringify({ status: verifyConnection });
    res.send(result);
});

module.exports = router;