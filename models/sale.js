var mongoose = require('mongoose');

var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/posgas");

var sale_schema = new Schema({
    date: String,
    clientid: String,
    gassell: String,
    gasreceived: String,
    totalpaid: String,
    totalreal: String,
    remark: String
});


var Sale = mongoose.model("Sale", sale_schema);

// Export Sale model for mongodb
module.exports.Sale = Sale;
