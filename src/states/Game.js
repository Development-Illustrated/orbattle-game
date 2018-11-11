import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import config from '../config'

export default class extends Phaser.State {
  init () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.game.physics.arcade.gravity.y = 200

    this.roomNumber = Math.floor(1000 + Math.random() * 9000).toString()

    let body = {
      RoomId: this.roomNumber
    }

    fetch(`${config.httpServer}/register/room`, {
      method: 'POST',
      body: JSON.stringify(body)
    })
      .then(resp => console.log(resp))
      .catch(err => console.error(err))

    this.ws = new WebSocket(`${config.socketServer}`)
    this.ws.onopen = (evt) => {
      this.ws.onmessage = (evt) => {
        let data = JSON.parse(evt.data)
        if (data.ClientId && data.RoomId && data.ClientName) {
          console.log(`New room join: ${data.ClientName}`)
          this.addPlayer(data.ClientName, data.RoomId)
        }
      }
    }
  }

  preload () {
    this.game.time.advancedTiming = true
  }

  create () {
    // Always render background first
    this.game.add.sprite(0, 0, 'background')
    this.text = this.game.add.text(32, 32, `Room code: ${this.roomNumber}`, {
      font: '18px Arial',
      fill: '#ffffff'
    })

    // Add room code
  }

  update () {
  }

  render () {
    // this.game.debug.text(this.game.time.fps || '--', 2, 14, '#00ff00')
  }

  addPlayer (name, clientId) {
    this.mushroom = new Mushroom({
      game: this.game,
      x: 300,
      y: 399,
      asset: 'mushroom',
      name: name,
      clientId: clientId
    })

    this.game.add.existing(this.mushroom)
  }
}
