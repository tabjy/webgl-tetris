// TODO: integrate with Vector3 in the future
class Color {
  constructor (r = 0, g = 0, b = 0, a = 0, base = 1) {
    this.r = r
    this.g = g
    this.b = b
    this.a = a
  }

  flatten () {
    return new Float32Array([this.r, this.g, this.b, this.a])
  }
}

Color.black = new Color(0, 0, 0, 1)
Color.blue = new Color(0, 0, 1, 1)
Color.clear = new Color(0, 0, 0, 0)
Color.cyan = new Color(0, 1, 1, 1)
Color.gray = new Color(0.5, 0.5, 0.5, 1)
Color.green = new Color(0, 1, 0, 1)
Color.magenta = new Color(1, 0, 1, 1)
Color.red = new Color(1, 0, 0, 1)
Color.white = new Color(1, 1, 1, 1)
Color.yellow = new Color(1, 0.92, 0.016, 1)

export default Color
