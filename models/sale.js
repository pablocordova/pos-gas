var mongoose = require('mongoose');

var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/posgas");

var sale_schema = new Schema({
    date: String,
    clientid: Schema.Types.ObjectId,
    gassell: Number,
    gasreceived: Number,
    totalpaid: Number,
    totalreal: Number,
    remark: String,
    completename: String
});


var Sale = mongoose.model("Sale", sale_schema);

// Export Sale model for mongodb
module.exports.Sale = Sale;
