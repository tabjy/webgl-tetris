import { Behavior } from '../../runtime'

class Rotation extends Behavior {
  onFixedUpdate () {
    super.onFixedUpdate()

    this.transform.rotate(Math.PI / 180)
  }
}


export default Rotation
