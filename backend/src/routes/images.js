const { Router } = require('express');
const router = Router();
const {getImages, createImage , getImage, updateImage, deleteImage} = require('./images.controller');

router.route('/')
    .get(getImages) 
    .post(createImage);

router.route('/:id')
    .get(getImage)    
    .put(updateImage)
    .delete (deleteImage);

    module.exports = router;  