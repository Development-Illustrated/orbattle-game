import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.image('mushroom', 'assets/images/ship1.png')
    this.load.image('background', 'assets/images/background.png')
    this.load.image('logo', 'assets/images/orbattle_logo.png')
    this.load.image('start_button', 'assets/images/start_button.png')

    this.load.audio('scattershot', 'assets/music/scattershot.mp3')
  }

  create () {
    this.state.start('Menu')
    // this.state.start('Game')
  }
}
