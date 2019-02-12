import { Renderer, Game } from '../../runtime'

class LineRenderer extends Renderer {
  setColor (color) {
    this.uniforms.fColor.buffer = color.flatten()
  }

  onDrawCall () {
    const gl = Game.gl
    gl.drawArrays(gl.LINES, this.vPosition._pos,
      Math.floor(this.vPosition.buffer.length / this.vPosition.size))
  }
}

export default LineRenderer
