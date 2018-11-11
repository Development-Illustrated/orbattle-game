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
      this.ws.onmessage = (evt) => {
        let data = JSON.parse(evt.data)
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

    this.addPlayer('Sam', '123')
    let dumbPlayer = this.addPlayer('Dummy', '321')
    dumbPlayer.controls = false
    // Add room code
  }

  update () {
    // this.players.forEach(this.checkCollision)
    // console.log(this.playersGroup)
    // console.log(this.game)

    for (var i = 0; i<this.players.length;i++){
      // bullets.push(this.players[i].weapon.bullets)
      // this.bulletGroups.add(this.players[i].weapon.bullets)
      var thisGroup = this.game.add.group(this.players[i].weapon.bullets)
      this.game.physics.arcade.overlap(this.playersGroup, thisGroup, this.bulletCollision)
    }
    // console.log(bullets)
    // for (var i=0;i<bullets.length;i++){
    //   this.game.physics.arcade.overlap(this.playersGroup, this.bulletGroups, this.bulletCollision)
    // }
    

    // this.game.physics.arcade.overlap(this.playersGroup, this.bulletGroups, this.bulletCollision)
    // this.game.physics.arcade.overlap(this.playersGroup, this.players.forEach(function(player){return player.weapon.bullets}), this.bulletCollision)

  }
  

  render () {
    // this.game.debug.text(this.game.time.fps || '--', 2, 14, '#00ff00')
  }

  relayCommand (data) {
    let player = this.players.filter(player => player.clientId === data.ClientId)[0]
    player.setTurn = data.Command
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

    this.players.push(this.mushroom)
    this.playersGroup.add(this.mushroom)
    this.game.add.existing(this.mushroom)
    console.log(this.mushroom.weapon.bulletManager)
    console.log(this.mushroom)

    return this.mushroom
  }

  checkCollision (playerObject) {
    // console.log(playerObject)
    this.game.physics.arcade.collide(playerObject,playerObject.weapon.bullets, this.bulletCollision)
  }

  bulletCollision (playerObject, bullet) {
    //reduce health please
    console.log("Bullets")
    if(playerObject.weapon != bullet.data.bulletManager){
      // this.playerObject.takeDamage(25)
      bullet.kill()
    }
  }
  
  
}
