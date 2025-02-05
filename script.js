let xp = 0;
let level = 1;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let playerDamage = 2;
let agility = 0;
let fighting;
let monsterhealth;
let inventory;
let amount = 0;
let check = true;

let goldText = document.getElementById("goldText")
let healthText = document.getElementById("healthText")
let xpText = document.getElementById("xpText")
let levelText = document.getElementById("levelText")
const controls = document.getElementById("controls");
const shopButton = document.getElementById("button1");
const dungeonButton = document.getElementById("button2");
const bossButton = document.getElementById("button3");
const levelButton = document.getElementById("button4");
const checkInv = document.getElementById("checkInv");
const text = document.getElementById("text");
const visualBox = document.getElementById("visual");
const visual = document.getElementById("image");
const back = document.getElementById("button7");
const defaultText = "Welcome to Dragon Repeller. You must defeat the dragon that is preventing people from leaving the town. You are in the town square. Where do you want to go? Use the buttons above."
const buy = document.createElement("button")
buy.textContent = "Buy"
let backButton = document.createElement("button");
backButton.innerText = "Back"

const locations = [
    {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in town square",
        source: "./Images/Nerd.png"

    },
    {
        name: "store",
        "button text": ["Health", "Weapon", "Town"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You enter store",
        source: "./Images/square.jpg"

    },
    {
        name: "cave",
        "button text": ["Left corridor", "Right corridor", "Go back to town"],
        "button functions": [gauntlet1, gauntlet2, goTown],
        text: "As you are in the cave, the path diverges. On the left is a wet and soggy corridor, on the right is an ominious corridor reeking of blood and death",
        source: "./Images/square.jpg"
    },
        {
            name: "Left corridor",
            "button text": ["Common Slime", "Fanged Beast", "Go to cave"],
            "button functions": [choice1, choice2, goCave],
            text: "You enter the left corridor",
            source: "./Images/square.jpg"
        },
];

function attack(monster){
    console.log(monster.health);
    monster.health -= playerDamage;
    let attackChance = Math.round(Math.random()*4)+1
    attackChance += agility;
    if (attackChance <= 5) {
        health -= monster.atkPower;
        healthText.textContent = health;
        console.log("You got hit!");
    }
    text.textContent = `You attacked the creature for ${playerDamage} damage, the creatures health is ${monster.health}`
    if (monster.health <= 0) {
        gold += monster.goldReward;
        goldText.textContent = gold;
        xp += monster.xpReward;
        xpText.textContent = xp;
        goTown();
        alert("You Won! You have earned 5 gold and 2 xp")
        monster.health = monster.peakHealth
    }
}

let monsters = [
    {
        name: "slime",
        atkPower: 3,
        health: 10,
        peakHealth: 10,
        goldReward: 5,
        xpReward: 100,
        "button text": ["Attack", "Defend", "Run"],
        "button functions": [() => attack(monsters[0]), defend, run],
        text: "You encounter a slime",
        source: "./Images/hammer.jpg"
    },
    {
        name: "Fanged Beast",
        health: 20,
        peakHealth: 20,
        "button text": ["Attack", "Defend", "Run"],
        "button functions": [attack, defend, run],
        text: "You enter cave",
        source: "./Images/square.jpg"
    },
]



//Initiate buttons 
shopButton.onclick = goStore;
dungeonButton.onclick = goCave;
bossButton.onclick = fightDragon;
levelButton.onclick = levelUp;

//When called, allows a location variable to be set
function update(location) {
    shopButton.textContent = location["button text"][0];
    dungeonButton.textContent = location["button text"][1];
    bossButton.textContent = location["button text"][2];
    text.textContent = location.text;
    visual.src = location.source;

    shopButton.onclick = location["button functions"][0];
    dungeonButton.onclick = location["button functions"][1];
    bossButton.onclick = location["button functions"][2];
}

function goTown(){
    //Sets location to be locations
    update(locations[0])
}

function goStore(){
    update(locations[1])
}

function goCave(){
    update(locations[2])
}

function levelUp() {

    let xpRequired = 10;
    if (xp >= xpRequired) {
        levelText.textContent = level += 1;
    
        health += 10;
        healthText.textContent = health
        playerDamage += 0.5;
        agility += 1.05;
        xpRequired += 10;

    
        xp -= xpRequired;
        xpText.textContent = xp;

    }
}

function buyHealth(){
    if (gold <= 0) {
        text.textContent = "You dont have enough gold"
    }
    else {
        gold -= 10;
        goldText.textContent = gold
        health += 20;
        healthText.textContent = health
    }
}

function buyWeapon(){
}

function gauntlet1(){
    update(locations[3])
}
function gauntlet2(){
}

function choice1(){
    update(monsters[0])
}
function choice2(){
}
function fightThree(){
}
function defend(){

}
function run(){
    let runChance = Math.round(Math.random()*1)+1

    if (runChance === 1) {
        goTown();
    }
}


function fightDragon(){

}