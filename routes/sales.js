var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Sales = require('../models/sale').Sale;

// To create sale
router.post('/', function(req, res) {

    var sale = new Sales();
    sale.date = req.body.date;
    sale.clientid = req.body.clientid;
    sale.gassell = req.body.gassell;
    sale.gasreceived = req.body.gasreceived;
    sale.totalpaid = req.body.totalpaid;
    sale.totalreal = req.body.totalreal;
    sale.remark = req.body.remark;
    sale.completename = req.body.completename;

    sale.save().then(function() {
        var result = JSON.stringify({ result: 'success' });
        res.send(result);
    }, function(err) {
        var result = JSON.stringify({ result: 'error' });
        res.send(result);
    });
});

// To get sales of specific client
router.get('/:id', function(req, res) {
    let client_id = mongoose.Types.ObjectId(req.params.id);
    Sales.find({ clientid: client_id }, function(err, docs) {
        if(err) return handleError(err);
        return res.send(docs);
    });
});

router.get('/', function(req, res) {
    let client_id = mongoose.Types.ObjectId(req.params.id);
    Sales.find({}, function(err, docs) {
        if(err) return handleError(err);
        return res.send(docs);
    });
});

module.exports = router;