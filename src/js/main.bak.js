import '../styles/main.scss'

import { getWebGlCtx, initShaderProgram } from './lib'

const gameObjects = []

const Game = {
  init (gl) {
    this.gl = gl
    this.vBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vBuffer)
  }
}

class Triangle {
  constructor () {
    this.vertices = [
      -0.25, -0.25, 0,
      0, 0.25, 0,
      0.25, -0.25, 0
    ]

    this.position = { x: 0, y: 0 }

    this.shader = initShaderProgram(Game.gl, require('../shaders/passthrough.vert.glsl'),
      require('../shaders/passthrough.frag.glsl'))

    Game.gl.useProgram(this.shader)
    Game.gl.bindBuffer(Game.gl.ARRAY_BUFFER, Game.vBuffer)

    const vPosition = Game.gl.getAttribLocation(this.shader, 'vPosition')
    Game.gl.vertexAttribPointer(vPosition, 3, Game.gl.FLOAT, false, 0, 0)
    Game.gl.enableVertexAttribArray(vPosition)
  }

  translate ({ x, y }) {
    this.position.x += x
    this.position.y += y
  }

  render () {
    const vertices = JSON.parse(JSON.stringify(this.vertices))
    for (let i = 0; i < this.vertices.length; i++) {
      vertices[i] += i % 2 ? this.position.x : this.position.y
    }

    Game.gl.bindBuffer(Game.gl.ARRAY_BUFFER, Game.vBuffer)
    Game.gl.bufferData(Game.gl.ARRAY_BUFFER, new Float32Array(vertices), Game.gl.STATIC_DRAW)

    Game.gl.useProgram(this.shader)
    Game.gl.drawArrays(Game.gl.TRIANGLES, 0, 3)
  }

}

async function main () {
  const canvasElem = document.querySelector('#canvas')
  const gl = getWebGlCtx(canvasElem)

  gl.viewport(0, 0, canvasElem.width, canvasElem.height)
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.enable(gl.DEPTH_TEST)

  Game.init(gl)

  const triangle1 = new Triangle(gl)
  gameObjects.push(triangle1)

  const triangle2 = new Triangle(gl)
  gameObjects.push(triangle2)

  triangle1.translate({ x: 0.1, y: 0.1 })
  triangle2.translate({ x: -0.1, y: -0.1 })

  window.requestAnimationFrame(render)
  // // const triangle2 = new Triangle(gl)
  // // gameObjects.push(triangle2)
  // // triangle2.translate(0.25, 0)
  //
  // setInterval(() => {
  //   render()
  //   triangle1.translate({ x: 0.01, y: 0.01 })
  //   triangle2.translate({ x: -0.01, y: -0.01 })
  //
  //   const fix = (position) => {
  //     position.x = position.x > 1 || position.x < -1 ? -position.x : position.x
  //     position.y = position.y > 1 || position.y < -1 ? -position.y : position.y
  //   }
  //
  //   fix(triangle1.position)
  //   fix(triangle2.position)
  //
  // }, 1000 / 60)
}

function render () {
  Game.gl.clear(Game.gl.COLOR_BUFFER_BIT | Game.gl.DEPTH_BUFFER_BIT)
  for (let gameObject of gameObjects) {
    gameObject.render()
  }
}

main().then(code => {
  if (code) {
    throw new Error(`non-zero exit code from main(): ${code}`)
  }
}).catch(err => {
  console.error(err)
})
