class Mole {
  constructor(gameScreen, src) {
    this.gameScreen = gameScreen;
    this.mole = document.createElement("img");
    this.mole.src = src;
    this.width = 100;
    this.height = 100;
    this.mole.style.width = `${this.width}px`;
    this.mole.style.height = `${this.height}px`;
    //this.gameScreen.appendChild(this.mole);
  }
}
