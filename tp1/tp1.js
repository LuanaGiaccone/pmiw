//VARIBLES DE PANTALLA INICIO
let fondoIni;
let fondoRen;
let fondoTit;
let posTitY;
let posRenX;
let contadorPantInicio;
let marcaDeTiempo;
let velTitY;
let colorBot;
let colorMar;
let estado = 0;

//VARIABLES DE FADE
let degNeg = 0;

//VARIABLES DE VIDEO
let contadorVideo;
let fondo = [];
let despA = 0;
let despB = 0;
let despC = 0;
let despD = 0;
let velA = 12;
let velB = 60;
let velC = 180;
let velD = 180;
let idle = [];
let run = [];
let jump = [];
let frameActual; 
let mov = 0;
let velAnim = 9;
let accion;
let posXSprite = 400;
let posYSprite = 396;
let degBl = 255;


function preload () {
  fondoIni = loadImage ("assets/PantIniFond.png");
  fondoRen = loadImage ("assets/PantIniSub.png");
  fondoTit = loadImage ("assets/PantIniTit.png");

  for (let i=0; i<4; i++) {
    fondo [i] = loadImage ("assets/Fondo" +i+ ".png");
  }
  for (let i=0; i<10; i++) {
    idle [i] = loadImage ("assets/IDLE" +i+ ".png");
  }
  for (let i=0; i<10; i++) {
    jump [i] = loadImage ("assets/JUMP" +i+ ".png");
  }
  for (let i=0; i<10; i++) {
    run [i] = loadImage ("assets/RUN" +i+ ".png");
  }
}

function setup() {
  createCanvas(800, 600);
  textFont("Franklin Gothic Cond Medium");
  contadorPantInicio = 0;
  marcaDeTiempo =0;
  posTitY=-260;
  velTitY = -1;
  posRenX = 801;
  colorBot = color (41, 105, 56);
  colorMar = color (99, 188, 120);
  accion = idle; 
  frameActual = mov;
}


function draw() {
  background(225);
  if (estado === 0 ) {
    PantallaInicio ();
  }
  if (estado === 1) {
    PantallaInicio ()
      fade ();
  }
  if (estado === 2) {
    video ();
  }
}

//PANTALLA INICIO
function PantallaInicio () {
  contadorPantInicio= frameCount - marcaDeTiempo;
  background (0);
  image (fondoIni, 0, 0);
  image (fondoTit, 0, posTitY);
  image (fondoRen, posRenX, 0);
  dibujarBoton (304, 472, 208, 84, "Iniciar");


  if (contadorPantInicio > 35  && contadorPantInicio <= 175 && posTitY < 0) {
    posTitY +=2;
  } else if (contadorPantInicio > 175) {
    posTitY += velTitY;

    if (posTitY >= 7) {
      velTitY = -0.2;
    }
    if (posTitY <= -7) {
      velTitY = 0.2;
    }
  }
  if (contadorPantInicio > 180 && posRenX > 0) {
    posRenX -=4;
  }
}
function dibujarBoton (x, y, tamX, tamY, texto) {
  if (areaBot(x, y, tamX, tamY)) {
    colorBot = color (193, 245, 204);
    colorMar = color (194, 232, 203);
    if (mouseIsPressed && estado == 0) {
      estado = 1;
    }
  } else {
    colorBot = color ( 41, 105, 56);
    colorMar = color (99, 188, 120);
  }
  fill (colorBot);
  noStroke ();
  rect(x, y, tamX, tamY, tamY/4 );

  noFill();
  stroke ( colorMar);
  strokeWeight (4);
  rect(x -4, y -4, tamX +10, tamY +10, tamY/4);

  noStroke ();
  fill (255);
  textSize (45);
  textAlign (CENTER, CENTER)
    text(texto, x + tamX/2, y + tamY/2);
}

function areaBot(x, y, tamX, tamY) {
  if (mouseX > x && mouseX < x + tamX && mouseY > y && mouseY < y + tamY) {
    return true;
  } else {
    return false;
  }
}

//PANTALLA FADE
function fade() {
  fill(0, 0, 0, degNeg);
  noStroke();
  rect(0, 0, width, height);

  degNeg += 5;

  if (degNeg >= 255) {
    estado = 2;
    marcaDeTiempo = frameCount;
  }
}

//PANTALLA VIDEO
function video() {
  contadorVideo=frameCount-marcaDeTiempo;
  background (0);

  image(fondo[0], despA, 0, 1600, height );
  image(fondo[0], despA+1600, 0, 1600, height );
  if (despA <= -1600) {
    despA += 1600;
  }
  image(fondo[1], despB, 0, 1600, height );
  image(fondo[1], despB+1600, 0, 1600, height );
  if (despB <= -1600) {
    despB += 1600;
  }
  image(fondo[2], despC, 0, 1600, height );
  image(fondo[2], despC+1600, 0, 1600, height );
  if (despC <= -1600) {
    despC += 1600;
  }
  
  image (accion [mov], posXSprite, posYSprite, 130, 130);

  image(fondo[3], despD, 0, 1600, height );
  image(fondo[3], despD+ 1600, 0, 1600, height );
  if (despD <= -1600) {
    despD += 1600;
  }

  if (frameCount%velAnim===0) {
    mov ++;
  }
  if (mov >=9) {
    mov=0; 
  }

  if (contadorVideo > 65 && contadorVideo < 620 ) {
    let dt = deltaTime / 1000;
    despA -= velA * dt;
    despB -= velB * dt; 
    despC -= velC * dt;
    despD -= velD * dt;
  }

  if (contadorVideo <= 65) {
    accion =idle;
    velAnim = 9;
  } else if (contadorVideo > 240 && contadorVideo < 280 || contadorVideo > 410 && contadorVideo  < 450 || contadorVideo > 520 && contadorVideo < 560) {
    if (contadorVideo === 241 || contadorVideo === 411 || contadorVideo === 521) {
      mov = 0;
    }
    accion = jump;
    velAnim =6;

    if (contadorVideo > 240 && contadorVideo <=260 || contadorVideo > 410 && contadorVideo <= 430 || contadorVideo > 520 && contadorVideo <= 540) {
      posYSprite -= 4;
    } else {
      posYSprite += 4;
    }
  } else {
    if (accion === jump) {
      mov = 0;
    }
    accion = run;
    velAnim = 4;
    posYSprite = 396;
  }

if (contadorVideo >= 620) {
  accion =idle;
  velAnim = 9;
}
if (contadorVideo > 680) {
  dibujarBoton (247, 50, 200, 70, "Reiniciar");
}
if (degBl > 0) {
  fill(255, 255, 255, degBl);
  noStroke();
  rect(0, 0, width, height);
  degBl -= 4;
}

if ( mouseIsPressed && estado === 2 && contadorVideo >= 620) {
  if (areaBot(247, 50, 200, 70)) {
    despA = 0;
    despB = 0;
    despC = 0;
    despD = 0;
    posYSprite = 396;
    mov = 0;
    accion = idle;
    marcaDeTiempo = frameCount;
    degBl = 255;
  }
}
}

//IMPRIMIR MOUSE
//function mousePressed() {
//console.log("X: " + mouseX + ", Y: " + mouseY);
//}
