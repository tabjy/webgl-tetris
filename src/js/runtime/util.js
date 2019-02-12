class Util {
  // deep clone
  static clone (src, dst) {
    if (src === null || typeof src !== 'object') {
      return src
    }

    const ret = dst || {}

    ret.__proto__ = src.__proto__

    for (let key in src) {
      ret[key] = Util.clone(src[key], ret[key] ? ret[key] : null)
    }
    return ret
  }
}

export default Util
