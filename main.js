class Animal {
  constructor(name) {
    this.name = name;
    this.health = 100;
    this.happingitess = 100;
    this.fullness = 100;
    this.energy = 100;
  }

  feed() {
    this.hunger += 10;
    this.happiness += 5;
    this.energy -= 5;
    this.updateState();
  }
}
