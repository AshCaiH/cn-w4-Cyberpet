let statusBars = [
    {
        value: "health"
    },
    {
        value: "happiness"
    },
    {
        value: "fullness"
    },
    {
        value: "energy"
    },
] //document.getElementsByClassName("statusBar");

class Animal {
    constructor (name) {
        this.statuses = ["idle", "sleeping", "eating", "playing"]

        this.name = name;
        this.health = 100;
        this.happiness = 100;
        this.fullness = 100;
        this.energy = 100;
        this.description = "Whatever it is, it's definitely an animal.";
    }

    feed() {
        this.hunger += 10;
        this.happiness += 5;
        this.energy -= 5;
        this.updateState();
    }
  
    play() {
        this.happiness += 10;
        this.energy -= 5;
        this.hunger -= 5;
        this.updateState();
    }

    sleep () {
        this.energy += 5;
        this.fullness -= 2;
    }

    
    healthDown() {
        this.health -= 3;
    }

    updateState() {
        this.healthDown();
        this.updateStatusBars();
        setTimeout(this.updateState.bind(this),1000);
    }

    updateStatusBars() {
        for (let bar of statusBars) {
            let value = this[bar.value]; // Get the respective status value.
            let pips = 10; // How many "pips" or "chunks" make up each bar?
            let activePips = Math.ceil(value / 100 * pips); // Convert the status value into a pip count.
            
            let maxWidth = 50; // TODO: Replace this with numbers sourced from DOM.
            let newWidth = maxWidth / pips * activePips; // Status bar matches respective value, snapping to pips.

            console.log(newWidth);
        }
    }
}

class Giraffe extends Animal {
    constructor (name) {
        super(name);
        this.description = "This long-necked leaf lover looms loftily."
        this.eats = "Leaves";
    }
}


// Replace this with non-hardcoded values later
const animal = new Animal("Gerry")

animal.updateState();