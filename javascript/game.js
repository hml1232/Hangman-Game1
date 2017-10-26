
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
"fangs",
"grave",
"wizard",
"zombie"
];

var   correctWord = [];
var   displayWord = [];
var   wrongLetters = [];

var hangman = {
   guessesLeft: 15,
   gamesWon: 0,


   pickWord : function() {
      var index = Math.floor( Math.random() * wordBank.length);
      correctWord = wordBank[index].split("");
   },

   drawBoard : function() {
      
      document.getElementById("wins").innerHTML = hangman.gamesWon;

      document.getElementById("guesses").innerHTML = hangman.guessesLeft;

      for(var i = 0; i < correctWord.length; i++) {
         
         if (correctWord[i] === " ") {
            displayWord[i] = " ";
         }
       
         else {
            displayWord[i] = "_";
         }
      }
     
      document.getElementById("box").innerHTML = displayWord.join("");
   },



   playGame : function() {
     
      document.addEventListener('keyup', function userInput(guess) {
       
         if(correctWord.includes(guess.key)) {
            for(var i = 0; i < correctWord.length; i++){
               if(guess.key === correctWord[i]) {
                  displayWord[i] = guess.key; 
               }
            }
         }
        
         else if (wrongLetters.includes(guess.key)) {
         }
        
         else {
            wrongLetters.push(guess.key);
            document.getElementById("usedLetters").innerHTML = wrongLetters;
            hangman.guessesLeft --;
            document.getElementById("guesses").innerHTML = hangman.guessesLeft;
         }
  
         document.getElementById("box").innerHTML = displayWord.join("");

       
         if(correctWord.join("") == displayWord.join("")) {
            hangman.youWon();
            document.removeEventListener('keyup', userInput);
         }
        
         if(hangman.guessesLeft === 0) {
            hangman.youLost();
            document.removeEventListener('keyup', userInput);
         }
      
      })
         
   },

   youWon : function() {
      console.log("I'm running");
      document.getElementById("game-over").innerHTML = "Congratulations!! "
      hangman.gamesWon ++;
      document.getElementById("wins").innerHTML = hangman.gamesWon;
         hangman.newGame();
      
   } ,

   youLost : function() {
      document.getElementById("game-over").innerHTML = "Don't be a scaredy cat! try again! "
         hangman.newGame();
      
   },

   reset : function() {
     
      wrongLetters = [];
      document.getElementById("usedLetters").innerHTML = "";
      document.getElementById("guesses").innerHTML = "";
      hangman.guessesLeft = 10;
      displayWord = [];
      document.getElementById("box").innerHTML = "";
   },

   newGame : function() {
      hangman.reset();
      hangman.pickWord();
      hangman.drawBoard();
      hangman.playGame();
   },
}

hangman.newGame();