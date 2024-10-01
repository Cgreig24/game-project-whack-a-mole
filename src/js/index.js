window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");

  let game;

  let currentMoleTile;
  let currentGoodieTile;
  //let score = 0;
  //let gameOver = false;

  startButton.addEventListener("click", function () {
    setGame();
  });

  //  setGame();

  let logo = document.createElement("img");
  logo.src = "src/assets/images/Halloween_logo.png";
  //logo.addClassList("logo");
  logo.classList.add("logo");
  document.getElementById("game-screen").prepend(logo);

  function setGame() {
    game = new Game();
    game.start();
    for (let i = 0; i < 9; i++) {
      let tile = document.createElement("div");
      tile.id = i.toString();
      tile.addEventListener("click", selectTile);
      document.getElementById("board").appendChild(tile);
    }

    //call mole every 2 seconds
    setInterval(setMoleLocation, 2000);

    //call additional character every 3 seconds
    setInterval(setGoodieLocation, 3000);
  }

  function getRandomTile() {
    //get random number for tile
    let num = Math.floor(Math.random() * 9);
    return num.toString();
  }

  //Sets image of mike myers as mole
  //Selects one of the 9 tiles at random to append this image to
  function setMoleLocation() {
    if (game.gameIsOver) {
      return;
    }
    if (currentMoleTile) {
      currentMoleTile.innerHTML = "";
    }
    let mole = document.createElement("img");
    mole.src = "src/assets/images/Mike Myers 2.png";

    //random title location for mole
    let num = getRandomTile();

    //if the jack o lantern is already there, return instead of adding image on top
    if (currentGoodieTile && currentGoodieTile.id == num) {
      return;
    }

    currentMoleTile = document.getElementById(num);
    currentMoleTile.appendChild(mole);
  }

  //Sets image of Jack O Lantern as non dangerous character
  //Selects one of the 9 tiles at random to append this image to

  function setGoodieLocation() {
    if (game.gameIsOver) {
      return;
    }

    if (currentGoodieTile) {
      currentGoodieTile.innerHTML = "";
    }

    let goodie = document.createElement("img");
    goodie.src = "src/assets/images/Jack O Lantern.png";

    let num = getRandomTile();

    //if the jack o lantern is already there, return instead of adding image on top
    if (currentMoleTile && currentMoleTile.id == num) {
      return;
    }

    currentGoodieTile = document.getElementById(num);
    currentGoodieTile.appendChild(goodie);
  }

  function selectTile() {
    if (game.gameIsOver) {
      return;
    }
    if (this == currentMoleTile) {
      game.score += 10;
      //this links back to the html file which display score at the top
      //document.getElementById("score").innerText = this.score.toString();
      document.getElementById("score").innerText = game.score;
    } else if (this == currentGoodieTile) {
      document.getElementById("score").innerText = `Game Over: ${game.score}`;
      //game.gameIsOver = true;
      game.endGame();
      document.getElementById("finalscore").innerText = `Score: ${game.score}`;
    }
  }

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
