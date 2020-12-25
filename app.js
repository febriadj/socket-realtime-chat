const express = require('express'),
      http = require('http'),
      path = require('path'),
      socket = require('socket.io'),
      app = express(),
      server = http.createServer(app),
      io = socket(server);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Chat App'
  });
});

io.on('connection', (socket) => {
  console.log('a user connected');
  io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`app running on port ${port}`));