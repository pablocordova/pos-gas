var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Client = require('../models/client').Client;

// To create and update client
router.post('/', function(req, res) {

    // insert or update data client

    // Case save
    if (req.body.idclient == '0') {
        var data = new Client();
        data.completename = req.body.completename;
        data.address = req.body.address;
        data.tel = req.body.tel;
        data.fixprice = req.body.fixprice;
        data.save().then(function() {
            var result = JSON.stringify({ result: 'success' });
            res.send(result);
        }, function(err) {
            var result = JSON.stringify({ result: 'error' });
            res.send(result);
        });
    }
    // Case update data
    else {
        var id = mongoose.Types.ObjectId(req.body.idclient);
        Client.findById(id, function(err, resp) {
            if(err) return handleError(err);
            resp.completename = req.body.completename;
            resp.address = req.body.address;
            resp.tel = req.body.tel;
            resp.fixprice = req.body.fixprice;
            resp.save(function(err, updatedResp) {
                if(err) return handleError(err);
                res.send(updatedResp);
            });
        });
    } 
 
});

// To get All users
router.get('/', function(req, res) {
    Client.find({}, function(err, docs) {
        if(err) return handleError(err);
        res.send(docs);
    });
});

// To get one user
router.get('/:id', function(req, res) {
    let idclient = mongoose.Types.ObjectId(req.params.id);
    Client.findOne({ _id: idclient }, function(err, docs) {
        if(err) return handleError(err);
        res.send(docs);
    })
    
});

module.exports = router;