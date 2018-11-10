import Phaser from 'phaser'
import { Pistol } from '../weapons/Weapon'

let setTurn
window.ws = new WebSocket(`ws://192.168.1.117:8000/ws`)
window.ws.onopen = (evt) => {
  window.ws.onmessage = (evt) => {
    console.log(JSON.parse(evt.data))
    setTurn = JSON.parse(evt.data).Command
  }
}

class Mushroom extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)

    this.anchor.setTo(0.5)
    this.game = game
    this.game.physics.enable(this)
    this.body.angularDrag = 100
    this.body.maxAngular = 1000
    this.body.drag = { x: 150, y: 150 }
    this.body.collideWorldBounds = false
    this.cursors = this.game.input.keyboard.createCursorKeys()
    this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    this.weapon = new Pistol(this.game, this)

    this.size = new Phaser.Rectangle()
    this.game.world.setBounds(0, 0, 1400, 799)
    this.size.setTo(0, 0, 1200, 670)
    this.game.camera.focusOnXY(700, 399)
    this.zoomAmount = 0.003

    this.setTurn = null
  }

  update () {
    this.body.angularAcceleration = 0

    if (this.cursors.up.isDown) {
      this.game.physics.arcade.velocityFromAngle(this.angle, -100, this.body.velocity)
    } else {
      this.body.acceleration.set(0)
    }

    switch (setTurn) {
      case 'LEFT':
        this.body.angularAcceleration = -200
        break
      case 'RIGHT':
        this.body.angularAcceleration = 200
        break
      case 'FIRE':
        this.game.physics.arcade.velocityFromAngle(this.angle, -this.weapon.recoil, this.body.velocity)
        break
      case 'RESET':
        this.body.angularAcceleration = 0
        break
    }

    if (this.cursors.left.isDown) {
      this.body.angularAcceleration = -200
    } else if (this.cursors.right.isDown) {
      this.body.angularAcceleration = 200
    }

    if (this.spaceKey.isDown) {
      this.game.physics.arcade.velocityFromAngle(this.angle, -this.weapon.recoil, this.body.velocity)
    }

    if (this.body.position.y > 670 - this.body.height ||
      this.body.position.x > 1200 - this.body.width ||
      this.body.position.y < 0 ||
      this.body.position.x < 0) {
      if (this.game.camera.scale.x > 0.86) {
        this.game.camera.scale.x -= this.zoomAmount
        this.game.camera.scale.y -= this.zoomAmount
        this.game.camera.bounds.x = this.size.x * -this.game.camera.scale.x
        this.game.camera.bounds.y = this.size.y * -this.game.camera.scale.y
        this.game.camera.bounds.width = this.size.width * -this.game.camera.scale.x
        this.game.camera.bounds.height = this.size.height * -this.game.camera.scale.y
      } else {
        this.kill()
        this.reset(Math.floor(Math.random() * game.world.width), Math.floor(Math.random() * (game.world.height * 0.75)))
      }
    } else {
      if (this.game.camera.scale.x < 1) {
        this.game.camera.scale.x += this.zoomAmount
        this.game.camera.scale.y += this.zoomAmount
        this.game.camera.bounds.x = this.size.x * this.game.camera.scale.x
        this.game.camera.bounds.y = this.size.y * this.game.camera.scale.y
        this.game.camera.bounds.width = this.size.width * this.game.camera.scale.x
        this.game.camera.bounds.height = this.size.height * this.game.camera.scale.y
      }
    }
  }
}

export default Mushroom
