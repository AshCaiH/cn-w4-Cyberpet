class Animal {
    constructor (name) {
        this.name = name;
        this.health = 100;
        this.happiness = 100;
        this.fullness = 100;
        this.notThirstiness = 100;
        this.energy = 100;
    }
    play() {
        this.happiness += 10;
        this.energy -= 5;
        this.hunger -= 5;
        this.updateState();
    }
}