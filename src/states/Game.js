import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'

export default class extends Phaser.State {
  init () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    // this.game.physics.arcade.gravity.y = 200
  }

  preload () { }

  create () {
    this.game.add.sprite(0, 0, 'background')
    this.mushroom = new Mushroom({
      game: this.game,
      x: 300,
      y: 399,
      asset: 'mushroom'
    })

    this.game.add.existing(this.mushroom)
  }

  update () {
  }

  render () {
  }
}
