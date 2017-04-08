const express = require('express');
const app = express();

app.use(express.static('./public'));


const server = app.listen(3000, () => {
    console.log(server.address().port);
});
const io = require('socket.io')(server);  


/**
 *   User interaction handler
 */
io.on('connection', (socket) => {
  socket.on('user_played', (data) => {
    console.log(data);
    io.sockets.emit('message_received', data)
  });
});