class Weapon extends Phaser.Weapon {
    constructor(game, parent){
        super(game, parent)
        //do something
        this.recoil = 0;
    }

};

class Pistol extends Weapon{
    
    constructor(game, parent){
        super(game, parent)
        //Velocity kickback to mave a player
        this.recoil = 300;
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