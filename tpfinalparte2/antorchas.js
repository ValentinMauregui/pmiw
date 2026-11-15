class Antorcha {
  constructor(x, y, width, height, antorcha1, antorcha2) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.antorcha1 = antorcha1;
    this.antorcha2 = antorcha2;
    this.prendida = false;
  }
//dibuja antorcha prendida si es true y apagada si es false
  dibujar() {
    if (this.prendida) {
      image(this.antorcha2, this.x, this.y, this.width, this.height);
    } else {
      image(this.antorcha1, this.x, this.y, this.width, this.height);
    }
  }
//se fija si hice clic dentro de esta antorcha (avisa true o false a secuencia)
  clickAntorcha(mouseX, mouseY) {
    return mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height;
  }
}
