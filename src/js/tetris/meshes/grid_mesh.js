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
      this.vertices.push(new Vector2(-nCol / 2, nRow / 2 - i))
      this.vertices.push(new Vector2(nCol / 2, nRow / 2 - i))
    }

    for (let i = 0; i <= nCol; i++) {
      this.vertices.push(new Vector2(nCol / 2 - i, nRow / 2))
      this.vertices.push(new Vector2(nCol / 2 - i, -nRow / 2))
    }

    this.faces = []
    for (let i = 0; i < this.vertices.length; i++) {
      this.faces.push(i)
    }
  }

  /*
  setDimension (nRow, nCol) {
    let unitLength = 0
    let leftStart = 0
    let topStart = 0

    if (nRow > nCol) {
      unitLength = 2 / nRow
      topStart = 1
      leftStart = -unitLength * nCol / 2
    } else {
      unitLength = 2 / nCol
      leftStart = 1
      topStart = unitLength * nRow / 2
    }

    // const unitLength = nRow > nCol ? 2 / nRow : 2 / nCol

    this.vertices = []
    for (let i = 0; i <= nRow; i++) {
      this.vertices.push(new Vector2(leftStart, topStart - unitLength * i))
      this.vertices.push(new Vector2(-leftStart, topStart - unitLength * i))
    }

    for (let i = 0; i <= nCol; i++) {
      this.vertices.push(new Vector2(leftStart + unitLength * i, topStart))
      this.vertices.push(new Vector2(leftStart + unitLength * i, -topStart))
    }

    this.faces = []
    for (let i = 0; i < this.vertices.length; i++) {
      this.faces.push(i)
    }
  }
  */
}

export default GridMesh
