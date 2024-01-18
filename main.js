// Animal Classes

class Animal {
    constructor(name) {
        super(name);
        this.health = 100;
        this.happiness = 100;
        this.energy = 100;
        this.fullness = 100;
        this.thirst = 100;

        this.description = "Whatever it is, it's definitely an animal.";
    }

    feed() {
        this.fullness += 10;
        this.happiness += 5;
        this.energy -= 5;
        this.updateState();
    }
  
    play() {
        this.happiness += 10;
        this.energy -= 5;
        this.fullness -= 5;
        this.updateState();
    }

    sleep () {
        this.energy += 5;
        this.fullness -= 2;
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

let currentAnimal = null;

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

    currentAnimal = createAnimal(name, type);
    if (currentAnimal) {
        document.querySelector(".animal-selection").classList.add("hidden");
        document.querySelector(".status-bars").classList.remove("hidden");
        document.getElementById("animal-name-display").textContent = name;
    }
};

// Initialize Animal

document.getElementById("animal-choice").addEventListener("change", (event) => {
    updateAnimalDisplay(event.target.value);
});

document.getElementById("start-button").addEventListener("click", startGame);

document.addEventListener("DOMContentLoaded", () => {
    updateAnimalDisplay(document.getElementById("animal-choice").value);
});
