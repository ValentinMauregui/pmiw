let fondo;
let logoOnePiece;

let correr = [];
let pegar = [];
let salto = [];
let ataque = [];
let impacto = [];

let estado = "correr";

let frameCorrer = 0;
let framePegar = 0;
let frameSalto = 0;
let frameAtaque = 0;
let frameImpacto = 0;

let tiempoAnterior = 0;

let velocidadCorrer = 90;
let velocidadPegar = 180;
let velocidadSalto = 150;
let velocidadAtaque = 130;
let velocidadImpacto = 200;

let xSabo = -180;
let ySabo = 270;

let velocidadMovimiento = 4;

let mostrarLogo = false;

let xLogo = 220;
let yLogo = -180;
let yLogoFinal = 180;

let velocidadLogo = 6;

function preload() {
  fondo = loadImage("data/fondo0.jpg");
  logoOnePiece = loadImage("data/onepiece0.png");

  for (let i = 0; i < 5; i++) {
    correr[i] = loadImage("data/sabospritecorre" + i + ".png");
  }

  for (let i = 0; i < 4; i++) {
    pegar[i] = loadImage("data/sabopega" + i + ".png");
  }

  for (let i = 0; i < 5; i++) {
    salto[i] = loadImage("data/sabosalto" + i + ".png");
  }

  for (let i = 0; i < 5; i++) {
    ataque[i] = loadImage("data/saboataque" + i + ".png");
  }

  for (let i = 0; i < 2; i++) {
    impacto[i] = loadImage("data/saboimpacto" + i + ".png");
  }
}

function setup() {
  createCanvas(800, 600);
  tiempoAnterior = millis();
}

function draw() {
  dibujarFondoAdaptado(fondo);

  if (estado == "correr") {
    xSabo = xSabo + velocidadMovimiento;

    actualizarCorrer();

    dibujarAnimacion(correr, frameCorrer, xSabo, ySabo, 190, 190);

    if (xSabo >= 330) {
      estado = "pegar";

      framePegar = 0;

      xSabo = 330;

      tiempoAnterior = millis();
    }
  }

  else if (estado == "pegar") {
    dibujarAnimacion(pegar, framePegar, xSabo, ySabo, 220, 220);

    if (millis() - tiempoAnterior > velocidadPegar) {
      framePegar = framePegar + 1;
      tiempoAnterior = millis();

      if (terminoAnimacion(framePegar, pegar.length)) {
        framePegar = 0;
        frameSalto = 0;

        estado = "salto";

        tiempoAnterior = millis();
      }
    }
  }

  else if (estado == "salto") {
    let alturaSalto = calcularAlturaSalto(frameSalto);

    dibujarAnimacion(
      salto,
      frameSalto,
      xSabo,
      ySabo - alturaSalto,
      230,
      230
    );

    if (millis() - tiempoAnterior > velocidadSalto) {
      frameSalto = frameSalto + 1;
      tiempoAnterior = millis();

      if (terminoAnimacion(frameSalto, salto.length)) {
        frameSalto = 0;
        frameAtaque = 0;

        estado = "ataque";

        tiempoAnterior = millis();
      }
    }
  }

  else if (estado == "ataque") {
    dibujarAnimacion(
      ataque,
      frameAtaque,
      xSabo,
      ySabo - 100,
      240,
      240
    );

    if (millis() - tiempoAnterior > velocidadAtaque) {
      frameAtaque = frameAtaque + 1;
      tiempoAnterior = millis();

      if (terminoAnimacion(frameAtaque, ataque.length)) {
        frameAtaque = 0;
        frameImpacto = 0;

        estado = "impacto";

        tiempoAnterior = millis();
      }
    }
  }

  else if (estado == "impacto") {
    dibujarAnimacion(
      impacto,
      frameImpacto,
      xSabo,
      ySabo,
      250,
      250
    );

    if (millis() - tiempoAnterior > velocidadImpacto) {
      frameImpacto = frameImpacto + 1;
      tiempoAnterior = millis();

      if (terminoAnimacion(frameImpacto, impacto.length)) {
        frameImpacto = 0;
        frameCorrer = 0;

        mostrarLogo = true;

        xLogo = 220;
        yLogo = -180;

        estado = "salida";

        tiempoAnterior = millis();
      }
    }
  }

  else if (estado == "salida") {
    xSabo = xSabo + velocidadMovimiento;

    actualizarCorrer();

    dibujarAnimacion(
      correr,
      frameCorrer,
      xSabo,
      ySabo,
      190,
      190
    );

    if (xSabo > width) {
      estado = "final";
    }
  }

  else if (estado == "final") {
    dibujarCartelReiniciar();
  }

  if (mostrarLogo) {
    image(logoOnePiece, xLogo, yLogo, 360, 160);

    if (yLogo < yLogoFinal) {
      yLogo = yLogo + velocidadLogo;
    }

    if (yLogo >= yLogoFinal) {
      yLogo = yLogoFinal;
    }
  }
}

function actualizarCorrer() {
  if (millis() - tiempoAnterior > velocidadCorrer) {
    frameCorrer = frameCorrer + 1;

    if (frameCorrer >= correr.length) {
      frameCorrer = 0;
    }

    tiempoAnterior = millis();
  }
}

function dibujarFondoAdaptado(img) {
  let escala = max(width / img.width, height / img.height);

  let nuevoAncho = img.width * escala;
  let nuevoAlto = img.height * escala;

  let x = (width - nuevoAncho) / 2;
  let y = (height - nuevoAlto) / 2 + 80;

  image(img, x, y, nuevoAncho, nuevoAlto);
}

function dibujarAnimacion(animacion, frame, x, y, ancho, alto) {
  image(animacion[frame], x, y, ancho, alto);
}

function terminoAnimacion(frame, cantidadFrames) {
  if (frame >= cantidadFrames) {
    return true;
  } else {
    return false;
  }
}

function calcularAlturaSalto(frame) {
  if (frame == 0) {
    return 0;
  } else if (frame == 1) {
    return 90;
  } else if (frame == 2) {
    return 170;
  } else if (frame == 3) {
    return 120;
  } else {
    return 60;
  }
}

function dibujarCartelReiniciar() {
  rectMode(CENTER);

  stroke(35, 20, 10);
  strokeWeight(7);

  fill(230, 190, 100);
  rect(width / 2, 520, 380, 80, 15);

  stroke(170, 20, 20);
  strokeWeight(4);

  noFill();
  rect(width / 2, 520, 360, 62, 12);

  noStroke();

  fill(25);

  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(25);

  text("PRESIONA R PARA REINICIAR", width / 2, 520);

  textStyle(NORMAL);
}

function keyPressed() {
  if (key == "r" || key == "R") {
    estado = "correr";

    frameCorrer = 0;
    framePegar = 0;
    frameSalto = 0;
    frameAtaque = 0;
    frameImpacto = 0;

    xSabo = -180;

    mostrarLogo = false;

    xLogo = 220;
    yLogo = -180;

    tiempoAnterior = millis();
  }
}
