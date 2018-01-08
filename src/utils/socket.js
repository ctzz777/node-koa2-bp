const socketIo = (server) => {
  const io = require('socket.io')(server);

  io.on('connection', function (socket) {
    console.log(`${socket.id} is connected!`);
    socket.on('message', (msg) => {
      console.log(`on event message: ${msg}`);
    });
    socket.on('disconnect', () => {
      console.log(`${socket.id} is disconnected!`);
    });
  });

  return io;
};

module.exports = socketIo;