const express = require('express');
const bodyParser = require('body-parser');
const path =require('path');
const morgan = require("morgan");
const multer = require('multer');
const uuid = require('uuid').v4;
const helmet = require("helmet");
const connectDB = require('./config/db');
const cors = require("cors");
//CONNECT TO DB
connectDB();


// INIT MIDDLEWARE
const app = express();
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors({ origin: 3000 }));
app.use(express.static(path.join(__dirname, 'build')));
app.use(morgan('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended:false}));

const storage = multer.diskStorage({
  destination: path.join(__dirname, './public/img/uploads'),
  filename: (req, file, cb, filename) => {
      console.log(file);
      cb(null, uuid() + path.extname(file.originalname));
  }
}) 
app.use(multer({ storage }).single('image'));
app.use(helmet());
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.set('port', process.env.PORT || 3000);
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("tiny"));
}
// ROUTES
app.use('/api/posts', require('./routes/posts.js'));
app.use('/api/users', require('./routes/users'));
app.use('/api/comments', require('./routes/comments'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/books', require('./routes/books'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/drawings', require('./routes/drawings'));
app.use('/api/images', require('./routes/images'));
app.use('/api/messages', require('./routes/messages'));

module.exports = app;
