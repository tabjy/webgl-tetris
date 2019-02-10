import { Color, GameObject, Mesh, Renderer } from '../../runtime'

import GridMesh from '../meshes/grid_mesh'
import LineRenderer from '../renderers/line_renderer'

class Grid extends GameObject {
  constructor () {
    super()

    this.addComponent(GridMesh)
    this.addComponent(LineRenderer)

    this.setColor(Color.gray)
  }

  setColor (color) {
    this.getComponent(Renderer).setColor(color)
  }

  setDimension (nRow, nCol) {
    this.getComponent(Mesh).setDimension(nRow, nCol)
  }
}

export default Grid
