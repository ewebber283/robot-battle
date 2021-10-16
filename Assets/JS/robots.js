const playerName = window.prompt('What is your name?');
let playerHealth = 100;
let playerAttack = 10;
let playerMoney = 10;

let enemyNames=["Bender", "Terminator", "HAL"];
let enemyHealth = 50;
let enemyAttack = 12;

console.log(enemyNames);
console.log(enemyNames.length);
console.log(enemyNames[0]);
console.log(enemyNames[3]);

// fight function
const fight = function(enemyName) {
    while (playerHealth > 0 && enemyHealth > 0) {
    
      const promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
  
      if (promptFight === "skip" || promptFight === "SKIP") {
        
        const confirmSkip = window.confirm("Are you sure you'd like to quit?");
  
        if (confirmSkip) {
          window.alert(playerName + ' has decided to skip this fight. Goodbye!');
          playerMoney = playerMoney - 10;
          console.log("playerMoney", playerMoney);
          break;
        }
      }
  
      enemyHealth = enemyHealth - playerAttack;
      console.log(
        playerName + ' attacked ' + enemyName + '. ' + enemyName + ' now has ' + enemyHealth + ' health remaining.'
      );
  
      if (enemyHealth <= 0) {
        window.alert(enemyName + ' has perished!');
  
        playerMoney = playerMoney + 20;
  
        // leave while loop since enemy is dead
        break;
      } else {
        window.alert(enemyName + ' still has ' + enemyHealth + ' health left.');
      }
  
      playerHealth = playerHealth - enemyAttack;
      console.log(
        enemyName + ' attacked ' + playerName + '. ' + playerName + ' now has ' + playerHealth + ' health remaining.'
      );
  
      if (playerHealth <= 0) {
        window.alert(playerName + ' has died!');
        // leave while loop if player is dead
        break;
      } else {
        window.alert(playerName + ' still has ' + playerHealth + ' health left.');
      }
    }
  };
// start game  
const startGame = function() {

    //reset stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for (let i = 0; i < enemyNames.length; i++) {

        if (playerHealth > 0) {
          
          window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));
      
          // pick new enemy to fight based on the index of the enemyNames array
          const pickedEnemyName = enemyNames[i];
      
          // reset enemyHealth before starting new fight
          enemyHealth = 50;
      
          fight(pickedEnemyName);
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
    if (playerHealth > 0) {
        window.alert('You are the champion! Your score is ' + playerMoney + ".");
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

startGame();

