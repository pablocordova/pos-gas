var mongoose = require('mongoose');

var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/posgas");

var client_schema = new Schema({
    completename: String,
    address: String,
    tel: String,
    fixprice: String
});


var Client = mongoose.model("Client", client_schema);

// Export Client model for mongodb
module.exports.Client = Client;
