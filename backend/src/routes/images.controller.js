const imagesCtrl = {};
const path = require('path');
const { unlink } = require('fs-extra');
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'recicle',
    api_key:'773575843219499',
    api_secret: 'v1OqHOwAtoH8j3Nk2xgPmW_DYrE'
});
const fs = require('fs-extra');
// Models
const Image = require ('../models/Image');

imagesCtrl.getImages = async (req, res) => {
    const images = await Image.find();
    res.json(images);
};


imagesCtrl.createImage =async (req, res) => {
    console.log(req.body);
try {
   // Receive Frontend Data
   const { title,  description , path, public_id, size, originalname} = req.body;
       
         // Creating a new Category Document for Mongodb
     const image = new Image({ title,  description, path, public_id, size, originalname});
         // Saving the newCategory to the database
     await image.save();
         // Deleting the Image from our Server
     //await fs.unlink(path);
     res.json({message: 'Imagen subida'});
    }
    catch (e) {
        console.log(e)
    }
};


/*     const image = new Image();
    image.title = req.body.title;
    image.description = req.body.description;
    image.filename = req.file.filename;
    image.path = '/img/uploads/' + req.file.filename;
    image.originalname = req.file.originalname;
    image.mimetype = req.file.mimetype;
    image.size = req.file.size;
    await image.save();
    res.json({message: 'Imagen subida'});
}; */
 
imagesCtrl.getImage= async (req, res) => {
  
    const image = await Image.findById(req.params.id);
    res.json(image );
};
// Edit Images
/* imagesCtrl.get('/edit/:id', isAuthenticated, async (req, res) => {
  const image = await Image.findById(req.params.id);
  if(image.user != req.user.id) {
    req.flash('error_msg', 'Not Authorized');
    return res.redirect('/images');
  } 
  res.render('images/edit-image', { image });
}); */

imagesCtrl.updateImage =  async (req, res) => {

  await Image.findByIdAndUpdate(req.params.id);
   
    res.json({ message: 'Image updated' })
};

imagesCtrl.deleteImage= async (req, res) => {
  
    const image = await Image.findByIdAndDelete(req.params.id);
    await cloudinary.v2.uploader.destroy(image.public_id);
    //await unlink(path.resolve('./src/public' + imageDeleted.path));
    res.json({ message: 'Image deleted' })
};

module.exports = imagesCtrl;