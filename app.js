const express = require("express")
const httpServer = require("http")
const socket = require("socket.io")

const app = express()
const server = httpServer.createServer(app);
const io = new socket.Server(server);

app.use(express.static(__dirname + '/public'))

let history = []

io.on("connection", socket => {
  console.log('connect')

  history.forEach(line => {
    socket.emit('draw', line)
  })

  socket.on('clear', () => {
    history = new Array()
    io.emit('clear')
  })

  socket.on('draw', (line) => {
    history.push(line)
    io.emit('draw', line)
  })
});

server.listen(3000, ()=> console.log(`Server running in: http://localhost:3000`));