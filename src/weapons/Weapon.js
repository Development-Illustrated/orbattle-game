class Weapon {

    
    constructor(){
        //do something
    }

    fireWeapon() {
        if (this.ammunition > 0){
            this.ammunition -= 1;
        }
        return this.ammunition 
    }

    get recoil(){
        return this.recoil;
    }
};

class Pistol extends Weapon{
    
    constructor(){
        //Velocity kickback to mave a player
        this.recoil = 25;
        //Number of times a gun can be shot
        this.ammunition = 10;
        //Damage done on bullet impact (may need to be a part of 'bullet' object)
        this.damage = 5;
        //Delay on when the gun can be fired again
        this.rateOfFire = 2;
    }
}

class MachineGun extends Weapon {
    constructor(){
        this.recoil = 10;
        this.ammunition = 30;
        this.damage = 2;
        this.rateOfFire = 10;
    }
}