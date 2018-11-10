import Phaser from 'phaser'

class Weapon extends Phaser.Weapon {
    constructor(game, parent){
        super(game, parent)
        this.recoil = 0;
        this.fireRate = 0;
        this.bulletSpeed = 0;

        this.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    }
};

class Pistol extends Weapon{
    constructor(game, parent){
        super(game, parent)
        //Velocity kickback to mave a player
        this.recoil = 300;
        this.bulletSpeed = 100;
        this.fireRate = 20;
        this.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    }
}

class MachineGun extends Weapon {
    constructor(game, parent){
        super(game, parent)
        this.recoil = 10;
    }   
}

class Sniper extends Weapon {
    constructor(game, parent){
        super(game, parent)
        this.recoil = 100;
    }
}


export {Weapon, Pistol}