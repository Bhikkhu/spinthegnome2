const {test} = require('./src/db.js');
test();

const greatNames = [
  'Stinky',
  'Doofus',
  'Buttmunch',
  'Dummy',
  'Dunce',
  'Airhead',
  'Lobotomite',
  'Lamebrain',
  'King Lesbian'
]

const io = require('socket.io')({
  cors: {
    origin: '*'
  }
});

io.on('connection', socket => {
  let name = greatNames[Math.floor(Math.random()*greatNames.length)];
  console.log(`${name} has connected. (${socket.id})`);
  io.to(socket.id).emit("set username", name);
  socket.on('hello!', () => {
    console.log(`hello from ${name}! (${socket.id})`);
  });

  socket.on('disconnect', () => {
    console.log(`${name} has disconnected. (${socket.id})`);
  });

  socket.on('disco', () =>{

  })
});

io.listen(3001);

let randomMessages = [
  "Hey!",
  "Buddy!",
  "*whistle*",
  "Yoo-hoo!"
]

setInterval(() => {
  let randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
  io.emit('message', randomMessage);
}, 1000);
setInterval(() => {
  let randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
  io.emit('disco', "alright!!");
}, 10000);
