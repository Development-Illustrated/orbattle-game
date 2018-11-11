import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import config from '../config'

export default class extends Phaser.State {
  init () {
    this.players = []
    this.playersGroup = this.game.add.group()
    this.bulletGroups = this.game.add.group()
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.game.physics.arcade.gravity.y = 0

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
      console.log(evt)
      this.ws.onmessage = (evt) => {
        console.log(evt)
        let data = JSON.parse(evt.data)
        console.log(data)
        if (data.Command) {
          this.relayCommand(data)
        }
        if (data.ClientId && data.RoomId && data.ClientName) {
          console.log(`New room join`, data.ClientName)
          this.addPlayer(data.ClientName, data.ClientId)
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
  }

  update () {
    for (var i = 0; i < this.players.length; i++) {
      for (var l = 0; l < this.players.length; l++) {
        if (i !== l) {
          this.game.physics.arcade.overlap(this.players[i].weapon.bullets, this.players[l], this.bulletCollision, null, this)
        }
      }
    }
  }

  render () {}

  relayCommand (data) {
    let player = this.players.filter(player => player.clientId === data.ClientId)[0]
    player.setTurn = data.Command
  }

  addPlayer (name, clientId, x = 300, y = 399) {
    this.player = new Mushroom({
      game: this.game,
      x: x,
      y: y,
      asset: 'mushroom',
      name: name,
      clientId: clientId
    })

    this.players.push(this.player)
    this.playersGroup.add(this.player)

    this.game.add.existing(this.player)

    return this.player
  }

  bulletCollision (player, bullet) {
    bullet.kill()
    player.text.kill()
    player.myHealthBar.kill()
    player.kill()
  }
}
