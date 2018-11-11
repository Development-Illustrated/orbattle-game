import Phaser from 'phaser'
import { PluginManager } from 'phaser-ce';
import { Pistol } from '../weapons/Weapon'

let clientName

class Mushroom extends Phaser.Sprite {
  constructor ({ game, x, y, asset, name, clientId }) {
    super(game, x, y, asset)

    clientName = name
    this.clientName = name
    this.clientId = clientId
    this.setTurn = ''

    this.anchor.setTo(0.5)
    this.game = game
    
    this.game.physics.enable(this)
    this.body.gravity.y = 310
    this.body.angularDrag = 100
    this.body.maxAngular = 1000
    this.body.drag = { x: 250, y: 250 }
    this.body.collideWorldBounds = false
    this.cursors = this.game.input.keyboard.createCursorKeys()
    this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    // this.pistol = new Pistol(this.game, new PluginManager());
    // this.weapon = this.game.add.existing(this.pistol);
    console.log(this.weapon = this.game.add.weapon(1000,'bullet'))
    this.weapon.fireRate = 100
    this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS
    this.weapon.trackSprite(this, 14,0)
    this.weapon.trackRotation = true


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
    this.healthValue = 100
  }

  update () {
    this.body.angularAcceleration = 0

    if (this.cursors.up.isDown) {
      this.game.physics.arcade.velocityFromAngle(this.angle, -100, this.body.velocity)
    } else {
      this.body.acceleration.set(0)
    }

    switch (this.setTurn) {
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
       
        if ( this.weapon.fire()){
          this.game.physics.arcade.velocityFromAngle(this.angle, -100, this.body.velocity)
          // this.game.physics.arcade.velocityFromAngle(this.angle, -this.weapon.recoil, this.body.velocity)
        }
        setTurn = 'FIRE_STOP'
        break
    }

    if (this.cursors.left.isDown) {
      this.body.angularAcceleration = -200
    } else if (this.cursors.right.isDown) {
      this.body.angularAcceleration = 200
    }

    if (this.spaceKey.isDown) {
      // this.game.physics.arcade.velocityFromAngle(this.angle, -this.weapon.recoil, this.body.velocity)
      if ( this.weapon.fire()){
        this.game.physics.arcade.velocityFromAngle(this.angle, -500, this.body.velocity)
      }
      
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

  takeDamage(damage){
    this.healthValue = this.healthValue - damage;
    if(this.healthValue < 0) this.healthValue = 0;
    this.myHealthBar.setPercent(this.healthValue);
  }
}

export default Mushroom
