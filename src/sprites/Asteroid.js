import Phaser from 'phaser'

class Asteroid extends Phaser.Sprite {
    constructor ({ game, x, y, asset }) {
        super(game, x, y, asset)

        this.anchor.setTo(0.5)
        this.game = game
    }
}

export default Asteroid