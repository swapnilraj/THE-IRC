const express = require('express');
const app = express();

app.use(express.static('./public'));


const server = app.listen(1212, () => {
    console.log(server.address().port);
});
const io = require('socket.io')(server);  


/**
 *   User interaction handler
 */
io.on('connection', (socket) => {
  socket.on('user_played', (data) => {
    socket.broadcast.emit('message_received', data)
  });
});