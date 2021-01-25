const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { check, validationResult } = require("express-validator");
const Drawing = require('../models/Drawing');
// @route       GET /api/drawings
// @desc        Get all user's drawings
// @access      Private

router.get("/", authMiddleware, async (req, res) => {
  Drawing.find({ user: req.user.id })
    .populate({
      path: "lines",
      select: " brushColor brushRadius -_id",
      populate: { path: "points", select: " x  y -_id" },
    })
    .then((dbDrawings) => {
      res.json(dbDrawings);
    })
    .catch((err) => {
      res.json(err);
    });
});
// @route       POST /api/drawings
// @desc        Add new drawing
// @access      Private
router.post(
  "/",
  authMiddleware,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

   await Drawing.create(req.body)
      .then((dbDrawing) => {
        dbDrawing.user=req.user.id;
       dbDrawing.save();
        res.json(dbDrawing);
      })
      .catch((err) => {
        res.json(err);
      });
  }
);
// @route       POST /api/drawings/drawing/:id
// @desc        Add new line
// @access      Private
router.post("/drawing/:id", async (req, res) => {
  await db.Line.create(req.body)
    .then((dbLine) => {
      return Drawing.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { $push: { lines: dbLine._id } },
        { new: true }
      );
    })
    .then((dbDrawing) => {
      res.json(dbDrawing);
    })
    .catch((err) => {
      res.json(err);
    });
});

// @route       DELETE /api/drawings/:id
// @desc        Delete drawing
// @access      Private
router.delete("/:id",authMiddleware, async (req, res) => {
  try {
    let drawing = await Drawing.findById(req.params.id);

    if (!drawing) return res.status(404).json({ msg: "Drawing not found" });
  // Make sure the user owns the drawing
  if (drawing.user.toString() !== req.user.id) {
    return res.status(401).json({ msg: 'Not authorized' });
}
    await Drawing.findByIdAndRemove(req.params.id);

    res.json({ msg: "Drawing removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
