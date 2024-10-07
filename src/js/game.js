class Game {
  constructor() {
    this.startScreen = document.getElementById("start-screen");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    this.gameNextLevelScreen = document.getElementById("game-level-complete");
    this.timerText = document.getElementById("timer");
    this.score = 0;
    this.level = 1;
    this.timeRemaining = 9 + 1 * this.level;
    this.levelCondition = 50 * this.level;
    this.gameIsOver = false;
    this.levelIsCompleted = false;
    this.gameIntervalId = null;
    this.gameLoopFrequency = Math.round(1000 / 60);
    this.gameRunning = false;
    this.disappearSpeed = 800;
    this.themeMusic = new Audio("src/assets/sounds/Halloween-theme-tune.mp4");
  }

  startLevel() {
    //Hide Start screen
    this.startScreen.style.display = "none";

    //Show game screen
    this.gameScreen.style.display = "block";

    //hide next level screen
    this.gameNextLevelScreen.style.display = "none";

    this.gameRunning = true;

    this.timeRemaining = 9 + 1 * this.level;
    this.levelCondition = 50 * this.level;
    document.getElementById(
      "required-score"
    ).innerText = `Target: ${this.levelCondition}`;
    document.getElementById("current-level").innerText = `Level: ${this.level}`;
  }

  nextLevel() {
    document.getElementById(
      "level-complete"
    ).innerText = `Congratulations! Level ${this.level} complete! `;

    document.getElementById("level-score").innerText = `Score: ${this.score}`;

    //this.level++;
    //hide game screen
    this.gameScreen.style.display = "none";

    this.gameRunning = false;

    // show next level screen
    this.gameNextLevelScreen.style.display = "block";
    console.log(this.level);
  }

  endGame() {
    this.gameIsOver = true;

    //Hide game screen
    this.gameScreen.style.display = "none";

    //Show end game screen
    this.gameEndScreen.style.display = "block";
    document.getElementById(
      "finalscore"
    ).innerText = `Final score: ${this.score}`;
  }
}
