import Phaser from 'phaser'
import { Pistol } from '../weapons/Weapon'

let setTurn, clientName

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
    this.zoomAmount = 0.002

    this.style = { font: '12px Arial', fill: '#ffffff', wordWrap: true, wordWrapWidth: this.body.width, align: 'center' }
    this.text = this.game.add.text(0, 0, clientName, this.style)
    this.text.anchor.set(0.5)
    this.text.x = Math.floor(this.body.x + (this.body.width / 2))
    this.text.y = Math.floor(this.body.y - 8)

    var HealthBar = require('../prefabs/HealthBar.js');
    this.barConfig = {width: 72, height: 6};
    this.myHealthBar = new HealthBar(this.game, this.barConfig);
    this.myHealthBar.setPosition(Math.floor(this.body.x + (this.body.width / 2)), Math.floor(this.body.y))
    this.myHealthBar.setBarColor('#1dd80d')

    this.ws = new WebSocket(`ws://ec2-3-8-101-228.eu-west-2.compute.amazonaws.com:8000/ws`)
    this.ws.onopen = (evt) => {
      this.ws.onmessage = (evt) => {
        let data = JSON.parse(evt.data)
        setTurn = data.Command

        console.log(data)

        if (data.ClientName) {
          this.text.setText(data.ClientName)
        }
      }
    }
  }

  update () {
    this.body.angularAcceleration = 0

    if (this.cursors.up.isDown) {
      this.game.physics.arcade.velocityFromAngle(this.angle, -100, this.body.velocity)
    } else {
      this.body.acceleration.set(0)
    }

    switch (setTurn) {
      case 'LEFT_START':
        this.body.angularAcceleration = -200
        break
      case 'RIGHT_START':
        this.body.angularAcceleration = 200
        break
      case 'RESET':
        this.body.angularAcceleration = 0
        break
      case 'FIRE':
        this.game.physics.arcade.velocityFromAngle(this.angle, -this.weapon.recoil, this.body.velocity)
        setTurn = 'FIRE_STOP'
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

    this.text.x = Math.floor(this.body.x + (this.body.width / 2))
    this.text.y = Math.floor(this.body.y - 8)

    this.myHealthBar.setPosition(Math.floor(this.body.x + (this.body.width / 2)), Math.floor(this.body.y))
  }
}

export default Mushroom
