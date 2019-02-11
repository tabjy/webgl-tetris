import { Color, GameObject, Mesh, Renderer } from '../../runtime'
import SquareRenderer from '../renderers/square_renderer'

class Square extends GameObject {
  constructor () {
    super()

    this.addComponent(Mesh)
    this.addComponent(SquareRenderer)

    this.setColor(Color.red)

    // gap between two squares
    this.transform.scaling.x = 0.95
    this.transform.scaling.y = 0.95
  }

  setColor (color) {
    this.getComponent(Renderer).setColor(color)
  }
}

export default Square
