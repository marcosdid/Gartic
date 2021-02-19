document.addEventListener('DOMContentLoaded', () => {

  const socket = io.connect()

  const mouse = {
    active:false,
    move: false,
    pos: { x:0, y:0 },
    previousPos: { x:null, y:null }
  }

  const screen = document.querySelector('#screen')
  const context = screen.getContext('2d')

  screen.width = 770
  screen.height = 500
  context.strokeStyle = 'teal'

  const DrawLine = (line) => {
    context.beginPath()
    context.moveTo(line.previousPos.x, line.previousPos.y)
    context.lineTo(line.pos.x, line.pos.y)
    context.stroke()
  }

  const clearContext = () => {
    context.clearRect(0,0, screen.width, screen.height)
  }
  
  screen.onmousedown = () => {
    mouse.active = true
  }

  screen.onmouseup = () => {
    mouse.active = false
  }

  screen.onmousemove = (evt) => {
    mouse.pos.x = evt.clientX
    mouse.pos.y = evt.clientY
    mouse.move = true
  }

  socket.on('draw', (line) => {
    DrawLine(line)
  })

  socket.on('clear', () => clearContext())

  const cycle = () => {
    if(mouse.active && mouse.move && mouse.previousPos) {
      socket.emit('draw', {pos: mouse.pos, previousPos:mouse.previousPos})
      mouse.move = false
    }
    mouse.previousPos = {x: mouse.pos.x, y: mouse.pos.y}
    setTimeout(cycle, 50)
  }
  cycle()

  document.body.addEventListener('keyup', e => {
    if(e.keyCode === 32) {
      socket.emit('clear')
    }
  })
})