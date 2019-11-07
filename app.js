
// Game values
let min,
    max,
    winningNum,
    guessesLeft = 3;


// Ui Elements
const game = document.querySelector('#game'),
      guessBtn = document.querySelector('#guess-btn'),
      againBtn = document.querySelector('#again-btn')
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');
      mainText = document.querySelector('.main-text');
      minBtn = document.querySelector('.change-min');
      maxBtn = document.querySelector('.change-max');
      pChange = document.querySelector('.p-change');

//Hide button play again
againBtn.style.display = "none";
pChange.style.display = 'none';

// Load text "Enter min number"
enterMinMax();

// Listen for guess
guessBtn.addEventListener('click', function(e){
  // From spring to int
  guess = parseInt(guessInput.value);

  //setMessage
  setMessage('');

  if(isNaN(guess) && (min === undefined || max === undefined)){
    return setMessage('Enter number', 'red');
  }
  if(min === undefined && !isNaN(guess)){
    if(guess >= max) return setMessage(`Enter number lower than ${max}`, 'red');
     min = guess;
     if(max !== undefined){
       pChange.style.display = 'block';
       winningNum = getRandomNum();
     }
    enterMinMax();
    guessInput.value = "";
  }else if(min !== undefined && max === undefined && !isNaN(guess)){
    if(min >= guess) return setMessage(`Enter number higher than ${min}`, 'red');
    max = guess;
    enterMinMax();
    winningNum = getRandomNum();
    guessInput.value = "";
    pChange.style.display = 'block';
  }
  else if(min !== undefined && max !== undefined){
    // Validate
    if(isNaN(guess) || guess > max || guess < min){
      return setMessage(`Enter number between ${min} to ${max}`, 'red');
    }
    // Check if won
    if(guess === winningNum){
      // Game over - won
      gameOver(true,`${winningNum} is correct, YOU WIN!`);
    }else {
      // Minus 1 guess
      guessesLeft -=1;
      pChange.style.display = 'none';
      if(guessesLeft === 0){
        // Game over - lost
        gameOver(false,`Game Over You lost. The correct number was ${winningNum}`);
      }else {
        // Set message
        setMessage(`${guessesLeft} guess left`, 'red');
      }
    }
  }
});


//"Restart" game by button "Play Again"
againBtn.addEventListener('click', function(){
  winningNum = getRandomNum(),
  guessesLeft = 3;
  guessInput.disabled = false;
  againBtn.style.display = "none";
  guessBtn.style.display = "inline-block";
  setMessage('');
  guessInput.style.borderColor = "gray";
  guessInput.value = "";
  pChange.style.display = 'block';
});

//Change min by min btn
minBtn.addEventListener('click', function(){
  min = undefined;
  enterMinMax();
  pChange.style.display = 'none';
})

//Change max by max btn
maxBtn.addEventListener('click', function(){
  max = undefined;
  enterMinMax();
  pChange.style.display = 'none';
})


// Game over
function gameOver(win, msg){
  let color;
  win === true ? color = 'green' : color = 'red';

  // Disable input
  guessInput.disabled = true;
  // CHange border color
  guessInput.style.borderColor = color;
  // Set message
  setMessage(msg,color);

  //Show button play again
  againBtn.style.display = "inline-block";
  //Hide button submit
  guessBtn.style.display = "none";

}


// Set message
function setMessage(msg, color = ""){
  message.textContent = msg;
  message.style.color = color;
}

// Get Winning number
function getRandomNum(){
  return Math.floor(Math.random()*(max-min+1)+min);
}

// Enter min and max
function enterMinMax() {
  if(min === undefined){
    mainText.innerHTML = "Enter <span class='important'>minimum</span> number";
    setMessage('');
  }else if(min !== undefined && max === undefined){
    mainText.innerHTML = "Enter <span class='important'>maximum</span> number";
    setMessage('');
  }
  else if(min !== undefined && max !== undefined){
    mainText.textContent = `Guess a number between ${min} and ${max}`;
  }
}
