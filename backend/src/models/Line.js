const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const LineSchema = new Schema({

    brushColor: { type: String },
    brushRadius: { type: Number },
    points: [{ type: Schema.Types.ObjectId, ref: 'Point' }]

})

var Line = mongoose.model('Line', LineSchema);
module.exports = Line;