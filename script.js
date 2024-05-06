// Part 1
const adventurer = {
    name: "Robin",
    health: 10,
    inventory: ["sword", "potion", "artifact"],
    companion: {
        name: "Leo",
        type: "Cat",
        companion2: {
            name: "Frank",
            type: "Flea",
            inventory: ["small hat:", "sunglasses"],
        },
    },
    roll(mod = 0) {
        const result = Math.floor(Math.random() * 20) + 1 + mod;
        console.log(`${this.name} rolled a ${result}.`);
    },
}

adventurer.inventory.forEach((item) => {
    console.log(item);
});

// adventurer.roll();


class Character {
    constructor(name) {
        this.name = name;
        this.health = 100;
        this.inventory = [];
        this.MAX_HEALTH = 100;
    }
    roll(mod = 0) {
        const result = Math.floor(Math.random() * 20) + 1 + mod;
        // console.log(`${this.name} rolled a ${result}.`); // commented out for clearer console
        return result;
    }
}

const robin = new Character("Robin");
robin.inventory = ["sword", "potion", "artifact"];
robin.companion = new Character("Leo");
robin.companion.type = "Cat";
robin.companion.companion = new Character("Frank");
robin.companion.companion.type = "Flea";
robin.companion.companion.inventory = ["small hat", "sunglasses"];

class Adventurer extends Character {
    constructor(name, role, armor) {
        super(name);
        // Adventurers have specialized roles.
        this.role = role;
        this.armor = armor;
        // Every adventurer starts with a bed and 50 gold coins.
        this.inventory.push("bedroll", "50 gold coins");
        this.ROLES = ["Fighter", "Healer", "Wizard"];

    }
    check() {
        if (this.role.toLowerCase() === this.ROLES[0].toLowerCase() ||
            this.role.toLowerCase() === this.ROLES[1].toLowerCase() ||
            this.role.toLowerCase() === this.ROLES[2].toLowerCase()) {
            console.log("given role matches one of these values");
        } else {
            console.log("given role does not match one of these values");
        }
    }
    // Adventurers have the ability to scout ahead of them.
    scout() {
        console.log(`${this.name} is scouting ahead...`);
        super.roll();
    }
    duel(adventurer) {

        for (let i = 0; adventurer.health > 50 && this.health > 50; i++) {
            this.result = this.roll();
            adventurer.result = adventurer.roll();
            if (adventurer.result > this.result) {
                this.health -= 1;

            } else if (this.result > adventurer.result) {
                adventurer.health -= 1;
            }
        }
        if(this.health > adventurer.health) {
            console.log(this.name, "won")
        } else if (adventurer.health > this.health) {
            console.log(adventurer.name, "won")
        }
        return (console.log(this.name, this.health, adventurer.name, adventurer.health));

    }
}

class Companion extends Character {
    constructor(name, type, adventurer) {
        super(name);
        this.name = name;
        this.type = type;
        this.adventurer = adventurer;
    }
    find() {
        console.log(`${this.name} is going out to find (item)...`);
        super.roll();
    }
}

const robin2 = new Adventurer("robin", "fighter", "Gold plated");
robin2.companions = [];
robin2.companions.companion1 = new Companion("Leo", "Cat", "robin");
robin2.companions.companion2 = new Companion("Frank", "Flea", "robin");
robin2.scout();
console.log(robin2);
robin2.check();


class AdventurerFactory {
    constructor(role) {
        this.role = role;
        this.adventurers = [];
    }
    generate(name) {
        const newAdventurer = new Adventurer(name, this.role);
        this.adventurers.push(newAdventurer);
    }
    findByIndex(index) {
        return this.adventurers[index];
    }
    findByName(name) {
        return this.adventurers.find((a) => a.name === name);
    }
}

const fighters = new AdventurerFactory("fighter");
const robin3 = fighters.generate("Robin");
const bob = fighters.generate("Bob");

const robinObj = fighters.findByName("Robin");
const bobObj = fighters.findByName("Bob");

bobObj.duel(robinObj);






