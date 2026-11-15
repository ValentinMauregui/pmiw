class Secuencia {
  constructor(antorchas, sonidoMechero) {
    this.antorchas = antorchas;
    this.sonidoMechero = sonidoMechero;
    this.nivel = 1;
    this.orden = []; // secuencia de las antorchas
    this.indice = 0; // antorcha q  muestra la maquina en la secuencia
    this.paso = 0;   //revisa las antorchas clickeadas
    this.fase = "mostrando";
    this.tiempo = 0; 
    this.prendida = false; 
  }
  
  iniciarNivel(nivel) {
    this.nivel = nivel;
    this.indice = 0;
    this.paso = 0;
    this.fase = "mostrando";
    this.prendida = false;
    this.tiempo = frameCount;
    this.apagar();

    if (this.nivel == 1) {
      this.orden = [1, 4, 7];
    } else if (this.nivel == 2) {
      this.orden = [0, 3, 6, 2];
    } else if (this.nivel == 3) {
      this.orden = [4, 1, 7, 2, 8];
    }
  }

  //deja las 9 antorchas apagadas
  apagar() {
    for (let i = 0; i < this.antorchas.length; i++) {
      this.antorchas[i].prendida = false;
    }
  }

  // prende solo las antorchas acertadas de la secuencia
  prenderTodas() {
    this.apagar();
    for (let i = 0; i < this.orden.length; i++) {
      let numAntorcha = this.orden[i];
      this.antorchas[numAntorcha].prendida = true;
    }
  }

  actualizar() {
    if (this.fase == "mostrando") {
      if (this.prendida == false) {
        
        // tiempo de cada antorcha encendida en la secuencia
        if (frameCount - this.tiempo > 45) {
          if (this.indice < this.orden.length) {
            let numAntorcha = this.orden[this.indice];
            this.antorchas[numAntorcha].prendida = true;
            this.prendida = true;
            this.tiempo = frameCount;
          } else {
            
            this.fase = "turnoJugador";
            this.paso = 0;
          }
        }
      } else {
        if (frameCount - this.tiempo > 75) {
          this.apagar();
          this.prendida = false;
          this.indice = this.indice + 1;
          this.tiempo = frameCount;
        }
      }
    } else if (this.fase == "turnoJugador") {
      if (this.prendida == true && frameCount - this.tiempo > 20) {
        this.apagar();
        this.prendida = false;
      }
    }
  }

  // comprueba la secuencia que clickeo el jugador
  revisarClick(mouseX, mouseY) {
    if (this.fase != "turnoJugador") {
      return;
    }

    for (let i = 0; i < this.antorchas.length; i++) {
      if (this.antorchas[i].clickAntorcha(mouseX, mouseY)) {
        if (this.sonidoMechero) {
          this.sonidoMechero.play();
        }

        this.apagar();
        this.antorchas[i].prendida = true;
        this.prendida = true;
        this.tiempo = frameCount;

        if (i == this.orden[this.paso]) {
          this.paso = this.paso + 1;
          // si se hizo bien la secuencia las antorchas clickeadas se prenden y el rey avanza
          if (this.paso >= this.orden.length) {
            this.prenderTodas();
            this.fase = "caminando";
          }
        } else {
          this.apagar();
          this.fase = "perdido";
        }
        break;
      }
    }
  }
}
