import Phaser from 'phaser'

class Mushroom extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)
    this.game = game
    this.cursors = this.game.input.keyboard.createCursorKeys()
  }

  update () {
    if (this.cursors.left.isDown) {
      this.body.angularDrag = -5
      this.body.angularAcceleration = 10
      this.body.maxAngular = -20
      //this.angle -= TURN_SPEED
      //this.speedOfRotation = -TURN_SPEED
    }

    else if (this.cursors.right.isDown) {
      //this.angle += TURN_SPEED
      //this.speedOfRotation = TURN_SPEED
      this.body.angularDrag = 5
      this.body.angularAcceleration = -10
      this.body.maxAngular = 20
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
