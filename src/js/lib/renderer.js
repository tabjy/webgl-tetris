import Component from './component'
import Material from './material'

class Renderer extends Component {
  constructor (gameObject) {
    super(gameObject)

    this.material = new Material() // TODO
  }
}

export default Renderer
