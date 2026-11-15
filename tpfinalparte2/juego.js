class Juego {
  constructor(fondoInstrucciones, fondoJuego, fondoFinal, antorcha1, antorcha2, imagenRey, musicaFondo, sonidoMechero) {
    this.fondoInstrucciones = fondoInstrucciones;
    this.fondoJuego = fondoJuego;
    this.fondoFinal = fondoFinal;
    this.musicaFondo = musicaFondo;

    this.botonIniciar = new Boton(310, 305, 180, 45, "INICIAR");
    this.botonContinuar = new Boton(310, 260, 180, 45, "CONTINUAR");
    this.botonReiniciar = new Boton(310, 240, 180, 45, "VOLVER A JUGAR");
    this.botonCreditos = new Boton(310, 300, 180, 45, "CRÉDITOS");
    this.botonVolver = new Boton(310, 325, 180, 45, "VOLVER");

    this.antorchas = [];
    let posX = [28, 120, 215, 310, 400, 495, 588, 680, 772];
    let posY = 165;

    for (let i = 0; i < 9; i++) {
      this.antorchas[i] = new Antorcha(
        posX[i] - 30,
        posY - 55,
        60,
        90,
        antorcha1,
        antorcha2
      );
    }

    // controlo la secuencia y al personaje
    this.secuencia = new Secuencia(this.antorchas, sonidoMechero);
    this.arthur = new Arthur(imagenRey);

    this.pantalla = 0; 
    this.posCreditosY = -120;
  }

  // maquina de estados
  dibujar() {
    if (this.pantalla == 0) {
      image(this.fondoInstrucciones, 0, 0, width, height);
      this.pantallaInicio();
      this.botonIniciar.dibujar();
    }   else if (this.pantalla == 1) {
     if (this.secuencia.fase == "nivelSuperado") {
        image(this.fondoInstrucciones, 0, 0, width, height);
        this.pantallaNivel();
       this.botonContinuar.dibujar();
      } else if (this.secuencia.fase == "ganado") {
        image(this.fondoFinal, 0, 0, width, height);
        this.pantallaFinal();
        this.botonReiniciar.dibujar();
        this.botonCreditos.dibujar();
      }   else {
      
        image(this.fondoJuego, 0, 0, width, height);

        this.secuencia.actualizar();

        // dibujo las 9 antorchas
        for (let i = 0; i < this.antorchas.length; i++) {
          this.antorchas[i].dibujar();
        }

        // si completo bien  la secuencia el rey avanza
        if (this.secuencia.fase == "caminando" && this.arthur.caminando == false) {
          this.arthur.iniciarCaminata();
        }

        this.arthur.actualizar();
        this.arthur.dibujar();
         
         //si el rey sale de la `pantalla pasa de nivel, si es nivel 3 gana
        if (this.secuencia.fase == "caminando" && this.arthur.salioDePantalla()) {
          if (this.secuencia.nivel < 3) {
            this.secuencia.fase = "nivelSuperado";
          } else {
            this.secuencia.fase = "ganado";
          }
        }

        this.textoJuego();

        if (this.secuencia.fase == "perdido") {
          this.botonReiniciar.dibujar();
        }
      }
    } else if (this.pantalla == 2) {
      this.pantallaCreditos();
    }
  }

    
    
 pantallaCreditos() {
    background(0);

    if (this.posCreditosY < 135) {
      this.posCreditosY = this.posCreditosY + 3;
    }

    push();
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(20);
    text("AUTORES: Valentin Mauregui y Rocco Juzwa", width / 2, this.posCreditosY);
    text("PROGRAMADORES: Valentin Mauregui y Rocco Juzwa", width / 2, this.posCreditosY + 45);
    text("COMISION: 4", width / 2, this.posCreditosY + 90);
    pop();

    if (this.posCreditosY >= 135) {
      this.botonVolver.dibujar();
    }
  }
 
  pantallaFinal() {
    push();
    textAlign(CENTER, CENTER);
    textSize(28);

    fill(15, 15, 25, 210);
    text("¡Felicidades! Completaste el desafio", width / 2 + 2, 52);

    fill(255, 215, 90);
    text("¡Felicidades! Completaste el desafio", width / 2, 50);
    pop();
  }

  // escena entre niveles
  pantallaNivel() {
    push();
    textAlign(CENTER, CENTER);
    fill(240, 190, 70);
    textSize(26);
    text("¡MUY BIEN!", width / 2, 105);

    fill(235);
    textSize(18);
    text("Superaste el nivel " + this.secuencia.nivel + " y avanzas por el pasillo.", width / 2, 155);
    text("Preparate para memorizar " + (this.secuencia.nivel + 3) + " antorchas.", width / 2, 188);
    pop();
  }

  // muestra en q nivel esta
  textoJuego() {
    push();
    textAlign(CENTER, CENTER);
    fill(240, 190, 70);
    textSize(18);
    text("NIVEL " + this.secuencia.nivel + " / 3", width / 2, 18);

    fill(255);
    textSize(16);
    if (this.secuencia.fase == "mostrando") {
      text("Observa la secuencia...", width / 2, 44);
    } else if (this.secuencia.fase == "turnoJugador") {
      text("¡Tu turno! Repeti el orden (" + this.secuencia.paso + "/" + this.secuencia.orden.length + ")", width / 2, 44);
    } else if (this.secuencia.fase == "caminando") {
      text("¡Bien! Avanzando...", width / 2, 44);
    } else if (this.secuencia.fase == "perdido") {
      fill(240, 90, 90);
      textSize(24);
      text("¡Te equivocaste de antorcha!", width / 2, 190);
    }
    pop();
  }


  pantallaInicio() {
    push();
    fill(240, 190, 70);
    textAlign(CENTER, CENTER);
    textSize(24);
    text("EL PASILLO DE LAS ANTORCHAS", width / 2, 70);

    fill(235);
    textSize(16);
    text("Observa atentamente el orden en que se encienden las antorchas", width / 2, 130);
    text("y hace clic sobre ellas en la misma secuencia para avanzar.", width / 2, 155);
    text("Supera los 3 niveles (3, 4 y 5 antorchas) para cruzar el pasillo.", width / 2, 195);
    text("Si te equivocas en una antorcha, perdes.", width / 2, 220);
    pop();
  }

  // detecta clics en botones y antorchas segun en q pantalla este
  mousePressed(mouseX, mouseY) {
    if (this.pantalla == 0) {
     if (this.botonIniciar.clickBoton(mouseX, mouseY)) {
        if (this.musicaFondo && this.musicaFondo.isPlaying() == false) {
          this.musicaFondo.loop();
        }
        this.pantalla = 1;
        this.arthur.reiniciar();
        this.secuencia.iniciarNivel(1);
      }
    } else if (this.pantalla == 1) {
      if (this.secuencia.fase == "turnoJugador") {
        this.secuencia.revisarClick(mouseX, mouseY);
      }else if (this.secuencia.fase == "nivelSuperado") {
        if (this.botonContinuar.clickBoton(mouseX, mouseY)) {
          this.arthur.reiniciar();
          this.secuencia.iniciarNivel(this.secuencia.nivel + 1);
        }
      } else if (this.secuencia.fase == "ganado") {
        if (this.botonReiniciar.clickBoton(mouseX, mouseY)) {
          this.arthur.reiniciar();
          this.secuencia.iniciarNivel(1);
        }else if (this.botonCreditos.clickBoton(mouseX, mouseY)) {
          this.posCreditosY = -120;
          this.pantalla = 2;
        }
      } else if (this.secuencia.fase == "perdido") {
        if (this.botonReiniciar.clickBoton(mouseX, mouseY)) {
          this.arthur.reiniciar();
          this.secuencia.iniciarNivel(1);
       }
      }
    } else if (this.pantalla == 2) {
      if (this.posCreditosY >= 135 && this.botonVolver.clickBoton(mouseX, mouseY)) {
        this.pantalla = 0;
      }
    }
  }
}
