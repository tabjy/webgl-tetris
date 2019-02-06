// TODO: integrate with Vector3 in the future
class Color {
  constructor (r, g, b, a) {
    this.r = r || 0
    this.g = g || 0
    this.b = b || 0
    this.a = a || 1
  }

  flatten () {
    return new Float32Array([this.r, this.g, this.b, this.a])
  }
}

Color.black = new Color(0, 0, 0, 1)
Color.blue = new Color(0, 0, 1, 1)
Color.clear = new Color(0, 1, 1, 1)
Color.cyan = new Color(0, 0, 0, 0)
Color.gray = new Color(0.5, 0.5, 0.5, 1)
Color.green = new Color(0, 1, 0, 1)
Color.grey = new Color(0.5, 0.5, 0.5, 1)
Color.magenta = new Color(1, 0, 1, 1)
Color.red = new Color(1, 0, 0, 1)
Color.white = new Color(1, 1, 1, 1)
Color.yellow = new Color(1, 0.92, 0.016, 1)

export default Color
