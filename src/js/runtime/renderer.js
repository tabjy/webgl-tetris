import Component from './component'
import Material from './material'
import ShaderProgram from './shader_program'

class Renderer extends Component {
  constructor (gameObject) {
    super(gameObject)

    this.material = new Material() // TODO
    this.shaderProgram = new ShaderProgram() // TODO
  }
}

export default Renderer
