var gameStatus = document.querySelector(".gameStatus");
var body = document.body;
var question = document.querySelector(".question");
var answer = document.querySelector(".questions");
var feedback = document.querySelector(".feedback");
var i = 0;

var option1Element = document.querySelector(".option1");
var option2Element = document.querySelector(".option2");
var option3Element = document.querySelector(".option3");
var option4Element = document.querySelector(".option4");

var win = document.querySelector(".win");
var lose = document.querySelector(".lose");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
console.log (startButton);
console.log (document);
var winCounter = 0;
var loseCounter = 0;
var isWin = false;
var timer;
var timerCount;

var qanda = {
questions : [
"What is Java?",
"Can you make dynamic web sites in Java?",
"Can you change styles from JavaScript?",
"How can you store data using Java?"
],
option1 : [
"1- It is a high protein food",
"1- Yes, you can create dicamic web sites",
"1- No, you cannot change styles from Java at all",
"1- Bla Bla Bla"
],
option2 : [
"2- Abosolete laneguage",
"2- No",
"2- Yes, you can change styles dynamically",
"2- Only if you have the key to the locker"
],
option3 : [
"3- It is a video game",
"3- bla bla",
"3- Only if you are using google Chrome",
"3- Yes, by definig variables"
],
option4 :[
"4- Method to create dynamic web pages",
"4- More Bla Bla Bla",
"4- when the user allow you to do it so.",
"4- You cannot store data in Java"
],
answers : [
"4- Method to create dynamic web pages",
"1- Yes, you can create dicamic web sites",
"2- Yes, you can change styles dynamically",
"3- Yes, by definig variables"
]
}



answer.addEventListener("click", function(event) {
  var element = event.target;
  console.log(element.textContent);

  if (element.textContent===qanda.answers[i]){
    feedback.textContent = "CORRECT!!!";
    //prompt ("Correct");
    console.log ("Answer match correcly");
    i++;
    renderQuestions(i);
   
    }
});



// The init function is called when the page loads 
function init() {
  getWins();
  getlosses();
  console.log ('GAME LOADED');
}

// The startGame function is called when the start button is clicked
function startGame() {
  isWin = false;
  timerCount = 10;
  renderQuestions(0);
  // Prevents start button from being clicked when round is in progress
  startButton.disabled = true;
  startTimer();
  console.log ('TIMER SET');
  }

  

function renderQuestions (i) {

  if (i<=3 && timerCount>0 ){  
  //for(var i=0; i <4; i++){
question.textContent = qanda.questions[i];
option1Element.innerHTML = qanda.option1[i];
option2Element.innerHTML = qanda.option2[i];
option3Element.innerHTML = qanda.option3[i];
option4Element.innerHTML = qanda.option4[i];
console.log(option1Element);
console.log("ENTER Q RENDER");
console.log(i);
}

}
// The winGame function is called when the win condition is met
function winGame() {
  gameStatus.textContent = "YOU WON!!!🏆 ";
  winCounter++
  startButton.disabled = false;
  setWins()
}

// The loseGame function is called when timer reaches 0
function loseGame() {
  console.log('TIME OUT');
  gameStatus.textContent = "GAME OVER";
  loseCounter++
  startButton.disabled = false;
  setLosses()
  
}

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
  // Sets timer
  timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount >= 0) {
      // Tests if win condition is met
      if (isWin && timerCount > 0) {
        // Clears interval and stops timer
        clearInterval(timer);
        winGame();
      }
    }
    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
      loseGame();
    }
  }, 1000);
}

// Updates win count on screen and sets win count to client storage
function setWins() {
  win.textContent = winCounter;
  localStorage.setItem("winCount", winCounter);
}

// Updates lose count on screen and sets lose count to client storage
function setLosses() {
  lose.textContent = loseCounter;
  localStorage.setItem("loseCount", loseCounter);
}

// These functions are used by init
function getWins() {
  // Get stored value from client storage, if it exists
  var storedWins = localStorage.getItem("winCount");
  // If stored value doesn't exist, set counter to 0
  if (storedWins === null) {
    winCounter = 0;
  } else {
    // If a value is retrieved from client storage set the winCounter to that value
    winCounter = storedWins;
  }
  //Render win count to page
  win.textContent = winCounter;
}

function getlosses() {
  var storedLosses = localStorage.getItem("loseCount");
  if (storedLosses === null) {
    loseCounter = 0;
  } else {
    loseCounter = storedLosses;
  }
  lose.textContent = loseCounter;
}


// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);

// Calls init() so that it fires when page opened
init();

// Bonus: Add reset button
var resetButton = document.querySelector(".reset-button");

function resetGame() {
  // Resets win and loss counts
  winCounter = 0;
  loseCounter = 0;
  // Renders win and loss counts and sets them into client storage
  setWins()
  setLosses()
}

// Attaches event listener to button
resetButton.addEventListener("click", resetGame);