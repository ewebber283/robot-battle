let randomNumber = function(min, max) {
    let value = Math.floor(Math.random() * (max - min + 1)) + min;
    return value;
}
let getPlayerName = function() {
    let name = "";
    while (name === "" || name === null) {
        name = prompt("What is your robot's name?")
        }
    console.log("Your robot's name is " + name);
    return name;
}
let playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        //this = original object
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if(this.money >= 7) {
            this.health += 20;
            this.money -= 7;
            } else {
                window.alert("You don't have enough money")
            }
    },
    upgradeAttack: function() {
        if(this.money >= 7) {
            this.attack += 6;
            this.money -= 7;
            } else {
                window.alert("You don't have enough money")
            }
        this.attack +=6;
        this.money -= 7;
    }
};

let enemyInfo = [
    {
        name: "Bender",
        attack: randomNumber(10,14)
    },
    {
        name: "Terminator",
        attack: randomNumber(10,14)
    },
    {
        name: "HAL",
        attack: randomNumber(10,14)
    }
];

let fightOrSkip = function() {
    // ask player if they'd like to fight or skip using fightOrSkip function
    let promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
  
    //recursive function
    if(promptFight === "" || promptFight === null){
        window.alert("You need to provide a valid answer please try again")
        return fightOrSkip();
    }
    promptFight = promptFight.toLowerCase();
    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip") {
      // confirm player wants to skip
      const confirmSkip = window.confirm("Are you sure you'd like to quit?");
  
      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
        // subtract money from playerMoney for skipping
        playerInfo.money = Math.max(0,playerInfo.money - 10);
        //true if player wants to leave
        return true;
        //shop();
      }
    }
    return false;
  }
// fight function
let fight = function(enemy) {
    let isPlayerTurn = true;
    if(Math.random() > 0.5){
        isPlayerTurn = false;
    }
    while (playerInfo.health > 0 && enemy.health > 0) {
      if(isPlayerTurn) {
        if(fightOrSkip()) {
            break;
      }
      
      let damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
      enemy.health = Math.max(0, enemy.health - damage);
      console.log(
        playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
      );
  
      if (enemy.health <= 0) {
        window.alert(enemy.name + ' has perished!');
  
        playerInfo.money = playerInfo.money + 20;
  
        // leave while loop since enemy is dead
        break;
      } else {
        window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
      }
    } else {
      damage = randomNumber(enemy.attack - 3, enemy.attack);
      playerInfo.health = Math.max(0,playerInfo.health - damage);

      console.log(
        enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
      );
  
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + ' has died!');
        // leave while loop if player is dead
        break;
      } else {
        window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
      }
    }
    // switch turns
    isPlayerTurn = !isPlayerTurn
    }
  };
// start game  
const startGame = function() {

    //reset stats
    playerInfo.reset();

    for (let i = 0; i < enemyInfo.length; i++) {

        if (playerInfo.health > 0) {
          
          window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));
          // pick new enemy to fight based on the index of the enemy.names 
          const pickedEnemyObj = enemyInfo[i];
      
          // reset enemy.health before starting new fight
          pickedEnemyObj.health = randomNumber(40,60);
      
          fight(pickedEnemyObj);
            // if not at last enemy: array as -1 always gives last index
          if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
              const storeConfirm = window.confirm("The fight is done, visit the store?")

              if(storeConfirm) {
                shop();
              }
              
          }
        }
        // if player isn't alive, stop the game
        else {
          window.alert('You have lost your robot in battle! Game Over!');
          break;
        }
    }
   endGame();
};

const endGame = function() {
    window.alert("The game has ended. Let's see how you did!");

    //check localstorage for high score
    let highScore = localStorage.getItem("highscore");
    if(highScore === null) {
        highScore = 0;
    }
    if(playerInfo.money > highScore) {
        localStorage.setItem("highscore", playerInfo.money)
        localStorage.setItem("name", playerInfo.name);

        alert(playerInfo.name + " now has the high score of " + playerInfo.money)
    } else {
        alert(playerInfo.name + " did not beat the high score of " + highScore);
    }

    const playAgainConfirm = window.confirm("Would you like to play again?")

    if(playAgainConfirm) {
        startGame();
    } else {
        window.alert("Thanks for playing! Come back soon.")
    }
};

const shop = function() {
    let shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store. Please enter 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
    );
    shopOptionPrompt = parseInt(shopOptionPrompt);
    switch (shopOptionPrompt) {
        case 1:
          playerInfo.refillHealth()
          break;
        case 2:
          playerInfo.upgradeAttack();
          break;
        case 3:
          window.alert("Leaving the store.");
          break;
        default:
          window.alert("You did not pick a valid option. Try again.");
          shop();
          break;
      }
};

startGame();

