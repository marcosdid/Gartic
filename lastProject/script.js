document.addEventListener('DOMContentLoaded', () => {

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

  const DrawLine = (line) => {
    context.beginPath()
    context.moveTo(line.previousPos.x, line.previousPos.y)
    context.lineTo(line.pos.x, line.pos.y)
    context.stroke()
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

  const cycle = () => {
    if(mouse.active && mouse.move && mouse.previousPos) {
      DrawLine({pos: mouse.pos, previousPos:mouse.previousPos})
      mouse.move = false
    }
    mouse.previousPos = {x: mouse.pos.x, y: mouse.pos.y}
    setTimeout(cycle, 50)
  }
  cycle()
})