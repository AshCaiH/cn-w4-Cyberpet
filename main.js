// Animal Classes
let statusBars = document.getElementsByClassName("progress-bar");

let btn1 = document.getElementById("feed-button");
let btn2 = document.getElementById("play-button");
let btn3 = document.getElementById("sleep-button");

class Animal {
    constructor(name) {
        this.statuses = ["idle", "sleeping", "eating", "playing"]

        this.description = "Whatever it is, it's definitely an animal.";

        this.maxStat = {
            health: 100,
            happiness: 100,
            energy: 100,
            fullness: 100,
            thirst: 100
        }

        this.stat = {
            health: this.maxStat.health,
            happiness: this.maxStat.health,
            energy: this.maxStat.health,
            fullness: this.maxStat.health,
            thirst: this.maxStat.health
        }
    }

    changeStat(statName, value) {
        let newValue = this.stat[statName] + value;
        this.stat[statName] = Math.max(0, Math.min(newValue, this.maxStat[statName]));
        console.log(this.stat);
    }

    feed() {
        this.changeStat("fullness", 10);
        this.changeStat("thirst", 3);
        this.changeStat("happiness", 5);
        this.updateStatusBars();
    }
  
    play() {
        this.changeStat("happiness", 10);
        this.changeStat("fullness", -5);
        this.changeStat("energy", -5);
        this.updateStatusBars();
    }

    sleep () {
        this.changeStat("energy", 15);
        this.changeStat("fullness", -5);
        this.updateStatusBars();
    }

    damageOverTime() {
        let stats = ["happiness", "energy", "fullness", "thirst"];

        for (let stat of stats) {
            if (this.stat[stat] <= 0) {
                this.stat[stat] = 0;
                this.changeStat("health", -2);
            } else {
                this.stat[stat] -= 5;
            }
        }        
    }

    updateState() {
        this.damageOverTime();
        this.updateStatusBars();
        setTimeout(this.updateState.bind(this),1000);
    }

    updateStatusBars() {
        for (let bar of statusBars) {
            let value = this.stat[bar.id]; // Get the respective status value.
            let pips = 10; // How many "pips" or "chunks" make up each bar?
            let activePips = Math.ceil(value / 100 * pips); // Convert the status value into a pip count.
            
            let maxWidth = bar.style.maxWidth; // TODO: Replace this with numbers sourced from DOM.
            bar.style.width = Math.ceil(75 / pips * activePips) + "px"; // Status bar matches respective value, snapping to pips.
        }
    }
}

class Cat extends Animal {
    constructor(name) {
        super(name);
    }
}

class Giraffe extends Animal {
    constructor (name) {
        super(name);
        this.description = "This long-necked leaf lover looms loftily."
        this.eats = "Leaves";
    }
}

class Dog extends Animal {
    constructor(name) {
        super(name);
    }
}

class Turtle extends Animal {
    constructor(name) {
        super(name);
    }
}

let animal = null;

// Animal Type

const createAnimal = (name, type) => {
    switch (type) {
        case "cat":
            return new Cat(name);
        case "dog":
            return new Dog(name);
        case "turtle":
            return new Turtle(name);
    }
};

// Update Display

const updateAnimalDisplay = (animalType) => {
    const tamagotchiImage = document.getElementById("tamagotchi-character");
    tamagotchiImage.src = `imgs/${animalType}.gif`;
    tamagotchiImage.alt = `${animalType}`;
};

// Start Game

const startGame = () => {
    const animalNameInput = document.getElementById("animal-name");
    const animalChoice = document.getElementById("animal-choice");
    const name = animalNameInput.value.trim();
    const type = animalChoice.value;

    // Name Alert
    if (!name) {
        alert("Please enter a name for your animal.");
        return;
    }

    animal = createAnimal(name, type);
    if (animal) {
        document.querySelector(".animal-selection").classList.add("hidden");
        document.querySelector(".status-bars").classList.remove("hidden");
        document.getElementById("animal-name-display").textContent = name;
    }

    animal.updateState();


    btn1.addEventListener("click", animal.feed.bind(animal));
    btn2.addEventListener("click", animal.play.bind(animal));
    btn3.addEventListener("click", animal.sleep.bind(animal));
};

// Initialize Animal

document.getElementById("animal-choice").addEventListener("change", (event) => {
    updateAnimalDisplay(event.target.value);
});

document.getElementById("start-button").addEventListener("click", startGame);

document.addEventListener("DOMContentLoaded", () => {
    updateAnimalDisplay(document.getElementById("animal-choice").value);
});

// Replace this with non-hardcoded values later