// Animal Classes
let statusBars = document.getElementsByClassName("progress-bar");

let btn1 = document.getElementById("feed-button");
let btn2 = document.getElementById("play-button");
let btn3 = document.getElementById("sleep-button");

class Animal {
    constructor(name) {
        this.statuses = ["idle", "sleeping", "eating", "playing"]

        this.description = "Whatever it is, it's definitely an animal.";

        this.gameOver = false;
        this.score = 0;

        this.maxStat = {
            health: 50,
            happiness: 100,
            energy: 100,
            fullness: 100,
            thirst: 100
        }

        this.stat = {
            health: this.maxStat.health,
            happiness: this.maxStat.happiness,
            energy: this.maxStat.energy,
            fullness: this.maxStat.fullness,
            thirst: this.maxStat.thirst
        }
    }

    changeStat(statName, value) {
        let newValue = this.stat[statName] + value;
        this.stat[statName] = Math.max(0, Math.min(newValue, this.maxStat[statName]));
    }

    feed() {
        if (animal.gameOver) {
            location.reload();
            return;
        }
        this.changeStat("fullness", 10);
        this.changeStat("thirst", 3);
        this.changeStat("happiness", 5);
        this.updateStatusBars();
    }
  
    play() {
        if (animal.gameOver) {
            location.reload();
            return;
        }
        this.changeStat("happiness", 10);
        this.changeStat("fullness", -5);
        this.changeStat("energy", -5);
        this.updateStatusBars();
    }

    sleep () {
        if (animal.gameOver) {
            location.reload();
            return;
        }
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
        this.score += 1;
        this.damageOverTime();
        this.updateStatusBars();

        if (this.stat.health <= 0 ) {

            animal.gameOver = true;
            document.querySelector(".game-over-text").textContent = `After lasting ${animal.score} seconds, your zoo has been closed and your one animal has been taken into protective custody.`
            document.getElementById("game-over").classList.remove("hidden");
            document.querySelector(".status-bars").classList.add("hidden");

        } else setTimeout(this.updateState.bind(this),1000);
    }

    updateStatusBars() {
        for (let bar of statusBars) {
            let value = this.stat[bar.id]; // Get the respective status value.
            let pips = 10; // How many "pips" or "chunks" make up each bar?
            let activePips = Math.ceil(value / this.maxStat[bar.id] * pips); // Convert the status value into a pip count.
            
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

class Goose extends Animal {
    constructor (name) {
        super(name);
        this.description = "This long-necked leaf lover looms loftily."
        this.eats = "Leaves";
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
        case "goose":
            return new Goose(name);
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

