let randomNumber = function(min, max) {
    let value = Math.floor(Math.random() * (max - min + 1)) + min;
    return value;
}

let playerInfo = {
    name: window.prompt('What is your name?'),
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
// fight function
const fight = function(enemy) {
    while (playerInfo.health > 0 && enemy.health > 0) {
    
      const promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
  
      if (promptFight === "skip" || promptFight === "SKIP") {
        
        const confirmSkip = window.confirm("Are you sure you'd like to quit?");
  
        if (confirmSkip) {
          window.alert(playerInfo.health + ' has decided to skip this fight. Goodbye!');
          playerInfo.money = Math.max(0,playerInfo.money - 10);
          console.log("playerInfo.money", playerInfo.money);
          break;
        }
      }
      
      let damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
      enemy.health = Math.max(0, enemy.health - damage);
      console.log(
        playerInfo.health + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
      );
  
      if (enemy.health <= 0) {
        window.alert(enemy.name + ' has perished!');
  
        playerInfo.money = playerInfo.money + 20;
  
        // leave while loop since enemy is dead
        break;
      } else {
        window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
      }

      damage = randomNumber(enemy.attack - 3, enemy.attack);
      playerInfo.health = Math.max(0,playerInfo.health - damage);

      console.log(
        enemy.name + ' attacked ' + playerInfo.health + '. ' + playerInfo.health + ' now has ' + playerInfo.health + ' health remaining.'
      );
  
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.health + ' has died!');
        // leave while loop if player is dead
        break;
      } else {
        window.alert(playerInfo.health + ' still has ' + playerInfo.health + ' health left.');
      }
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
    if (playerInfo.health > 0) {
        window.alert('You are the champion! Your score is ' + playerInfo.money + ".");
    }
    else {
        window.alert("Your robot has been destroyed. Come back soon.");
    }

    const playAgainConfirm = window.confirm("Would you like to play again?")

    if (playAgainConfirm) {
        startGame();
    }
    else {
        window.alert("Thanks for playing!")
    }
};

const shop = function() {
    const shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store. Please enter REFILL, UPGRADE, or LEAVE."
    );

    switch (shopOptionPrompt) {
        case "REFILL": // new case
        case "refill":
          playerInfo.refillHealth()
          break;
        case "UPGRADE": // new case
        case "upgrade":
          playerInfo.upgradeAttack();
          break;
        case "LEAVE": // new case
        case "leave":
          window.alert("Leaving the store.");
          break;
        default:
          window.alert("You did not pick a valid option. Try again.");
          shop();
          break;
      }
};

startGame();

