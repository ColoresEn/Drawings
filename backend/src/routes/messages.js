const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Message = require('../models/Message');

// @route       GET /api/messages
// @desc        Get all user's messages
// @access      Private
router.get('/', authMiddleware, async (req, res) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// @route       POST /api/messages
// @desc        Add new message
// @access      Private
router.post(
    '/',    
    [
        authMiddleware,
        [
            check('username', 'Name is required')
                .not()
                .isEmpty()
        ]
    ],
   
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { text, date, username  } = req.body;

        try {
            const newMessage = new Message({
            
                text,
                date,
                username
            });

            const message = await newMessage.save();

            res.json(message);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server error');
        }
    }
);

// @route       PUT /api/messages/:id
// @desc        Update message
// @access      Private
router.put('/:id', authMiddleware, async (req, res) => {
    const {username, text, date  } = req.body;
    const messageFields = {};

    if (username) messageFields.username =req.user.username;
    if (text) messageFields.text = text;
    if (date) messageFields.date = date;
 

    try {
        let message = await Message.findById(req.params.id);

        if (!message) return res.status(404).json({ msg: 'Message not found' });

   /*      // Make sure the user owns the message
        if (message.username.toString() !== req.user.username) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
 */
        message = await Message.findByIdAndUpdate(
            req.params.id,
            { $set: messageFields },
            { new: true }
        );

        res.json(message);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// @route       DELETE /api/messages/:id
// @desc        Delete message
// @access      Private
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        let message = await Message.findById(req.params.id);

        if (!message) return res.status(404).json({ msg: 'Message not found' });

 

        await Message.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Message removed' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
