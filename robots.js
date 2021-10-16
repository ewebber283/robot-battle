const playerName = window.prompt('What is your name?');
let playerHealth = 100;
let playerAttack = 10;
let playerMoney = 10;

let enemyNames=["Bender", "Mr. Roboto", "HAL"];
let enemyHealth = 50;
let enemyAttack = 12;

const fight = function(enemyName) {

    window.alert("Welcome to Robot Gladiators!")
    const promptFight = window.prompt("Would you like to SKIP or FIGHT?")

    if (promptFight === "FIGHT") {
    //enemy gets attacked
    enemyHealth = enemyHealth - playerAttack;
    console.log(enemyName + " now has " + enemyHealth);

    if(enemyHealth<=0) {
        window.alert(enemyName + " has perished")
    }
    else {
        window.alert(enemyName + " has " + enemyHealth + " left " )
        
    }

    playerHealth = playerHealth - enemyAttack;
    console.log(playerName + " now has " + playerHealth);
    
    if(playerHealth<=0) {
        window.alert(playerName + " has perished")
    }
    else {
        window.alert(playerName + " has " + playerHealth + " left " )
        
    }
} else if (promptFight === "SKIP") {
    const confirmSkip  = window.confirm("Are you sure you are afraid?")

    if (confirmSkip) {
    playerMoney = playerMoney - 1;
    window.alert(playerName + " is afraid and now only has " + playerMoney + " left")
    }

    else {
        fight();
    }
} else {
    window.alert("You must choose a valid option")
    fight();
}


};

for(const i = 0; i<enemyNames.length; i++) {
    fight(enemyNames[i]);
}

