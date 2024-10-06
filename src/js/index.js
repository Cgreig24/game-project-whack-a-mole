window.onload = function () {
  const startButton = document.getElementById("start-button");
  const gameScreen = document.getElementById("game-screen");
  const restartButton = document.getElementById("restart-button");
  const nextLevelButton = document.getElementById("next-level");
  let game;
  let currentMikeTile;
  let currentPumpkinTile;
  let currentLaurieTile;

  //Clicking start button starts game
  startButton.addEventListener("click", function () {
    setGame();
  });

  //Start Timer
  function startTimer() {
    //let timeRemaining = 10;
    let timer = setInterval(function () {
      if (game.timeRemaining >= 0) {
        document.getElementById(
          "timer"
        ).innerHTML = `Countdown: ${game.timeRemaining}`;
        game.timeRemaining--;
      } else {
        // game.endGame();
        hasCompletedLevel();
        clearInterval(startTimer);
        //game.timeRemaining = 10 * game.level;
      }
    }, 1000);
  }

  function hasCompletedLevel() {
    if (game.score >= game.levelCondition) {
      game.levelIsCompleted = true;
      game.nextLevel();
      //game.levelIsCompleted = false;
    } else {
      game.endGame();
    }
  }

  //Set the game board with tiles
  function setGame() {
    game = new Game();
    //startTimer();
    game.startLevel();
    for (let i = 0; i < 12; i++) {
      let tile = document.createElement("div");
      tile.id = i.toString();
      tile.addEventListener("click", selectTile);
      document.getElementById("board").appendChild(tile);
    }

    startTimer();

    //Set Intervals for moles to appear

    //call Mike every X seconds
    //setInterval(setMikeLocation, randomTime(400, 2500));
    setInterval(setMikeLocation, 1200);

    //call additional pumpkin every X seconds
    // setInterval(setPumpkinLocation, randomTime(600, 2500));
    setInterval(setPumpkinLocation, 1600);

    //call laurie every X seconds
    // setInterval(setLaurieLocation, randomTime(1500, 2500));
    setInterval(setLaurieLocation, 2500);
  }

  function restartLevel() {
    //startTimer();
    game.startLevel();
  }

  //get random number for tile where they will appear
  function getRandomTile() {
    let num = Math.floor(Math.random() * 12);
    return num.toString();
  }

  //Removes moles - When calling specify which character to remove
  function removeMole(tile) {
    tile.innerHTML = "";
  }

  //Sets image of mike myers as mole
  //Selects one of the 9 tiles at random to append this image to

  function setMikeLocation() {
    mike = new MikeMyers(gameScreen);

    if (game.gameIsOver) {
      return;
    }
    //if (currentMikeTile) {
    // currentMikeTile.innerHTML = "";
    //}

    //random title location for mole
    let randomTile = getRandomTile();

    //if the jack o lantern or laurie is already there, return instead of adding image on top
    if (
      (currentPumpkinTile && currentPumpkinTile.id == randomTile) ||
      (currentLaurieTile && currentLaurieTile.id == randomTile) ||
      (currentMikeTile && currentMikeTile.id == randomTile)
    ) {
      return;
    }

    currentMikeTile = document.getElementById(randomTile);
    currentMikeTile.appendChild(mike.mole);
    currentMikeTile.addEventListener("click", selectTile);

    //remove Mike
    setTimeout(() => {
      removeMole(currentMikeTile);
    }, game.disappearSpeed);
  }

  //Sets image of Jack O Lantern as non dangerous character
  //Selects one of the 9 tiles at random to append this image to

  function setPumpkinLocation() {
    let pumpkin = new Pumpkin(gameScreen);
    if (game.gameIsOver) {
      return;
    }

    if (currentPumpkinTile) {
      currentPumpkinTile.innerHTML = "";
    }

    let randomTile = getRandomTile();

    //if Mike or laurie are already there, return instead of adding image on top
    if (
      (currentMikeTile && currentMikeTile.id == randomTile) ||
      (currentLaurieTile && currentLaurieTile.id == randomTile) ||
      (currentPumpkinTile && currentPumpkinTile.id == randomTile)
    ) {
      return;
    }

    currentPumpkinTile = document.getElementById(randomTile);
    currentPumpkinTile.appendChild(pumpkin.mole);
    currentPumpkinTile.addEventListener("click", selectTile);

    setTimeout(() => {
      removeMole(currentPumpkinTile);
    }, game.disappearSpeed);
  }

  //Set where Laurie appears
  function setLaurieLocation() {
    let laurie = new Laurie(gameScreen);
    if (game.gameIsOver) {
      return;
    }

    //if (currentLaurieTile) {
    // currentLaurieTile.innerHTML = "";
    //    }

    let randomTile = getRandomTile();

    //if the pumpkin or jack are already there, return instead of adding image on top
    if (
      (currentMikeTile && currentMikeTile.id == randomTile) ||
      (currentPumpkinTile && currentPumpkinTile.id == randomTile) ||
      (currentLaurieTile && currentLaurieTile.id == randomTile)
    ) {
      return;
    }

    currentLaurieTile = document.getElementById(randomTile);
    currentLaurieTile.appendChild(laurie.mole);
    currentLaurieTile.addEventListener("click", selectTile);

    //remove Laurie
    setTimeout(() => {
      removeMole(currentLaurieTile);
    }, game.disappearSpeed);
  }

  //Clicking on tile
  function selectTile() {
    if (game.gameIsOver) {
      return;
    }
    if (this == currentMikeTile) {
      game.score += 10;

      //this links back to the html file which display score at the top
      //document.getElementById("score").innerText = this.score.toString();
      document.getElementById("score").innerText = `Score: ${game.score}`;
      removeMole(currentMikeTile);
    }
    if (this == currentPumpkinTile) {
      if (game.score <= 0) {
        game.endGame();
      } else {
        game.score -= 20;
        document.getElementById("score").innerText = game.score;
      }
      //game.gameIsOver = true;
    } else if (this == currentLaurieTile) {
      document.getElementById("score").innerText = `Game Over: ${game.score}`;
      //game.gameIsOver = true;
      game.endGame();
      document.getElementById("finalscore").innerText = `Score: ${game.score}`;
    }
  }

  //Allow next level button to reload game screen with +1 level
  nextLevelButton.addEventListener("click", function () {
    game.level++;
    game.disappearSpeed -= 100;
    // Call the restartGame function when the button is clicked
    restartLevel();
  });

  //Allow restart button to reload game
  restartButton.addEventListener("click", function () {
    // Call the restartGame function when the button is clicked
    restartGame();
  });

  // The function that reloads the page to start a new game
  function restartGame() {
    location.reload();
  }
};
