import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import Asteroid from '../sprites/Asteroid'

export default class extends Phaser.State {
  init () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.game.physics.arcade.gravity.y = 200
  }

  preload () {
    this.game.time.advancedTiming = true
  }

  create () {
    this.game.add.sprite(0, 0, 'background')
    this.asteroids = this.game.add.group();
    this.mushroom = new Mushroom({
      game: this.game,
      x: 300,
      y: 399,
      asset: 'mushroom'
    })

    this.game.add.existing(this.asteroids)

    for (var i = 0; i < 16; i++)
    {
      this.asteroid = new Asteroid({
        game: this.game,
        x: Math.random() * 1200, 
        y: Math.random() * 799, 
        asset: 'asteroid'})

      this.asteroids.add(this.asteroid)
  }

    this.game.add.existing(this.mushroom)
    this.game.add.existing(this.asteroids)
  }

  update () {
  }

  render () {
    this.game.debug.text(this.game.time.fps || '--', 2, 14, '#00ff00')
  }
}
