import Phaser from 'phaser'

class Mushroom extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)
    this.game = game
    this.cursors = this.game.input.keyboard.createCursorKeys()
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.weapon = new Pistol()
  }

  update () {
    if (this.cursors.left.isDown) {
      this.body.velocity.x -= 10
    }
    if (this.cursors.right.isDown) {
      this.body.velocity.x += 10
    }
    if (this.spaceKey.isDown){
      this.body.velocity.x += this.weapon.recoil
      //this.body.
    }

  }
}

export default Mushroom
