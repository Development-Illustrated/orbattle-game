import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {
    this.optionCount = 1;
  }

  addGameMusic () {
    let music = this.add.audio('scattershot')
    music.loop = true
    music.play()
  }

  preload () {
    this.optionCount = 1
  }

  create () {
    // Always render background first
    this.game.add.sprite(0, 0, 'background')
    this.addGameMusic()
    this.state.disableVisibilityChange = true

    // this.add.myLogo
    this.add.sprite(this.world.centerX - 400, this.world.centerY - 250, 'logo')
    let button = this.add.button(this.world.centerX - 100, this.world.centerY, 'start_button', this.actionOnClick, this, 2, 1, 0)

    button.onInputOver.add(this.onOver, this)
    button.onInputOut.add(this.onOut, this)
  }
  onOver (target) {
    target.fill = '#FEFFD5'
    target.stroke = 'rgba(200, 200, 200, 0.5)'
  }

  onOut (target) {
    target.fill = 'white'
    target.stroke = 'rgba(0, 0, 0, 0)'
  }

  actionOnClick () {
    this.state.start('Game')
  }

  render () {
    this.game.debug.text(this.game.time.fps || '--', 2, 14, '#00ff00')
  }

  startGame () {
    this.state.start('Menu')
  }
}
