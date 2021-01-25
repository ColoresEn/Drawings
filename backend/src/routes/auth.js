const express = require('express');
const router = express.Router();
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');
const { check, validationResult } = require('express-validator');
var db = require("../models");


// @route       GET /api/auth
// @desc        Get logged in user
// @access      Private
router.get('/', authMiddleware, async (req, res) => {
   try {
      const user = await db.User.findById(req.user.id).select('-password');
      res.json(user);
   } catch (error) {
      console.error(error.message);
      res.status(500).json('Server error');
   }
});

// @route       POST /api/auth
// @desc        Auth user and get token
// @access      Public
router.post(
   '/',
   [
      check('email', 'Enter a valid email').isEmail(),
      check('password', 'Password is required').exists()
   ],
   async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      try {
         let user = await db.User.findOne({ email });
         console.log(user)
         if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
         }

         const isMatch = await bcrypt.compare(password, user.password);

         if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
         }

         const payload = {
            user: {
               id: user._id
            }
         };

         jwt.sign(
            payload,
            config.get('jwtSecret'),
            {
               expiresIn: 3600000
            },
            (error, token) => {
               if (error) throw error;
               res.json({ token });
            }
         );
      } catch (error) {
         console.log(error.message);
         res.status(500).json('Server error');
      }
   }
);

module.exports = router;
