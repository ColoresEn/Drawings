const express = require('express');
const router = express.Router();
const path = require('path');
const { unlink } = require('fs-extra');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const { check, validationResult } = require('express-validator');
const Drawing  = require('../models/Drawing');
//var db = require("../models");
// @route       GET /api/drawings
// @desc        Get all user's drawings
// @access      Private
router.get('/', async (req, res) => {
    db.Drawing.find().populate({
        path: "lines",
        select: ' brushColor brushRadius -_id',
        populate: ({ path: 'points', select: ' x  y -_id', })
    })
   .then((dbDrawings) => {
            res.json(dbDrawings);
     })
    .catch((err) => {
            res.json(err);
        })
});
router.get('/lines', async (req, res) => {
    db.Line.find({})
        .then((dbLines) => {
            res.json(dbLines);

        })
        .catch((err) => {
            res.json(err);
        })
});
router.get('/points', async (req, res) => {
    db.Point.find({})
        .then((dbPoints) => {
            res.json(dbPoints);

        })
        .catch((err) => {
            res.json(err);
        })
});
// @route       POST /api/drawings
// @desc        Add new drawing
// @access      Private
 router.post("/", (req, res) =>{

    db.Drawing.create(req.body)
        .then((dbDrawing) => {
         
            console.log(dbDrawing)
          res.json(dbDrawing);
        })
        .catch((err) => {
            res.json(err);
        })
    });
    router.post(
        '/',
      
        async (req, res,) => {
            const {title,  height, width} = req.body;
            console.log ('desde el router', req.body, title,  height, width)
            try {
                const newDrawing = new Drawing({
                   title,
                   height,
                   width
                 
                   
                });
                
               /*  const res1 = await axios.post(`/api/drawing/${res.data._id}`, JSON.stringify(lobj) , config);
      console.log('Lines:' , res1.data); 
      const res2 = await axios.post(`/api/line/${res.data._id}`, JSON.stringify(pobj) , config);
      console.log('Points:' , res2.data);  */
                const drawing = await newDrawing.save()
               
                .then(result => {
                    console.log(result);
                    res.status(201).json();
                 });
                 console.log('desde el router:', drawing)
                res.json(drawing);
            } catch (error) {
                console.error(error.message);
                res.status(500).send('Server error');
            }
        }
    );
  /*   router.post('/',  (req, res, next) => {
              const drawing = new Drawing({
                   title: req.body.title ,
                   height: req.body.height,
                   width: req.body.width,
                          
                });        
                drawing
                .save()
                .then(result => {
                    console.log(result);
                    res.status(201).json({
                    message: "Created product successfully",
                    createDrawing : {
                        _id : result._id,
                        title: result.title ,
                        height: result.height,
                        width: result.width,
                        request: {
                            type: 'GET',
                            url: "http://localhost:5000/api/drawings/drawing/" + result._id

                        }
                    }
                 });

                })
               
                .catch (err => {
                console.error(err);
                res.status(500).json({

                    error:  err
                });

            });
        }); */
    
router.post("/line/:id", (req, res) =>{

    db.Point.create(req.body)
        .then((dbPoint) => {

            return db.Line.findOneAndUpdate(
                {
                    _id: req.params.id
                },
                { $push: { lines: dbPoint._id } },
                { new: true });
        })
        .then((dbLine) => {

            res.json(dbLine);
        })
        .catch((err) => {
            res.json(err);
        })
});

router.get("/lines/:id", (req, res) => {

    db.Line.findOne({
        _id: req.param.id
    })
        .populate("lines")
        .then((dbLine) => {
            res.json(dbDrawing);
        })
        .catch((err) => {
            res.json(err);
        });

});
// @route       POST /api/lines
// @desc        Add new line
// @access      Private

router.post("/drawing/:id", async (req, res) =>{

 await   db.Line.create(req.body)
        .then((dbLine) => {

            return db.Drawing.findOneAndUpdate(
                {
                    _id: req.params.id
                },
                { $push: { lines: dbLine._id } },
                { new: true });
        })
        .then((dbDrawing) => {

            res.json(dbDrawing);
        })
        .catch((err) => {
            res.json(err);
        })
});

router.get("/drawings/:id", (req, res) => {

    db.Drawing.findOne({
        _id: req.param.id
    })
        .populate("lines")
        .then((dbDrawing) => {
            res.json(dbDrawing);
        })
        .catch((err) => {
            res.json(err);
        });

});


/* router.post(
    '/',

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const newDrawing = new Drawing({
                title: req.body.title,
                height: req.body.height,
                width: req.body.width,
                lines: req.body.lineId

            });

            const drawing = await newDrawing.save()
                .exec()
                .then(result => {
                    console.log(result);
                    res.status(201).json();
                });

            // res.json(drawing);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server error');
        }
    }
);

 */
// @route       DELETE /api/drawings/:id
// @desc        Delete drawing
// @access      Private
router.delete('/:id', async (req, res) => {
    try {
        let drawing = await Drawing.findById(req.params.id);

        if (!drawing) return res.status(404).json({ msg: 'Drawing not found' });



        await Drawing.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Drawing removed' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
