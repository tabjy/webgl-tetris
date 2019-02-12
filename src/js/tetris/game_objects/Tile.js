import { GameObject, Vector2, Color } from '../../runtime'
import Square from './square'
import TileMovement from '../behaviors/tile_movement'

class Tile extends GameObject {
  constructor () {
    super()

    this.pattern = Tile.patterns[Math.floor(Math.random() * Tile.patterns.length)]
    this.spawnOffset = this.pattern.name === 'O-shape' ? new Vector2(-0.5, -0.5) : Vector2.zero

    this.color = Tile.colors[Math.floor(Math.random() * Tile.colors.length)]
    this.squares = []

    for (let position of this.pattern.positions) {
      const square = new Square()
      square.setColor(this.color)
      square.transform.position = position.mul(1)
      square.transform.setParent(this.transform)

      this.squares.push(square)
    }

    this.addComponent(TileMovement)
  }
}

Tile.patterns = [
  {
    name: 'O-shape',
    // relative to tile pivot
    positions: [
      new Vector2(-0.5, 0.5),
      new Vector2(0.5, 0.5),
      new Vector2(-0.5, -0.5),
      new Vector2(0.5, -0.5)
    ],
    rotations: [0]
  },
  {
    name: 'I-shape',
    positions: [
      new Vector2(-2, 0),
      new Vector2(-1, 0),
      new Vector2(0, 0),
      new Vector2(1, 0)
    ],
    rotations: [0, Math.PI / 2]
  },
  {
    name: 'S-shape',
    positions: [
      new Vector2(0, 0),
      new Vector2(1, 0),
      new Vector2(-1, -1),
      new Vector2(0, -1)
    ],
    rotations: [0, Math.PI / 2]
  },
  {
    name: 'Z-shape',
    positions: [
      new Vector2(-1, 0),
      new Vector2(0, 0),
      new Vector2(0, -1),
      new Vector2(1, -1)
    ],
    rotations: [0, Math.PI / 2]
  },
  {
    name: 'L-shape',
    positions: [
      new Vector2(-1, 0),
      new Vector2(0, 0),
      new Vector2(1, 0),
      new Vector2(-1, -1)
    ],
    rotations: [0, Math.PI / 2, Math.PI, Math.PI * (3 / 2)]
  },
  {
    name: 'J-shape',
    positions: [
      new Vector2(-1, 0),
      new Vector2(0, 0),
      new Vector2(1, 0),
      new Vector2(1, -1)
    ],
    rotations: [0, Math.PI / 2, Math.PI, Math.PI * (3 / 2)]
  },
  {
    name: 'T-shape',
    positions: [
      new Vector2(-1, 0),
      new Vector2(0, 0),
      new Vector2(1, 0),
      new Vector2(0, -1)
    ],
    rotations: [0, Math.PI / 2, Math.PI, Math.PI * (3 / 2)]
  }
]

Tile.colors = [
  Color.yellow,
  Color.magenta,
  Color.green,
  Color.blue,
  Color.red,
  Color.cyan
]

export default Tile
