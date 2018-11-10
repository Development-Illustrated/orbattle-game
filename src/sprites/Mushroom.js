import Phaser from 'phaser'

class Mushroom extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)
    this.game = game
    this.game.physics.enable(this)
    this.body.angularDrag = 100
    this.body.maxAngular = 1000
    this.cursors = this.game.input.keyboard.createCursorKeys()
  }

  update () {

    this.body.angularAcceleration = 0

    if (this.cursors.left.isDown) {
      //this.body.angularVelocity = -100
      this.body.angularAcceleration = -200
      //this.angle -= TURN_SPEED
      //this.speedOfRotation = -TURN_SPEED
    }

    else if (this.cursors.right.isDown) {
      //this.angle += TURN_SPEED
      //this.speedOfRotation = TURN_SPEED
      //this.body.angularVelocity = 100
      this.body.angularAcceleration = 200
    }

    /*else {
      if (this.speedOfRotation < 0) {
        this.speedOfRotation = this.speedOfRotation + 0.2
        this.angle += this.speedOfRotation
      }
      
      else if (this.speedOfRotation > 0) {
        this.speedOfRotation = this.speedOfRotation - 0.2
        this.angle += this.speedOfRotation
      }
    }*/
  }
}

export default Mushroom
