import { GameObject, Renderer, Mesh } from '../../runtime'

class Square extends GameObject {
  constructor () {
    super()

    this.addComponent(Renderer)
    this.addComponent(Mesh)
  }
}

export default Square
