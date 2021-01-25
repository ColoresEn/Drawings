const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const PointSchema = new Schema({
     x: Number,
     y: Number
});


var Point = mongoose.model('Point', PointSchema);
module.exports = Point;
