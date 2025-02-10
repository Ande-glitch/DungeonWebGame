let xp = 0;
let xpRequired = 10;
let level = 0;
let statPoints = 0;
let health = 100;
let gold = 10000;
let playerDamage;
let st = 3;
let def = 3;
let agility = 5;
let int = 1;
let intDecimal = (int+100)/100;
let critRate = 20;
let critATK = 100;
let intCritRate = critRate * intDecimal;
let intCritATK = critATK * intDecimal;
let baseATKChance = 100;
let aquiredWeapons = 0;
let aquiredItems = 0;
let ownedSword = false;
let ownedStaff = false;
let ownedBow = false;
let ownedShield = false;
let achievedCrit = false;
let dragonSlayed = false;

let goldText = document.getElementById("goldText")
let healthText = document.getElementById("healthText")
let xpText = document.getElementById("xpText")
let levelText = document.getElementById("levelText")
const playerStats = document.getElementById("playerStats")
const statDisplay = document.getElementById("statDisplay")
const displayStatsButton = document.getElementById("displayStatsbutton")
const controls = document.getElementById("controls");
const mainButtons = document.getElementById("mainButtons");
const shopButton = document.getElementById("button1");
const dungeonButton = document.getElementById("button2");
const bossButton = document.getElementById("button3");
const levelButton = document.getElementById("button4");
const inventoryButton = document.getElementById("button5")
const checkInv = document.getElementById("checkInv");
const text = document.getElementById("text");
const visualBox = document.getElementById("visual");
const visual = document.getElementById("image");
const back = document.getElementById("button7");
const defaultText = "Welcome to Dragon Repeller. You must defeat the dragon that is preventing people from leaving the town. You are in the town square. Where do you want to go? Use the buttons above."
const monsterStats = document.getElementById("monsterStats")
let monsterName = document.getElementById("monsterName")
let monsterHealth = document.getElementById("monsterHealth")
let monsterATK = document.getElementById("monsterATK")
let monsterDEF = document.getElementById("monsterDEF")
let monsterAG = document.getElementById("monsterAG")

//Games locations
const locations = [
    {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in town square",
        source: "./Images/townsquare.jpg"

    },
    {
        name: "store",
        "button text": ["Health", "Weapon", "Town"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You enter store",
        source: "./Images/shopkeep.jpg"

    },
    {
        name: "cave",
        "button text": ["Right corridor", "Deeper in the dungeon", "Go back to town"],
        "button functions": [gauntlet1, gauntlet2, goTown],
        text: "As you are in the cave, the path diverges. On the left is a wet and soggy corridor, on the right is an ominious corridor reeking of blood and death",
        source: "./Images/entrance.jpg"
    },
        {
            name: "Right corridor",
            "button text": ["Common Slime", "Fanged Beast", "Go to cave"],
            "button functions": [choice1, choice2, goCave],
            text: "You enter the right corridor",
            source: "./Images/left.jpg"
        },
        {
            name: "Deeper within",
            "button text": ["Rock Golem", "Magus", "Go to cave"],
            "button functions": [choice3, choice4, goCave],
            text: "You enter deeper in the dungeon",
            source: "./Images/right.jpg"
        },
];

const subLocations = [
    {
        name: "Weapon store",
        "button text": ["Sword", "Staff", "Go back"],
        "button functions": [buySword, buyStaff, goStore],
        text: "What would you like to buy?",
        source: "./Images/weapon.jpg"

    },
    {
        name: "Inventory",
        "button text": ["Display weapons", "Display items", "Display key items"],
        "button functions": [displayWeapons, displayItems, displayKey],
        text: "Where would you like to check",
        source: "./Images/inventory.jpg"

    },

]

const inventoryDisplay = [
    {
        name: "Inventory",
        "button text": ["Sword", "Staff", "Bow"],
        "button functions": [sword, staff, bow],
        text: "Weapon info",
        source: "./Images/invdis.jpg"
    }
]

function attack(monster){
    achievedCrit = false;
    let achivedSparks = false;

    monsterHealth.textContent = Math.round(monster.health)
    monsterName.textContent = monster.name
    monsterDEF.textContent = monster.def
    monsterATK.textContent = monster.peakATKPower
    monsterAG.textContent = monster.agility

    //Player damage formula
    playerDamage = Math.round(Math.random()*st)+1;

    let sparks = Math.pow(playerDamage, 2.5)
    console.log(`Intial damage ${playerDamage} before crit`);
    let critATKDecimal = (intCritATK+100)/100
    console.log(critRate);
    let critRoll = Math.round(Math.random()*100)
    let sparksRoll = Math.round(Math.random()*100000)
    if (critRate > sparksRoll) {
        playerDamage *= sparks;
        achivedSparks = true;
    }
    if (intCritRate > critRoll && achivedSparks == false) {
        playerDamage *= critATKDecimal;
        achievedCrit = true;
    }

    //Monster damage formula
    monster.atkPower = Math.round(Math.random()*monster.peakATKPower)+1;

    //Monster ATK chance formula
    let monsterATKChance = Math.round(Math.random()*monster.baseATKChance) + monster.agility//Highest number for slime is 20
    //Player ATK Chance formula
    let playerATKChance = Math.round(Math.random()* baseATKChance)+ agility//Highest number for player is 100

    //Display attack rolls
    console.log(`You rolled ${playerATKChance}`);
    console.log(`Enemy rolled ${monsterATKChance}`);

    let monsterDecimalDEF = (monster.def+100)/100
    let playerDecimalDEF = (def+100)/100;

    playerDamage = playerDamage / monsterDecimalDEF
    monster.atkPower = monster.atkPower / playerDecimalDEF

    //IF player ATK Chance is greater than monster: monster gets hit
    if (playerATKChance > monsterATKChance) {
        monster.health -= playerDamage;
        monsterHealth.textContent = Math.round(monster.health);
    }

    //If monster ATK Chance is greater than player: Player gets hit
    if (playerATKChance < monsterATKChance) {
        monster.health -= playerDamage;
        health -= monster.atkPower;
        healthText.textContent = Math.round(health);
        monsterHealth.textContent = Math.round(monster.health);
        console.log("You got hit!");
    } 
    //Rare monster escape
    if (monster.class === "rare") {
        let enemyEscape = Math.round(Math.random()*100)+monster.agility
        if (enemyEscape >= 100) {
            enemyEscaped();
            monster.health = monster.peakHealth
        }
    }
    //Death
    if (health <= 0) {
        alert("You are dead...")
        location.reload();
    }
    //General battle info
    if (playerATKChance > monsterATKChance) {
        text.textContent = `You attacked the creature for ${playerDamage.toFixed(2)} damage, your damage was negated by ${monster.def}%, and you evaded the creature's attack!`;
    }
    if (playerATKChance < monsterATKChance) {
        text.textContent = `You attacked the creature for ${playerDamage.toFixed(2)} damage, your damage was negated by ${monster.def}%, the creature hit you for ${(monster.atkPower).toFixed(2)}`;
    }
    if (achievedCrit == true && playerATKChance > monsterATKChance) {
        text.textContent = `CRIT! You attacked the creature for ${Math.round(playerDamage)} damage (${critATKDecimal.toFixed(2)}x Damage), your damage was negated by ${monster.def}%, and you evaded the creature's attack`;  
    } 
    else if (achievedCrit == true && playerATKChance < monsterATKChance) {
        text.textContent = `CRIT! You attacked the creature for ${Math.round(playerDamage)} damage (${critATKDecimal.toFixed(2)}x Damage), your damage was negated by ${monster.def}%, the creature hit you for ${(monster.atkPower).toFixed(2)}`; 
    }
    if (achivedSparks == true) {
        text.textContent = `ULTRA CRIT! You attacked the creature for ${Math.round(playerDamage)} damage (${sparks.toFixed(2)}x Damage), your damage was negated by ${monster.def}%, the creature hit you for ${(monster.atkPower).toFixed(2)}`;  
    }
    //Monster defeat
    if (monster.health <= 0 && monster.class != "calamity") {
        gold += monster.goldReward;
        goldText.textContent = gold;
        xp += monster.xpReward;
        xpText.textContent = `${xp}/${xpRequired}`;
        goTown();
        alert(`You won! You have earned ${monster.goldReward} gold and ${monster.xpReward} xp!`)
        //Refresh monster health
        monster.health = monster.peakHealth
    }
    else if (monster.health <= 0 && monster.class == "calamity") {
        gold += monster.goldReward;
        goldText.textContent = gold;
        xp += monster.xpReward;
        xpText.textContent = xp;
        alert(`You have slayed the dragon spreading destruction and chaos around the village, your efforts haven't gone unrewarded, with newfound strength and courage, your reputation has soared across the lands. You are now renowned and gifted with the title "Hero" Your journey is now yours to choose.`)
        goTown();
        monster.health = monster.peakHealth
        dragonSlayed = true;
    }
}

function defend(monster){

    monsterHealth.textContent = Math.round(monster.health)
    monsterName.textContent = monster.name
    monsterDEF.textContent = monster.def
    monsterATK.textContent = monster.peakATKPower
    monsterAG.textContent = monster.agility

    //Monster damage formula
    let originalMonsterATK = monster.atkPower = Math.round(Math.random()*monster.peakATKPower)+1;

    //Monster ATK chance formula
    let monsterATKChance = Math.round(Math.random()*monster.baseATKChance) + monster.agility//Highest number for slime is 20
    //Player ATK Chance formula
    let playerDEFChance = Math.round(Math.random()* baseATKChance) + def + agility//Highest number for player is 100

    //Display attack rolls
    console.log(`You rolled ${playerDEFChance}`);
    console.log(`Enemy rolled ${monsterATKChance}`);

    let playerDecimalDEF = (def+100)/100;
    monster.atkPower = monster.atkPower / playerDecimalDEF
    console.log(monster.atkPower);

    //IF player ATK Chance is greater than monster: monster gets hit
    if (playerDEFChance > monsterATKChance) {
        monsterHealth.textContent = Math.round(monster.health);
        text.textContent = `The enemy hit you for ${(monster.atkPower).toFixed(2)}, but you blocked it COMPLETELY`
    }

    //If monster ATK Chance is greater than player: Player gets hit
    if (playerDEFChance < monsterATKChance) {
        health -= monster.atkPower;
        healthText.textContent = Math.round(health);
        monsterHealth.textContent = Math.round(monster.health);
        console.log("You got hit!");
        text.textContent = `The enemy hit you for ${(originalMonsterATK).toFixed(2)}, but you blocked it by ${def}%`
    } 
    //Death
    if (health <= 0) {
        alert("You are dead...")
        location.reload();
    }
}

//Monster information
let monsters = [
    {
        name: "slime",
        class: "common",
        atkPower: 3,
        peakATKPower: 3,
        def: 0,
        health: 10,
        peakHealth: 10,
        goldReward: 8,
        xpReward: 20,
        baseATKChance: 66,
        agility: 20,
        "button text": ["Attack", "Defend", "Run"],
        "button functions": [() => attack(monsters[0]), () => defend(monsters[0]), run],
        text: "You encounter a slime",
        source: "./Images/slime.jpg"
    },
    {
        name: "Treasure slime",
        class: "rare",
        atkPower: 2,
        peakATKPower: 2,
        def: 66,
        health: 100,
        peakHealth: 100,
        goldReward: 3333,
        xpReward: 333,
        baseATKChance: 100,
        agility: 10,
        "button text": ["Attack", "Defend", "Run"],
        "button functions": [() => attack(monsters[1]), () => defend(monsters[1]), run],
        text: "You encounter a TREASURE slime",
        source: "./Images/treasureslime.jpg"
    },
    {
        name: "Fanged Beast",
        class: "common",
        atkPower: 7,
        peakATKPower: 7,
        def: 25,
        health: 25,
        peakHealth: 25,
        goldReward: 25,
        xpReward: 150,
        baseATKChance: 75,
        agility: 80,
        "button text": ["Attack", "Defend", "Run"],
        "button functions": [() => attack(monsters[2]), () => defend(monsters[2]), run],
        text: "You encounter a fanged beast",
        source: "./Images/fanged.jpg"
    },
    {
        name: "Golem",
        class: "common",
        atkPower: 20,
        peakATKPower: 20,
        def: 200,
        health: 50,
        peakHealth: 50,
        goldReward: 125,
        xpReward: 1500,
        baseATKChance: 90,
        agility: 10,
        "button text": ["Attack", "Defend", "Run"],
        "button functions": [() => attack(monsters[3]), () => defend(monsters[3]), run],
        text: "A massive sentient rock controlled by ominous magic stands before you",
        source: "./Images/golem.jpg"
    },
    {
        name: "Magus",
        class: "common",
        atkPower: 150,
        peakATKPower: 150,
        def: 10,
        health: 250,
        peakHealth: 250,
        goldReward: 1000,
        xpReward: 3000,
        baseATKChance: 10,
        agility: 10,
        "button text": ["Attack", "Defend", "Run"],
        "button functions": [() => attack(monsters[4]), () => defend(monsters[4]), run],
        text: "A malevolent spellcaster stands in the darkness, any encounter will be hostile",
        source: "./Images/magus.jpg"
    },
    {
        name: "Dragon",
        class: "calamity",
        atkPower: 80,
        peakATKPower: 80,
        def: 80,
        health: 1000,
        peakHealth: 1000,
        goldReward: 100000,
        xpReward: 500000,
        baseATKChance: 90,
        agility: 75,
        "button text": ["Attack", "Defend", "Run"],
        "button functions": [() => attack(monsters[5]), () => defend(monsters[5]), run],
        text: "The calamity stands before you",
        source: "./Images/dragon.jpg"
    },
    {
        name: "Ruination",
        class: "destroyer",
        atkPower: 8000,
        peakATKPower: 8000,
        def: 800,
        health: 10000,
        peakHealth: 10000,
        goldReward: 100000,
        xpReward: 500000,
        baseATKChance: 90,
        agility: 100,
        "button text": ["Attack", "Defend", "Run"],
        "button functions": [() => attack(monsters[6]), () => defend(monsters[6]), run],
        text: "A destroyer of many worlds stands before you",
        source: "./Images/destroyer.jpg"
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

let displayHealth = document.getElementById("displayHealth");
let displayStatPoints = document.getElementById("displayStatPoints");
let displayST = document.getElementById("displayST");
let displayDEF = document.getElementById("displayDEF");
let displayAG = document.getElementById("displayAG");
let displayINT = document.getElementById("displayINT");
let displayCritR = document.getElementById("displayCritR");
let displayCritATK = document.getElementById("displayCritATK");

let STPlus = document.getElementById("STPlus");
let DEFPlus = document.getElementById("DEFPlus");
let AGPlus = document.getElementById("AGPlus");
let INTPlus = document.getElementById("INTPlus");

document.getElementById("displayStatsButton").addEventListener("click", function statusUpdate(){
    let pElements = document.querySelectorAll("#statDisplay p");
    let buttonElements = document.querySelectorAll(".incrementer")

    let intDecimal = (int + 100) / 100;
    let critRate = 20; // Or whatever base crit rate you have
    let critATK = 100; // Or your base crit ATK value
    let intCritRate = critRate * intDecimal;
    let intCritATK = critATK * intDecimal;

    displayHealth.textContent = `Health : ${Math.round(health)}`;
    displayStatPoints.textContent = `Available stat points : ${statPoints}`
    displayST.textContent = `ST : ${st}`;
    displayDEF.textContent = `DEF : ${def}`;
    displayAG.textContent = `AG : ${agility}`;
    displayINT.textContent = `INT : ${int}`
    displayCritR.textContent = `Crit Rate : ${(intCritRate).toFixed(2)}%`
    displayCritATK.textContent = `Crit ATK : ${intCritATK}%`
    pElements.forEach(p => {
        p.style.display = "flex"
    })
    buttonElements.forEach(button => {
        button.style.display = "flex"
    })
})

document.getElementById("displayStatsButton").addEventListener("dblclick", function(){
    let pElements = document.querySelectorAll("#statDisplay p");
    let buttonElements = document.querySelectorAll(".incrementer")

    pElements.forEach(p => {
        p.style.display = "none"
    })
    buttonElements.forEach(button => {
        button.style.display = "none"
    })
})

STPlus.addEventListener("click", function(){
    if (statPoints >= 1) {
        statPoints--;
        displayStatPoints.textContent = `Available statpoints : ${statPoints}`;
        st++;
        displayST.textContent = `ST : ${st}`;
    }
})
DEFPlus.addEventListener("click", function(){
    if (statPoints >= 1) {
        statPoints--;
        displayStatPoints.textContent = `Available statpoints : ${statPoints}`;
        def++;
        displayDEF.textContent = `DEF : ${def}`;
    }
})
AGPlus.addEventListener("click", function(){
    if (statPoints >= 1) {
        statPoints--;
        displayStatPoints.textContent = `Available statpoints : ${statPoints}`;
        agility++;
        displayAG.textContent = `AG : ${agility}`;
    }
})
INTPlus.addEventListener("click", function(){
    if (statPoints >= 1) {
        statPoints--;
        displayStatPoints.textContent = `Available statpoints : ${statPoints}`;
        int++;
        displayINT.textContent = `INT : ${int}`
    }
})



function goTown(){
    //Sets location to be locations
    update(locations[0])
    monsterStats.style.display = "none"
    monsterName.style.display = "none"
    monsterHealth.style.display = "none"
    return check = locations[0]
}

function goStore(){
    levelButton.style.display = "inline"
    inventoryButton.style.display = "inline"
    update(locations[1])
    return check = locations[1]
}

function goCave(){
    levelButton.style.display = "inline"
    inventoryButton.style.display = "inline"
    update(locations[2])
    return check = locations[2]
}

//Level up increases
function levelUp() {

    if (xp >= xpRequired) {
        //Increase level count
        levelText.textContent = level += 1;
        //Decreases current xp count
        xp -= xpRequired;

        //Next level up equates to 10 + current level
        xpRequired = xpRequired + level;

        //Xp display equates to current xp
        xpText.textContent = `${xp}/${xpRequired}`;

        //Display amount xp required for next level up
        console.log(xpRequired);
    
        //Level up rewards
        health += 10;
        healthText.textContent = Math.round(health)
        //Increase max damage output
        statPoints += 2;
    }
}

function buyHealth(){
    if (gold < 10) {
        text.textContent = "You dont have enough gold"
    }
    else {
        gold -= 10;
        goldText.textContent = gold
        health += 20;
        healthText.textContent = health
    }
    return check = locations[1]
}

function buyWeapon(){
    let bow = document.createElement("button")
    bow.textContent = "Bow"
    bow.style.marginRight = "5px"
    let shield = document.createElement("button")
    shield.textContent = "Shield"
    shield.style.marginRight = "5px"
    update(subLocations[0])

    bow.addEventListener("click", function(){
        if (gold >= 700 && ownedBow === false) {
            st += 5;
            agility += 25;
            ownedBow = true; 
            aquiredWeapons++; 
            text.textContent = `You bought a Bow! ST+5, AG+25`
            gold -= 700;
            goldText.textContent = gold;
        }
        else if (gold < 700) {
            text.textContent = `You dont have enough gold, you need 700 gold for this item`
        }
        else if (ownedBow === true) {
            text.textContent = `You already have a bow`
        }
    })

    shield.addEventListener("click", function(){
        if (gold >= 1200 && ownedShield === false) {
            st += 2;
            def += 80;
            ownedShield = true; 
            aquiredWeapons++; 
            text.textContent = `You bought a shield! ST+2, DEF+80`
            gold -= 1200;
            goldText.textContent = gold;
        }
        else if (gold < 1200) {
            text.textContent = `You dont have enough gold, you need 1200 gold for this item`
        }
        else if (ownedShield === true) {
            text.textContent = `You already have a shield`
        }
    })

    mainButtons.insertBefore(shield, bossButton)
    mainButtons.insertBefore(bow, shield)

    bossButton.addEventListener("click", function(){
        bow.style.display = "none"
        shield.style.display = "none"
    })

    inventoryButton.addEventListener("click", function(){
        bow.style.display = "none"
        shield.style.display = "none"
    })
    inventoryButton.addEventListener("dblclick", function(){
        bow.style.display = "none"
        shield.style.display = "none"
    })
    return check = subLocations[0]
}

function buySword() {
    if (gold >= 500 && ownedSword === false) {
        st += 10;
        agility += 4;
        def += 2;
        ownedSword = true; 
        aquiredWeapons++; 
        text.textContent = `You bought a sword! ST+10, AG+4, DEF+2`
        gold -= 500;
        goldText.textContent = gold;
    }
    else if (gold < 500) {
        text.textContent = `You dont have enough gold, you need 500 gold for this item`
    }
    else if (ownedSword === true) {
        text.textContent = `You already have a sword`
    }
}
function buyStaff() {
    if (gold >= 800 && ownedStaff === false) {
        int += 33;
        ownedStaff = true;
        aquiredWeapons++; 
        text.textContent = `You bought a staff! INT+33`
        gold -= 800;
        goldText.textContent = gold;
    }
    else if (gold < 800) {
        text.textContent = `You dont have enough gold, you need 800 gold for this item`
    }
    else if (ownedStaff === true) {
        text.textContent = `You already have a staff`
    }
}

inventoryButton.addEventListener("click", function() {
    update(subLocations[1])
})
inventoryButton.addEventListener("dblclick", function() {
    update(check)
})

function displayWeapons(){
    if (aquiredWeapons <= 0) {
        text.textContent = `You have no weapons...`
    }
    else if (aquiredWeapons >= 1) {
        let shieldBlock = document.createElement("button")
        shieldBlock.textContent = "Shield"
        update(inventoryDisplay[0])
        mainButtons.append(shieldBlock)

        shieldBlock.addEventListener("click", function(){
            if (ownedShield == true) {
                text.innerHTML = `"The shield is a sturdy defense tool, offering protection while allowing the user to block and absorb incoming attacks with ease."
                <br> Element: Basic, Armor
                <br> ST Increase: 2+
                <br> DEF Increase: 80+
                <br> DEF Type: Physical
                `
                visual.src = "./Images/shield.jpg"
            }
            else {
                text.innerHTML = "You do not own this weapon..."
            }
            inventoryButton.addEventListener("click", function(){
                shieldBlock.style.display = "none";
            })
        })
    }
}
function displayItems(){
    if (aquiredItems <= 0) {
        text.textContent = `You have no items...`
    }
}
function displayKey(){
    if (aquiredItems <= 0) {
        text.textContent = `You have no key items...`
    }
}
    function sword() {
        if (ownedSword == true) {
            text.innerHTML = `"The sword is a powerful weapon, combining precision and strength in every strike."
            <br> Element: Basic 
            <br> ST Increase: 10+
            <br> AG Increase: 4+
            <br> DEF Increase: 2+
            <br> ATK Type: Physical Pierce & Slash
            `
            visual.src = "./Images/output.jpg"
        }
        else {
            text.innerHTML = "You do not own this weapon..."
        }
    }
    function staff() {
        if (ownedStaff == true) {
            text.innerHTML = `"The staff is a magical instrument, harnessing the power of the elements to cast devastating spells."
            <br> Element: Fire, Wind, Electric, Water, Earth
            <br> INT Increase: 33+
            <br> ATK Type: Physical Strike, Magic 
            `
            visual.src = "./Images/staff.jpg"
        } 
        else {
            text.innerHTML = "You do not own this weapon..."
        }
    }
    function bow() {
        if (ownedBow == true) {
            text.innerHTML = `"The bow is a highly versatile weapon, capable of using a variety of arrows to adapt to any combat situation."
            <br> Element: Versatile 
            <br> ST Increase: 5+
            <br> AG Increase: 25+
            <br> ATK Type: Pierce
            `
            visual.src = "./Images/bow.jpg"
        } 
        else {
            text.innerHTML = "You do not own this weapon..."
        }
    }


function gauntlet1(){
    update(locations[3])
}
function gauntlet2(){
    update(locations[4])
}

function choice1(){
    let rareEncounter = Math.round(Math.random()*100)
        if (rareEncounter >= 80) {
            update(monsters[1])
            monsterStats.style.display = "flex"
            monsterName.style.display = "flex"
            monsterHealth.style.display = "flex"
    
            monsterHealth.textContent = monsters[1].peakHealth
            monsterName.textContent = monsters[1].name
            monsterDEF.textContent = monsters[1].def
            monsterATK.textContent = monsters[1].peakATKPower
            monsterAG.textContent = monsters[1].agility
    
            return check = monsters[1]
        }
        else {
            update(monsters[0])
            monsterStats.style.display = "flex"
            monsterName.style.display = "flex"
            monsterHealth.style.display = "flex"
    
            monsterHealth.textContent = monsters[0].peakHealth
            monsterName.textContent = monsters[0].name
            monsterDEF.textContent = monsters[0].def
            monsterATK.textContent = monsters[0].peakATKPower
            monsterAG.textContent = monsters[0].agility
            
            return check = monsters[0]
        }
}
function choice3(){
    update(monsters[3])
    monsterStats.style.display = "flex"
    monsterName.style.display = "flex"
    monsterHealth.style.display = "flex"

    monsterHealth.textContent = monsters[3].peakHealth
    monsterName.textContent = monsters[3].name
    monsterDEF.textContent = monsters[3].def
    monsterATK.textContent = monsters[3].peakATKPower
    monsterAG.textContent = monsters[3].agility

    return check = monsters[3]
}
function choice4(){
    update(monsters[4])
    monsterStats.style.display = "flex"
    monsterName.style.display = "flex"
    monsterHealth.style.display = "flex"

    monsterHealth.textContent = monsters[4].peakHealth
    monsterName.textContent = monsters[4].name
    monsterDEF.textContent = monsters[4].def
    monsterATK.textContent = monsters[4].peakATKPower
    monsterAG.textContent = monsters[4].agility

    return check = monsters[4]
}
function choice2(){
    update(monsters[2])
    monsterStats.style.display = "flex"
    monsterName.style.display = "flex"
    monsterHealth.style.display = "flex"

    monsterHealth.textContent = monsters[2].peakHealth
    monsterName.textContent = monsters[2].name
    monsterDEF.textContent = monsters[2].def
    monsterATK.textContent = monsters[2].peakATKPower
    monsterAG.textContent = monsters[2].agility

    return check = monsters[2]
}
function run(){
        let runChance = Math.round(Math.random()*10)+agility
    
        if (runChance > 7) {
            goTown();
            monsters.forEach(monster => {
                monster.health = monster.peakHealth
            })
        }
}

function enemyEscaped() {
    alert("The rare monster escaped...")
    goTown();
}


function fightDragon(){
    levelButton.style.display = "inline"
    inventoryButton.style.display = "inline"
    if (dragonSlayed == false) {
        update(monsters[5])
        monsterStats.style.display = "flex"
        monsterName.style.display = "flex"
        monsterHealth.style.display = "flex"
    
        monsterHealth.textContent = monsters[5].peakHealth
        monsterName.textContent = monsters[5].name
        monsterDEF.textContent = monsters[5].def
        monsterATK.textContent = monsters[5].peakATKPower
        monsterAG.textContent = monsters[5].agility
    
        return check = monsters[5]
    }
    else {
        update(monsters[6])
        monsterStats.style.display = "flex"
        monsterName.style.display = "flex"
        monsterHealth.style.display = "flex"
    
        monsterHealth.textContent = monsters[6].peakHealth
        monsterName.textContent = monsters[6].name
        monsterDEF.textContent = monsters[6].def
        monsterATK.textContent = monsters[6].peakATKPower
        monsterAG.textContent = monsters[6].agility
    
        return check = monsters[6]
    }
}