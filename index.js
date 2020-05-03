var Word = require("./word.js");
var inquirer = require("inquirer");

var numGuesses = 0;
var words = ["apple", "banana"];

function isLetter(str){
  var check = new RegExp(/[a-z]/i);
  return check.test(str);
};

function startGame(){
  var randNum = Math.floor(Math.random() * (words.length - 1));
  var answer = new Word(words[randNum]);
  answer.createWord();

  wordGuess();
}

function wordGuess(){
  if(numGuesses < 15){
    inquirer.prompt([
      {
        name: "guess",
        message: "Guess a letter: "
      }
    ]).then(function(answers){
      if(answers.guess.length > 1){
        console.log("Please guess only one letter at a time.");
        wordGuess();
      } else if(isLetter(answers.guess) == false){
        console.log("Please guess only letters.")
      } else{
        console.log(answers.guess);
      };
    });
  };
};

startGame();

