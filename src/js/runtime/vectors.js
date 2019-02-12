class Vector2 {
  get magnitude () {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  get normalized () {
    const mag = this.magnitude
    return new Vector2(this.x / mag, this.y / mag)
  }

  constructor (x, y) {
    this.x = x || 0
    this.y = y || 0
  }

  normalize () {
    const mag = this.magnitude
    this.x /= mag
    this.y /= mag
  }

  flatten () {
    return new Float32Array([this.x, this.y])
  }

  equals (rhs) {
    return this.x === rhs.x && this.y === rhs.y
  }

  add (rhs) {
    return new Vector2(this.x + rhs.x, this.y + rhs.y)
  }

  sub (rhs) {
    return new Vector2(this.x - rhs.x, this.y - rhs.y)
  }

  mul (rhs) {
    if (rhs instanceof Vector2) {
      return new Vector2(this.x * rhs.x, this.y * rhs.y)
    }

    return new Vector2(this.x * rhs, this.y * rhs)
  }

  div (rhs) {
    if (rhs instanceof Vector2) {
      return new Vector2(this.x / rhs.x, this.y / rhs.y)
    }

    return new Vector2(this.x / rhs, this.y / rhs)
  }

  neg () {
    return new Vector2(-this.x, -this.y)
  }
}

Vector2.up = new Vector2(0, 1)
Vector2.down = new Vector2(0, -1)
Vector2.left = new Vector2(-1, 0)
Vector2.right = new Vector2(1, 0)
Vector2.one = new Vector2(1, 1)
Vector2.zero = new Vector2(0, 0)

export { Vector2 }
