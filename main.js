class Animal {
    constructor (name) {
        this.name = name;
        this.health = 100;
        this.happiness = 100;
        this.fullness = 100;
        this.notThirstiness = 100;
        this.energy = 100;
        this.description = "Whatever it is, it's definitely an animal.";
    }
}

class Giraffe extends Animal {
    constructor (name) {
        super(name);
        this.description = "This long-necked leaf lover looms loftily."
    }
}
