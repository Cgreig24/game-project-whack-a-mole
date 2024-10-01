let currentMoleTile;
let currentGoodieTile;
let score = 0;
let gameOver = false;

window.onload = function () {
  setGame();
};

let logo = document.createElement("img");
logo.src = "../images/Halloween_logo.png";
//logo.addClassList("logo");
logo.classList.add("logo");
document.body.prepend(logo);

function setGame() {
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
  if (gameOver) {
    return;
  }
  if (currentMoleTile) {
    currentMoleTile.innerHTML = "";
  }
  let mole = document.createElement("img");
  mole.src = "../images/Mike Myers 2.png";

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
  if (gameOver) {
    return;
  }

  if (currentGoodieTile) {
    currentGoodieTile.innerHTML = "";
  }

  let goodie = document.createElement("img");
  goodie.src = "../images/Jack O Lantern.png";

  let num = getRandomTile();

  //if the jack o lantern is already there, return instead of adding image on top
  if (currentMoleTile && currentMoleTile.id == num) {
    return;
  }

  currentGoodieTile = document.getElementById(num);
  currentGoodieTile.appendChild(goodie);
}

function selectTile() {
  if (gameOver) {
    return;
  }
  if (this == currentMoleTile) {
    score += 10;
    //this links back to the html file which display score at the top
    document.getElementById("score").innerText = score.toString();
  } else if (this == currentGoodieTile) {
    document.getElementById("score").innerText = `Game Over: ${score}`;
    gameOver = true;
  }
}
