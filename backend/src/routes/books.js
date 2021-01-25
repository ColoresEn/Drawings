const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');

const Book = require('../models/Book');

// @route       GET /api/books
// @desc        Get all user's books
// @access      Private
router.get('/',  async (req, res) => {
    try {
        const books = await Book.find().sort({
            date: -1
        });
    
        res.json(books);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// @route       POST /api/books
// @desc        Add new book
// @access      Private
router.post(
    '/',
    [
       
       
            check('title', 'Name is required')
                .not()
                .isEmpty()
      
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {title, author, bookId } = req.body;

        try {
            const newBook = new Book({
               title,
               author,
               bookId
               
            });

            const book = await newBook.save();

            res.json(book);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server error');
        }
    }
);
/* router.get('/:id',  async (req, res) => {
  
    const book = await Book.findById(req.params.id);
    res.json(book );
}; */

// @route       DELETE /api/books/:id
// @desc        Delete book
// @access      Private
router.delete('/:id',  async (req, res) => {
    try {
        let book = await Book.findById(req.params.id);

        if (!book) return res.status(404).json({ msg: 'Book not found' });

    

        await Book.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Book removed' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
