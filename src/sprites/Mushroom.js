import Phaser from 'phaser'
import {Pistol} from '../weapons/Weapon'
import { PluginManager } from 'phaser-ce';

class Mushroom extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)

    this.anchor.setTo(0.5)
    this.game = game
    this.game.physics.enable(this)
    this.body.angularDrag = 100
    this.body.maxAngular = 1000
    this.body.drag = { x: 150, y: 150 }
    this.body.collideWorldBounds = true
    this.body.bounce.setTo(1, 1)
    this.cursors = this.game.input.keyboard.createCursorKeys()
    this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    // this.pistol = new Pistol(this.game, new PluginManager());
    // this.weapon = this.game.add.existing(this.pistol);
    console.log(this.weapon = this.game.add.weapon(100,'bullet'));
    this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.weapon.trackSprite(this, 14,0);
    this.weapon.trackRotation = true;
    
    // this.weapon = this.game.add.weapon(10,'bullet');
    // this.weapon.fireFrom.set(10,5);
    }

  update () {
    console.log(this.rotation)
    console.log(this.angle)
    this.body.angularAcceleration = 0

    if (this.cursors.up.isDown) {
      this.game.physics.arcade.velocityFromAngle(this.angle, -100, this.body.velocity);
    } else {
      this.body.acceleration.set(0)
    }

    if (this.cursors.left.isDown) {
      this.body.angularAcceleration = -200
    } else if (this.cursors.right.isDown) {
      this.body.angularAcceleration = 200
    }

    if (this.spaceKey.isDown){
      this.game.physics.arcade.velocityFromAngle(this.angle, -100, this.body.velocity);
      this.weapon.fire()
    }

  }
}

export default Mushroom
