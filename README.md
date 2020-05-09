# cli-word-guess
A CLI app using constructors in Node.js for a word guess game.

### Overview

This app is access through a command line interface (CLI). It will select a random word and then allow you to guess letters, similar to hangman. You will have 10 incorrect guesses to discover the answer.

### How to Use

1. Download the directory
1. In the location of the download, run "npm install"
1. Run "node index.js" to start the game
1. When prompted, type a letter and press enter
   - Entering numbers will prompt you to enter a letter
   - Entering multiple letters will prompt you to enter one letter
   - Entering a previously entered letter will prompt you to enter a new letter
1. Once you guess the word or run out of guesses, you will be asked whether you want to play again.
   
### Examples

##### Starting the game

![start-the-game](https://raw.githubusercontent.com/MagusConjurer/cli-word-guess/master/images/start.png)

##### Main responses received

![main-responses](https://raw.githubusercontent.com/MagusConjurer/cli-word-guess/master/images/main-responses.png)

##### Winning the game

![win-the-game](https://raw.githubusercontent.com/MagusConjurer/cli-word-guess/master/images/win-game.png)

##### Losing the game

![lose-the-game](https://raw.githubusercontent.com/MagusConjurer/cli-word-guess/master/images/lose-game.png)
 
### How it Works

The code is broken into three files. 

##### Letter.js

The letter.js file is a constructor for the letters in the word. Each Letter stores the character and whether it has been guessed. If it has not been guessed, then it returns a '_' instead of the character. This is then exported and required in word.js.

##### Word.js

The word.js file is a constructor for the words that can be guessed. Each Word stores the letters in the word, can return the word as a string, and has a function to guess the letter which returns whether it was found. This is then exported and required in index.js.

##### Index.js

The index.js file requires the inquirer npm and word.js file. The startgame function selects a random word from the list and creates a Word. It then runs the wordGuess function, which contains the inquirer prompts and logic for what to return. 
   
### Technology Used
* Node.js
* Javascript
* inquirer npm
