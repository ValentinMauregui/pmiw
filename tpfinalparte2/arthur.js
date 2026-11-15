class Arthur {
  constructor(imagenRey) {
    this.imagenRey = imagenRey;
    this.x = 35;
    this.y = 255;
    this.width = 75;
    this.height = 105;
    this.velocidad = 4;
    this.caminando = false; // rey quieto hasta que se acierte la secuencia
    this.imagenActual = 0;
  }

  // vuelve al rey al principio para el siguiente nivel
  reiniciar() {
    this.x = 35;
    this.y = 255;
    this.caminando = false;
    this.imagenActual = 0;
  }

  // se activa cuando pasa de nivel
  iniciarCaminata() {
    this.caminando = true;
    this.imagenActual = 1;
  }

  actualizar() {
    if (this.caminando == true) {
      this.x = this.x + this.velocidad;

      
      if (frameCount % 6 == 0) {
        this.imagenActual = this.imagenActual + 1;
        
        if (this.imagenActual >= this.imagenRey.length) {
          this.imagenActual = 1;
        }
      }
    }
  }

  dibujar() {
    image(this.imagenRey[this.imagenActual], this.x, this.y, this.width, this.height);
  }

  // detecta su el rey salio de la pantalla
  salioDePantalla() {
    if (this.x > width) {
      return true;
    } else {
      return false;
    }
  }
}
