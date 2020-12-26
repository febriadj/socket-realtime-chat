const express = require('express');
const http = require('http');
const path = require('path');
const socket = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socket(server);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public/css')));
app.use(express.static(path.join(__dirname, '/public/js')));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Chat App'
  });
});

io.on('connection', (socket) => {
  console.log('user connected');

  io.emit('some event', { 
    someProperty: 'some value', 
    otherProperty: 'other value' 
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`app running on port ${port}`);
});