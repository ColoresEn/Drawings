const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');
const socket = require('socket.io');


const app = require('./app');
const port = process.env.PORT || 4000;
/* var options = {
  key: fs.readFileSync(path.join(__dirname, 'cert', 'www.qepweb.es-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'www.qepweb.es-crt.pem')),
};

const server= https.createServer(options, app).listen(4443); */


const server = app.listen(port, () => console.log(`Listening on port ${port}`));

// SERVE STATIC ASSETS IN PRODUCTION
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '/build')));
   // Handle React routing, return all requests to React app
   app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '/build', 'index.html'));
  });
}



// Start the server
io = socket(server);
io.on('connection', (socket) => {
  console.log(socket.id);
  socket.on('SEND_MESSAGE', function (data){
    
    io.emit('RECEIVE_MESSAGE', data);
})
});