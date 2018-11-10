class Weapon extends Phaser.Weapon {

    
    constructor(){
        //do something
    }

    get recoil(){
        return this.recoil;
    }
};

class Pistol extends Weapon{
    
    constructor(){
        //Velocity kickback to mave a player
        this.recoil = 25;
    }
}

class MachineGun extends Weapon {
    constructor(){
        this.recoil = 10;
    }
}

class Sniper extends Weapon {
    constructor(){
        this.recoil = 500;
    }
}