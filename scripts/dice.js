
//player object
function Player(name) {
  this.name = name;
  this.gameScore = 0;
  this.roundScore = 0;
}



var diceValue = 0;
var activePlayer = 0;
var players = [];
var prevDice = 0;

newGame();


//event listeners
document.querySelector('.btn-new').addEventListener('click', newGame);
document.querySelector('.btn-roll').addEventListener('click', rollDice);
document.querySelector('.dice').addEventListener('click', rollDice);
document.querySelector('.btn-hold').addEventListener('click', holdRound);

function newGame(){
    diceValue = 0;
    activePlayer = 0;
    prevDice = 0;
    players = [new Player("Player1"), new Player("Player2")];
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = 'none';
    //reset players scores
    for (let index = 0; index < players.length; index++) {
        document.querySelector("#score-" + index).textContent = 0;
        document.querySelector("#current-" + index).textContent = 0;
        document.querySelector('#name-' + index).textContent = 'Player ' + (index + 1);
    }

    
}

function holdRound(){
    var player = players[activePlayer];
    player.gameScore += player.roundScore;
    player.roundScore = 0;
    updateHTML();
    if(player.gameScore >= 100)
    {
        document.querySelector('#name-' + activePlayer).textContent = 'YOU WIN!';
    }
    else{
        changePlayer();
    }
    
}

function rollDice(){
    
    diceValue = Math.floor(Math.random() * 6) + 1;//roll dice


    if(diceValue !== 1)
    {
        if(diceValue === 6 && prevDice === 6){
            players[activePlayer].roundScore = 0;
            players[activePlayer].gameScore = 0;
            prevDice = 0;//reset prev dice for new player
            updateHTML();
            changePlayer();
        }
        else{
            prevDice = diceValue;
            players[activePlayer].roundScore += diceValue;//add roll players to round score
            updateHTML();
            
        }

    }
    else
    {
        players[activePlayer].roundScore = 0;//reset round score
        updateHTML();
        changePlayer();

    }


    document.querySelector('.dice').src = "images/dice-" + diceValue + ".png";

    document.querySelector(".dice").style.display = 'block';
}

function updateHTML(){
    document.querySelector('#current-' + activePlayer).textContent = players[activePlayer].roundScore;
    document.querySelector('#score-' + activePlayer).textContent = players[activePlayer].gameScore;
}

function changePlayer(){
            

            //remove active class from current player
            document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active-player');
            activePlayer = (activePlayer === 1) ? 0:1;//change player
            //add active class to new player
            document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active-player');

}



