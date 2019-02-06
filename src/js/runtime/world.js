import GameObject from './game_object'

class World extends GameObject {
  constructor () {
    super('world', 'world')
  }

  static getInstance () {
    if (!World.instance) {
      World.instance = new World()
    }

    return World.instance
  }
}

export default World
