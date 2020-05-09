var Word = require("./word.js");
var inquirer = require("inquirer");

var numGuesses = 10;
var prevLetters = [];
var prevSelection = [];
var words = ["dragong", "castle", "knight", "forest",
"mountain", "flame", "breath", "scales", "adventure", "battle",
"beast", "treasure", "creature", "enchanted", "kingdom", "legend",
"astonishing", "behemoth", "magical", "mythical", "terrifying"
];
var answer;


function isLetter(str){
  var check = new RegExp(/[a-z]/i);
  return check.test(str);
};

function startGame(){
  var randNum = Math.floor(Math.random() * (words.length));
  if(prevSelection.includes(randNum) && prevSelection.length < words.length){
    startGame();
  } else if(prevSelection.length == words.length){
    prevSelection = [];
    startGame();
  } else{
    prevSelection.push(randNum);
    prevLetters = [];
    answer = new Word(words[randNum]);
    answer.createWord();
    console.log(answer.returnString() + "\n");
    wordGuess();
  }
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
          console.log("\x1b[32m","\nCorrect","\x1b[0m");
        } else{
          console.log("\x1b[31m","\nIncorrect","\x1b[0m");
          numGuesses--;
          console.log("\nYou have " + numGuesses + " guesses remaining.")
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

