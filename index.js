var Word = require("./word.js");
var inquirer = require("inquirer");

var numGuesses = 10;
var prevLetters = [];
var words = ["apple", "banana"];
var answer;


function isLetter(str){
  var check = new RegExp(/[a-z]/i);
  return check.test(str);
};

function startGame(){
  var randNum = Math.floor(Math.random() * (words.length - 1));
  prevLetters = [];
  answer = new Word(words[randNum]);
  answer.createWord();
  console.log(answer.returnString() + "\n");
  wordGuess();
};

function wordGuess(){
  var correct = false;
  var spaces = answer.returnString().includes("_");
  if(numGuesses > 0 && spaces == true){
    inquirer.prompt([
      {
        name: "guess",
        message: "Guess a letter: "
      }
    ]).then(function(input){
      if(input.guess.length > 1){
        console.log("\nPlease guess only one letter at a time.");
        console.log("\n" + answer.returnString() + "\n");
        wordGuess();
      } else if(isLetter(input.guess) == false){
        console.log("\nPlease guess only letters.")
        console.log("\n" + answer.returnString() + "\n");
        wordGuess();
      } else if(prevLetters.includes(input.guess)){
        console.log("\nYou have already guessed that letter.")
        console.log("\n" + answer.returnString() + "\n");
        wordGuess();
      } else{
        correct = answer.guessLetter(input.guess);
        if(correct){
          console.log("\nCorrect");
        } else{
          console.log("\nIncorrect");
          numGuesses--;
          console.log("\nYou have " + numGuesses + " remaining.")
        };
        prevLetters.push(input.guess);
        console.log("\n" + answer.returnString() + "\n");
        wordGuess();
      };
    });
  } else{
    if(spaces == false){
      console.log("\nYou have guessed the word!\n");
    } else {
      console.log("\nYou are out of guesses!\n");
    }
    inquirer.prompt([
      {
        type: "confirm",
        name: "again",
        message: "Would you like to try another word?"
      }
    ]).then(function(input){
      if(input.again == true){
        startGame();
      } else{
        console.log("\nThanks for playing.")
      }
    })
  }

};

startGame();

