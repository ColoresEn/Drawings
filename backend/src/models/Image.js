const { Schema, model } = require('mongoose');

const ImageSchema = new Schema({
  
    path: {type: String},
    originalname: {type: String},
    size: { type: String},
    public_id: {type: String},
    created_at: {type: Date, default: Date.now()}
});

module.exports = model('Image', ImageSchema);
