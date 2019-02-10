import { Mesh, Vector2 } from '../../runtime'

class GridMesh extends Mesh {
  constructor (gameObject) {
    super(gameObject)

    this.vertices = [
      new Vector2(-1, 0),
      new Vector2(1, 0),
      new Vector2(0, 1),
      new Vector2(0, -1)
    ]
    this.faces = [0, 1, 2, 3]
  }

  setDimension (nRow, nCol) {
    this.vertices = []
    for (let i = 0; i <= nRow; i++) {
      this.vertices.push(new Vector2(0, i))
      this.vertices.push(new Vector2(nCol, i))
    }

    for (let i = 0; i <= nCol; i++) {
      this.vertices.push(new Vector2(i, 0))
      this.vertices.push(new Vector2(i, nRow))
    }

    this.faces = []
    for (let i = 0; i < this.vertices.length; i++) {
      this.faces.push(i)
    }
  }
}

export default GridMesh
