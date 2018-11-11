import Phaser from 'phaser'

class Asteroid extends Phaser.Sprite {
    constructor ({ game, x, y, asset }) {
        super(game, x, y, asset)

        this.anchor.setTo(0.5)
        this.game = game
        this.game.physics.startSystem(Phaser.Physics.ARCADE)
        this.game.physics.enable(this)

        this.body.bounce = {x: 1, y: 1}

        var rand = Math.random() * 10
        var modifier = 1
        if (rand < 5) modifier *= -1

        this.body.velocity.x = 100 * modifier

        var rand = Math.random() * 10
        var modifier = 1
        if (rand < 5) modifier *= -1

        this.body.velocity.y = 100 * modifier
    }

    update() {
        if (this.body.position.y > 799 - this.body.height) {
            this.body.position.y = 0
        }

        else if (this.body.position.x > 1400 - this.body.width) {
            this.body.position.x = 0
        }

        else if(this.body.position.y < 0) {
            this.body.position.y = 799
        }

        else if (this.body.position.x < 0) {
            this.body.position.x = 1400
        }
    }
}

export default Asteroid