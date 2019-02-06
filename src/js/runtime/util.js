class Util {
  // deep clone
  static clone (src) {
    if (src === null || typeof src !== 'object')
      return src

    const ret = {}

    ret.__proto__ = src.__proto__

    for (let key in src) {
      ret[key] = Util.clone(src[key])
    }
    return ret
  }
}
