import { Renderer } from '../../runtime'

class SquareRenderer extends Renderer {
  setColor (color) {
    this.uniforms.fColor.buffer = color.flatten()
  }
}

export default SquareRenderer
