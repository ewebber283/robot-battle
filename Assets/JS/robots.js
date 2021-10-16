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
var fight = function(enemyName) {
    while (playerHealth > 0 && enemyHealth > 0) {
    
      var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
  
      if (promptFight === "skip" || promptFight === "SKIP") {
        
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");
  
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
  
  // fight each enemy-robot by looping over them and fighting them one at a time
  for (var i = 0; i < enemyNames.length; i++) {

    if (playerHealth > 0) {
      
      window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));
  
      // pick new enemy to fight based on the index of the enemyNames array
      var pickedEnemyName = enemyNames[i];
  
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

