var Word = require("./word.js");
var inquirer = require("inquirer");

var numGuesses = 0;
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
  console.log(answer.returnString());
  wordGuess();
};

function wordGuess(){
  var correct = false;
  var spaces = answer.returnString().includes("_");
  if(numGuesses < 5 && spaces == true){
    inquirer.prompt([
      {
        name: "guess",
        message: "Guess a letter: "
      }
    ]).then(function(input){
      if(input.guess.length > 1){
        console.log("Please guess only one letter at a time.");
        wordGuess();
      } else if(isLetter(input.guess) == false){
        console.log("Please guess only letters.")
        wordGuess();
      } else if(prevLetters.includes(input.guess)){
        console.log("You have already guessed that letter.")
        wordGuess();
      } else{
        correct = answer.guessLetter(input.guess);
        if(correct){
          console.log("Correct");
        } else{
          console.log("Incorrect");
        };
        prevLetters.push(input.guess);
        console.log(answer.returnString());
        numGuesses++;
        wordGuess();
      };
    });
  } else{
    if(spaces == false){
      console.log("You have guessed the word!");
    } else {
      console.log("You are out of guesses!");
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
        console.log("Thanks for playing.")
      }
    })
  }

};

startGame();

