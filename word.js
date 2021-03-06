var Letter = require("./letter");

function Word(str){
  // An array to store the original string split into it's characters
  this.value = str.split(""),
  // An array to hold the Letter objects from createWord
  this.letterArray = [],
  // A function that takes the original string and adds the characters as Letter objects to letterArray
  this.createWord = function(){
    for(var i = 0; i < this.value.length; i++){
      this.letterArray.push(new Letter(this.value[i]));
    };
  },
  // A function that returns a string representing the word.
  this.returnString = function(){
    var wordString = "";
    for(var j = 0; j < this.letterArray.length; j++){
      wordString += this.letterArray[j].getLetter() + " ";
    };
    return wordString;
  },
  // A function that takes a character as an argument and calls the guess function on each letter object
  this.guessLetter = function(char){
    var found = false;
    for(var k = 0; k < this.letterArray.length; k++){
      var check = this.letterArray[k].checkLetter(char);
      if(check == true){
        found = true;
      };
    };
    return found;
  }
};

module.exports = Word;