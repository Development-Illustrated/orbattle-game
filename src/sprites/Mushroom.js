import Phaser from 'phaser'

class Mushroom extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)

    this.anchor.setTo(0.5)
    this.game = game
    this.game.physics.enable(this)
    this.body.angularDrag = 100
    this.body.maxAngular = 1000
    this.body.drag = { x: 1500, y: 1500 }
    this.body.collideWorldBounds = true
    this.body.bounce.setTo(1, 1)
    this.cursors = this.game.input.keyboard.createCursorKeys()
    this.boomBoom = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  }

  update () {

    this.body.angularAcceleration = 0
    
    if (this.cursors.up.isDown) {
      this.game.physics.arcade.accelerationFromRotation(this.rotation, 50, this.body.acceleration)
    } else {
      this.body.acceleration.set(0)
    }

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
    
    if (this.boomBoom.isDown) {
      this.game.physics.arcade.accelerationFromRotation(this.rotation, 500, this.body.acceleration)
    }
  }
}

export default Mushroom
