
//https://www.youtube.com/watch?v=Vl-ha7WY3TU

let fondoInstrucciones;
let fondoJuego;
let fondoFinal;
let antorcha1;
let antorcha2;
let imagenRey = [];
let musicaFondo;
let sonidoMechero;

let juego;

function preload() {
  fondoInstrucciones = loadImage("data/fondoinstrucciones.png");
  fondoJuego = loadImage("data/fondo.png");
  fondoFinal = loadImage("data/fondofinal.png");
  antorcha1 = loadImage("data/antorcha1.png");
  antorcha2 = loadImage("data/antorcha2.png");

  for (let i = 0; i < 8; i++) {
    imagenRey[i] = loadImage("data/rey" + (i + 1) + ".png");
  }

 
  musicaFondo = loadSound("data/musica.mp3");
  sonidoMechero = loadSound("data/mechero.mp3");
}

function setup() {
  createCanvas(800, 400);
  musicaFondo.setVolume(0.01);
  sonidoMechero.setVolume(0.02);

juego = new Juego(
fondoInstrucciones,
    fondoJuego,
    fondoFinal,
    antorcha1,
    antorcha2,
    imagenRey,
    musicaFondo,
    sonidoMechero
  );
}

function draw() {
  juego.dibujar();
}

function mousePressed() {
  juego.mousePressed(mouseX, mouseY);
}
