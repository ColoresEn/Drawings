const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const DrawingSchema = new Schema({
    title: { type: String },
    height: { type: Number },
    width: { type: Number },
    lines:[{
        points: [{x: Number,y: Number}],
        brushColor:{type: String} ,
        brushRadius:{type: Number} 
   
   }],
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
 
},
  

});
var Drawing = mongoose.model('Drawing', DrawingSchema);

module.exports = Drawing;

