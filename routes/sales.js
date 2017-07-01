var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Sales = require('../models/sale').Sale;

// To create sale
router.post('/', function(req, res) {

});

// To get sales of specific client
router.get('/:id', function(req, res) {
    let client_id = mongoose.Types.ObjectId(req.params.id);
    Sales.find({ clientid: client_id }, function(err, docs) {
        if(err) return handleError(err);
        return res.send(docs);
    });
});

module.exports = router;