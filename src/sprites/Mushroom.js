import Phaser from 'phaser'

class Mushroom extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)

    this.game = game
    this.cursors = this.game.input.keyboard.createCursorKeys()
  }

  update () {
    if (this.position.y > document.documentElement.clientHeight / 4) {
      this.body.gravity.y = 1000
    }
    if (this.cursors.left.isDown) {
      this.body.velocity.x -= 10
    }
    if (this.cursors.right.isDown) {
      this.body.velocity.x += 10
    }
  }
}

export default Mushroom
