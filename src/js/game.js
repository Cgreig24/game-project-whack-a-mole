class Game {
  constructor() {
    this.startScreen = document.getElementById("start-screen");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    this.obstacles = [];
    this.score = 0;
    this.gameIsOver = false;
  }

  start() {
    //Hide Start screen
    this.startScreen.style.display = "none";

    //Show game screen
    this.gameScreen.style.display = "block";
  }

  //if(this.gameIsOver = true)
  //{this.endGame()}

  endGame() {
    this.gameIsOver = true;

    //Hide game screen
    this.gameScreen.style.display = "none";

    //Show end game screen
    this.gameEndScreen.style.display = "block";
    //document.getElementById("finalscore").innerText = this.score;
  }
}
