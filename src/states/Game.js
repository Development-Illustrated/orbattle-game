import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'

export default class extends Phaser.State {
  init () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.game.physics.arcade.gravity.y = 10
  }

  preload () { }

  create () {
    this.mushroom = new Mushroom({
      game: this.game,
      x: 32,
      y: 32,
      asset: 'mushroom'
    })

    this.game.physics.enable(this.mushroom)

    this.game.add.existing(this.mushroom)
  }

  update () {
  }

  render () {
  }
}
