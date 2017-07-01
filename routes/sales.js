var express = require('express');
var router = express.Router();

var Sales = require('../models/sale').Sale;

// To create sale
router.post('/', function(req, res) {

});

// To get sales of specific client
router.get('/:id', function(req, res) {

});

module.exports = router;