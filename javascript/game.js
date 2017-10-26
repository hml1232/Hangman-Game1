
var wordBank = 
["goblin", 
"ghost", 
"clown", 
"witch", 
"broomstick", 
"bat", 
"coffin", 
"haunted", 
"howl", 
];

var   correctWord = [];
var   displayWord = [];
var   wrongLetters = [];

var hangman = {
   guessesLeft: 10,
   gamesWon: 0,


   pickWord : function() {
      //Create random value corresponding to indices of wordBank array
      var index = Math.floor( Math.random() * wordBank.length);
      //Split word at random index into correctWord array
      correctWord = wordBank[index].split("");
   },

   drawBoard : function() {
      //Display current number of wins
      document.getElementById("wins").innerHTML = hangman.gamesWon;
      //Display current number of guesses
      document.getElementById("guesses").innerHTML = hangman.guessesLeft;
      //Iterates through correctWord creating a copy in displayWord
      for(var i = 0; i < correctWord.length; i++) {
         //Spaces in multi-word strings are preserved
         if (correctWord[i] === " ") {
            displayWord[i] = " ";
         }
         //All other characters are hidden with _
         else {
            displayWord[i] = "_";
         }
      }
      //Displays the "hidden" displayWord array as string 
      document.getElementById("board").innerHTML = displayWord.join("");
   },

//Commented out attempt to separate userInput from playGame so that EventListener can be removed at end of game
   /*userInput : function(guess) {
      if(correctWord.includes(guess)) {
         for(var i = 0; i < correctWord.length; i++){
            if(guess.key === correctWord[i]) {
                displayWord[i] = guess; 
            }
         }
      }
      else if (wrongLetters.includes(guess)) {
      }
      else {
         wrongLetters.push(guess);
         document.getElementById("usedLetters").innerHTML = wrongLetters;
         hangman.guessesLeft --;
         document.getElementById("guesses").innerHTML = hangman.guessesLeft;
      }
         
      document.getElementById("board").innerHTML = displayWord.join("");
            
      if(correctWord.join("") == displayWord.join("")) {
         hangman.youWon();
         return;  
      }
      if(hangman.guessesLeft === 0) {
         hangman.youLost();
         return;
      }
   },
   playGame : function() {
      document.addEventListener('keyup', hangman.userInput(guess.key));
   },*/


   playGame : function() {
      //Initiates Listener for user kepresses
      document.addEventListener('keyup', function userInput(guess) {
         //If key press is in correctWord, finds all occurences and reveals them in displayWord
         if(correctWord.includes(guess.key)) {
            for(var i = 0; i < correctWord.length; i++){
               if(guess.key === correctWord[i]) {
                  displayWord[i] = guess.key; 
               }
            }
         }
         //If not in correctWord but is in wrongLetters, nothing happens
         else if (wrongLetters.includes(guess.key)) {
         }
         //If not in correct word or wrongLetters, added to wrongLetters, guessesLeft decremented by 1
         else {
            wrongLetters.push(guess.key);
            document.getElementById("usedLetters").innerHTML = wrongLetters;
            hangman.guessesLeft --;
            document.getElementById("guesses").innerHTML = hangman.guessesLeft;
         }
         //Updates displayWord on screen
         document.getElementById("board").innerHTML = displayWord.join("");

         //Checks for win condition
         if(correctWord.join("") == displayWord.join("")) {
            hangman.youWon();
            document.removeEventListener('keyup', userInput);
         }
         //Checks for lose condition
         if(hangman.guessesLeft === 0) {
            hangman.youLost();
            document.removeEventListener('keyup', userInput);
         }
      
      })
         
   },

   youWon : function() {
      console.log("I'm running");
      document.getElementById("game-over").innerHTML = "Congratulations! You won!"
      hangman.gamesWon ++;
      document.getElementById("wins").innerHTML = hangman.gamesWon;
         hangman.newGame();
      
   } ,

   youLost : function() {
      document.getElementById("game-over").innerHTML = "Sorry, you ran out of guesses!"
         hangman.newGame();
      
   },

   reset : function() {
      //document.removeEventListener('keyup', hangman.userInput());
      wrongLetters = [];
      document.getElementById("usedLetters").innerHTML = "";
      document.getElementById("guesses").innerHTML = "";
      hangman.guessesLeft = 10;
      displayWord = [];
      document.getElementById("board").innerHTML = "";
   },

   newGame : function() {
      hangman.reset();
      hangman.pickWord();
      hangman.drawBoard();
      hangman.playGame();
   },
}

hangman.newGame();