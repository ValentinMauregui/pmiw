class Boton {
  constructor(x, y, width, height, texto) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.texto = texto;
  }

  dibujar() {
    push();
    
    //mouse encima cambia color
    if (this.clickBoton(mouseX, mouseY)) {
      fill(205, 165, 85);
      stroke(255, 225, 130);
    } else {
      fill(40, 32, 24, 225);
      stroke(205, 165, 85);
    }
    strokeWeight(2);
    rect(this.x, this.y, this.width, this.height, 8);

    if (this.clickBoton(mouseX, mouseY)) {
      fill(25);
    } else {
      fill(245);
    }
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    //centra el texto
    text(this.texto, this.x + this.width / 2, this.y + this.height / 2);
    pop();
  }


  clickBoton(mouseX, mouseY) {
    return mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height;
  }
}
