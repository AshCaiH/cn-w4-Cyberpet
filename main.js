// Background Music

const bgMusic = document.getElementById("bgMusic");
bgMusic.loop = true;
let isAudioInitialized = false;

const toggleMusicButton = document.getElementById("toggleMusicButton");

// Toggle Music

const toggleMusic = () => {
  if (!isAudioInitialized) {
    bgMusic.volume = 0.01;
    bgMusic.play();
    isAudioInitialized = true;
  }

  if (bgMusic.volume > 0.01) {
    bgMusic.volume = 0;
    toggleMusicButton.classList.remove("fa-volume-high");
    toggleMusicButton.classList.add("fa-volume-xmark");
  } else {
    bgMusic.volume = 1;
    bgMusic.play();
    toggleMusicButton.classList.remove("fa-volume-xmark");
    toggleMusicButton.classList.add("fa-volume-high");
  }
};

toggleMusicButton.addEventListener("click", toggleMusic);

// Animal Classes

class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Monkey extends Animal {
  constructor(name) {
    super(name);
    this.health = 100;
    this.happiness = 100;
    this.energy = 100;
    this.hunger = 100;
    this.thirst = 100;
  }
}

class Turtle extends Animal {
  constructor(name) {
    super(name);
    this.health = 100;
    this.happiness = 100;
    this.energy = 100;
    this.hunger = 100;
    this.thirst = 100;
  }
}

class Goose extends Animal {
  constructor(name) {
    super(name);
    this.health = 100;
    this.happiness = 100;
    this.energy = 100;
    this.hunger = 100;
    this.thirst = 100;
  }
}

let currentAnimal = null;

// Animal Type

const createAnimal = (name, type) => {
  switch (type) {
    case "monkey":
      return new Monkey(name);
    case "turtle":
      return new Turtle(name);
    case "goose":
      return new Goose(name);
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
