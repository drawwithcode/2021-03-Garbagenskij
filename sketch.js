// DICHIARO TUTTE LE VARIABILI

//Variabili di layout
let k = 30;

//Variabili oggetti a schermo
let myBigMac;
let myDollar;
let myCent;
let myTenCents;

let HowManyBigMac;
let HowMuchChange;
let HowManyDollar;
let HowManyTenCents;
let HowManyCents;

// CREO LE TRE CLASSI
// (1) Classe big mac da mostrare a schermo
class BigMac {
  constructor(temp_x, temp_y) {
    this.x = temp_x;
    this.y = temp_y;
  }
  display() {
    push();
    imageMode(CENTER);
    image(myBigMac, this.x, this.y, 200, 200);
    pop();
  }
  move() {
    this.x += random(-5, +5);
    this.y += random(-5, +5);
  }
  run() {
    this.move();
    this.display();
  }
}

// (2) Classe dollari da mostrare schermo
class Dollars {
  constructor(temp_x, temp_y) {
    this.x = temp_x;
    this.y = temp_y;
  }
  display() {
    push();
    imageMode(CENTER);
    image(myDollar, this.x, this.y, 200, 200);
    pop();
  }
  move() {
    this.x += random(-5, +5);
    this.y += random(-5, +5);
  }
  run() {
    this.move();
    this.display();
  }
}

//(3) Classe tencents da mostrare a schermo
class TenCents {
  constructor(temp_x, temp_y) {
    this.x = temp_x;
    this.y = temp_y;
  }
  display() {
    push();
    imageMode(CENTER);
    image(myTenCents, this.x, this.y, 80, 80);
    pop();
  }
  move() {
    this.x += random(-5, +5);
    this.y += random(-5, +5);
  }
  run() {
    this.move();
    this.display();
  }
}

//CREO EMPTY ARRAY
// In questi Array vanno i numeri di Dollari/Panini/Cents specifico per annata...
//... da mostrare a schermo. Corrisponde, circa, a bubblesNum dell'es fatto in classe
let numeroDollari = [];
let numeroPanini = [];
let numeroTenCents = [];

// Array degli oggetti effettivamente a schermo
let myBigMacArray = [];
let myDollarsArray = [];
let myTenCentsArray = [];

function preload() {
  //Carico le canzoni nelle variabili
  mySong86 = loadSound("./assets/audio/1986.mp3");
  mySong90 = loadSound("./assets/audio/1990.mp3");
  mySong95 = loadSound("./assets/audio/1995.mp3");
  mySong00 = loadSound("./assets/audio/2000.mp3");
  mySong05 = loadSound("./assets/audio/2005.mp3");
  mySong10 = loadSound("./assets/audio/2010.mp3");
  mySong15 = loadSound("./assets/audio/2015.mp3");
  mySong20 = loadSound("./assets/audio/2020.mp3");

  //Carico i dati nelle variabili
  data = loadJSON("./assets/data/big-mac-source-data-tot.json");

  //Carico le immagini nelle variabili
  myBigMac = loadImage("./assets/images/BigMac.png");
  myDollar = loadImage("./assets/images/WrinkledDollar.png");
  myTenCents = loadImage("./assets/images/oneDime.png");
  myCent = loadImage("./assets/images/OneCent.png");
}

//Questa è una funzione per calcolare, dato il prezzo, quanti panini mostrare a schermo
function CalculateHowManyBigMac(PRICE) {
  HowManyBigMac = floor(10 / PRICE);
  HowMuchChange = round(10 - HowManyBigMac * PRICE, 2);
  HowManyDollar = floor(HowMuchChange);
  HowManyTenCents = floor((HowMuchChange - HowManyDollar) / 0.1);

  return HowManyBigMac;
}

// Questa è una funzione per calcolare, dato il prezzo, quanti dollari mostrare a schermo
function CalculateHowManyDollars(PRICE) {
  HowManyBigMac = floor(10 / PRICE);
  HowMuchChange = round(10 - HowManyBigMac * PRICE, 2);
  HowManyDollar = floor(HowMuchChange);
  HowManyTenCents = floor((HowMuchChange - HowManyDollar) / 0.1);

  return HowManyDollar;
}

// Questa è una funzione per calcolare, dato il prezzo, quanti TenCents mostrare a schermo
function CalculateHowManyTenCents(PRICE) {
  HowManyBigMac = floor(10 / PRICE);
  HowMuchChange = round(10 - HowManyBigMac * PRICE, 2);
  HowManyDollar = floor(HowMuchChange);
  HowManyTenCents = floor((HowMuchChange - HowManyDollar) / 0.1);

  return HowManyTenCents;
}

function setup() {
  createCanvas(1920, 1080);

  //RACCOLGO I DATI CHE MI SERVONO
  //Partendo da zero fin tanto che non "considero" tutti gli elementi del JSON...
  for (let i = 0; i < data.DataOfThatYear.length; i++) {
    //... butto dentro all'array di riferimento...
    //... il numero di panini/Dollari/TenCEnts specifici di quell'anno
    numeroPanini.push(
      CalculateHowManyBigMac(data.DataOfThatYear[i].local_price)
    );

    numeroDollari.push(
      CalculateHowManyDollars(data.DataOfThatYear[i].local_price)
    );

    numeroTenCents.push(
      CalculateHowManyTenCents(data.DataOfThatYear[i].local_price)
    );
  }
  // CREO E IMPARTISCO ORDINI AL PRIMO BOTTONI
  //Creo il Bottone (Styled direttamente nell'HTML)
  button86 = createButton("1986");
  button86.position((windowWidth / k) * 23, (windowWidth / k) * 1);
  //Se il bottone è premuto, esegui la funzione togglePlaying86
  button86.mousePressed(togglePlaying86);

  //Partendo da zero fin tanto che non "considero"...
  //...tutti i panini corrispondenti al primo elemento dell'Array ( e dunque del JSON)...
  for (let i = 0; i < numeroPanini[0]; i++) {
    // ...creo una nuova istanza...
    // ...in questo caso un nuovo panino realizzato con la classe BigMac, definita prima
    // dove a temp_x sostitisco un valore random tra 0 e windowWidth, e idem con temp_y
    let newBigMac = new BigMac(
      random(windowWidth / 6, (4 * windowWidth) / 6),
      random(windowHeight / 6, (5 * windowHeight) / 6)
    );
    //Lo aggiungo all'array dei panini a schermo
    myBigMacArray.push(newBigMac);
  }

  //ripeto per i dollari
  for (let j = 0; j < numeroDollari[0]; j++) {
    let newDollar = new Dollars(
      random(windowWidth / 6, (4 * windowWidth) / 6),
      random(windowHeight / 6, (5 * windowHeight) / 6)
    );
    myDollarsArray.push(newDollar);
  }

  // ripeto per i TenCents
  for (let j = 0; j < numeroTenCents[0]; j++) {
    let newTenCent = new TenCents(
      random(windowWidth / 6, (4 * windowWidth) / 6),
      random(windowHeight / 6, (5 * windowHeight) / 6)
    );
    myTenCentsArray.push(newTenCent);
  }
  //RIPETO PER IL SECONDO BOTTONE
  button90 = createButton("1990");
  button90.position((windowWidth / k) * 23, (windowWidth / k) * 3);
  button90.mousePressed(togglePlaying90);

  for (let i = 0; i < numeroPanini[1]; i++) {
    let newBigMac = new BigMac(
      random(windowWidth / 6, (4 * windowWidth) / 6),
      random(windowHeight / 6, (5 * windowHeight) / 6)
    );
    myBigMacArray.push(newBigMac);
  }

  for (let j = 0; j < numeroDollari[1]; j++) {
    let newDollar = new Dollars(
      random(windowWidth / 6, (4 * windowWidth) / 6),
      random(windowHeight / 6, (5 * windowHeight) / 6)
    );
    myDollarsArray.push(newDollar);
  }

  for (let j = 0; j < numeroTenCents[1]; j++) {
    let newTenCent = new TenCents(
      random(windowWidth / 6, (4 * windowWidth) / 6),
      random(windowHeight / 6, (5 * windowHeight) / 6)
    );
    myTenCentsArray.push(newTenCent);
  }

  //RIPETO PER IL TERZO BOTTONE
  button95 = createButton("1995");
  button95.position((windowWidth / k) * 23, (windowWidth / k) * 5);
  button95.mousePressed(togglePlaying95);

  for (let i = 0; i < numeroPanini[2]; i++) {
    let newBigMac = new BigMac(
      random(windowWidth / 6, (4 * windowWidth) / 6),
      random(windowHeight / 6, (5 * windowHeight) / 6)
    );
    myBigMacArray.push(newBigMac);
  }

  for (let j = 0; j < numeroDollari[2]; j++) {
    let newDollar = new Dollars(
      random(windowWidth / 6, (4 * windowWidth) / 6),
      random(windowHeight / 6, (5 * windowHeight) / 6)
    );
    myDollarsArray.push(newDollar);
  }

  for (let j = 0; j < numeroTenCents[2]; j++) {
    let newTenCent = new TenCents(
      random(windowWidth / 6, (4 * windowWidth) / 6),
      random(windowHeight / 6, (5 * windowHeight) / 6)
    );
    myTenCentsArray.push(newTenCent);
  }

  //RIPETO PER IL QUARTO BOTTONE
  button00 = createButton("2000");
  button00.position((windowWidth / k) * 23, (windowWidth / k) * 7);
  button00.mousePressed(togglePlaying00);

  for (let i = 0; i < numeroPanini[3]; i++) {
    let newBigMac = new BigMac(
      random(windowWidth / 6, (4 * windowWidth) / 6),
      random(windowHeight / 6, (5 * windowHeight) / 6)
    );
    myBigMacArray.push(newBigMac);
  }

  for (let j = 0; j < numeroDollari[3]; j++) {
    let newDollar = new Dollars(
      random(windowWidth / 6, (4 * windowWidth) / 6),
      random(windowHeight / 6, (5 * windowHeight) / 6)
    );
    myDollarsArray.push(newDollar);
  }

  for (let j = 0; j < numeroTenCents[3]; j++) {
    let newTenCent = new TenCents(
      random(windowWidth / 6, (4 * windowWidth) / 6),
      random(windowHeight / 6, (5 * windowHeight) / 6)
    );
    myTenCentsArray.push(newTenCent);
  }
  //RIPETO PER IL QUINTO BOTTONE
  button05 = createButton("2005");
  button05.position((windowWidth / k) * 23, (windowWidth / k) * 9);
  button05.mousePressed(togglePlaying05);

  for (let i = 0; i < numeroPanini[4]; i++) {
    let newBigMac = new BigMac(
      random(windowWidth / 6, (4 * windowWidth) / 6),
      random(windowHeight / 6, (5 * windowHeight) / 6)
    );
    myBigMacArray.push(newBigMac);
  }

  for (let j = 0; j < numeroDollari[4]; j++) {
    let newDollar = new Dollars(
      random(windowWidth / 6, (4 * windowWidth) / 6),
      random(windowHeight / 6, (5 * windowHeight) / 6)
    );
    myDollarsArray.push(newDollar);
  }

  for (let j = 0; j < numeroTenCents[4]; j++) {
    let newTenCent = new TenCents(
      random(windowWidth / 6, (4 * windowWidth) / 6),
      random(windowHeight / 6, (5 * windowHeight) / 6)
    );
    myTenCentsArray.push(newTenCent);
  }

  //RIPETO PER IL SESTO BOTTONE
  button10 = createButton("2010");
  button10.position((windowWidth / k) * 23, (windowWidth / k) * 11);
  button10.mousePressed(togglePlaying10);

  for (let i = 0; i < numeroPanini[5]; i++) {
    let newBigMac = new BigMac(
      random(windowWidth / 6, (4 * windowWidth) / 6),
      random(windowHeight / 6, (5 * windowHeight) / 6)
    );
    myBigMacArray.push(newBigMac);
  }

  for (let j = 0; j < numeroDollari[5]; j++) {
    let newDollar = new Dollars(
      random(windowWidth / 6, (4 * windowWidth) / 6),
      random(windowHeight / 6, (5 * windowHeight) / 6)
    );
    myDollarsArray.push(newDollar);
  }

  for (let j = 0; j < numeroTenCents[5]; j++) {
    let newTenCent = new TenCents(
      random(windowWidth / 6, (4 * windowWidth) / 6),
      random(windowHeight / 6, (5 * windowHeight) / 6)
    );
    myTenCentsArray.push(newTenCent);
  }
  //RIPETO PER IL SETTIMO BOTTONE
  button15 = createButton("2015");
  button15.position((windowWidth / k) * 23, (windowWidth / k) * 13);
  button15.mousePressed(togglePlaying15);

  for (let i = 0; i < numeroPanini[6]; i++) {
    let newBigMac = new BigMac(
      random(windowWidth / 6, (4 * windowWidth) / 6),
      random(windowHeight / 6, (5 * windowHeight) / 6)
    );
    myBigMacArray.push(newBigMac);
  }

  for (let j = 0; j < numeroDollari[6]; j++) {
    let newDollar = new Dollars(
      random(windowWidth / 6, (4 * windowWidth) / 6),
      random(windowHeight / 6, (5 * windowHeight) / 6)
    );
    myDollarsArray.push(newDollar);
  }

  for (let j = 0; j < numeroTenCents[6]; j++) {
    let newTenCent = new TenCents(
      random(windowWidth / 6, (4 * windowWidth) / 6),
      random(windowHeight / 6, (5 * windowHeight) / 6)
    );
    myTenCentsArray.push(newTenCent);
  }

  //RIPETO PER L'ULTIMO BOTTONE
  button20 = createButton("2020");
  button20.position((windowWidth / k) * 23, (windowWidth / k) * 15);
  button20.mousePressed(togglePlaying20);

  for (let i = 0; i < numeroPanini[7]; i++) {
    let newBigMac = new BigMac(
      random(windowWidth / 6, (4 * windowWidth) / 6),
      random(windowHeight / 6, (5 * windowHeight) / 6)
    );
    myBigMacArray.push(newBigMac);
  }

  for (let j = 0; j < numeroDollari[7]; j++) {
    let newDollar = new Dollars(
      random(windowWidth / 6, (4 * windowWidth) / 6),
      random(windowHeight / 6, (5 * windowHeight) / 6)
    );
    myDollarsArray.push(newDollar);
  }

  for (let j = 0; j < numeroTenCents[7]; j++) {
    let newTenCent = new TenCents(
      random(windowWidth / 6, (4 * windowWidth) / 6),
      random(windowHeight / 6, (5 * windowHeight) / 6)
    );
    myTenCentsArray.push(newTenCent);
  }
}

// DESCRIVO COSA FANNO LE FUNZIONI CHE HO CHIAMATO PRIMA
function togglePlaying86() {
  // se nulla sta suonando (! = non)
  if (
    !mySong86.isPlaying() &&
    !mySong90.isPlaying() &&
    !mySong95.isPlaying() &&
    !mySong00.isPlaying() &&
    !mySong05.isPlaying() &&
    !mySong10.isPlaying() &&
    !mySong15.isPlaying() &&
    !mySong20.isPlaying()
  ) {
    // allora suona questa canzone
    mySong86.play();
    mySong86.setVolume(0.3);
    // e cambia il bottone in questo modo
    button86.style("color", "#da291c");
    button86.style("background-color", "#ffc72c");
  } else {
    // altrimenti stoppa la mia canzone...
    //( che date le condizioni prima è l'unica a poter star suonando )
    mySong86.pause();
    // e cambia il bottone in quest'altro modo (situa di partenza)
    button86.style("color", "#ffc72c");
    button86.style("background-color", "#da291c");
  }
}

// RIPETO PER TUTTE LE FUNZIONI TOGGLE
function togglePlaying90() {
  if (
    !mySong86.isPlaying() &&
    !mySong90.isPlaying() &&
    !mySong95.isPlaying() &&
    !mySong00.isPlaying() &&
    !mySong05.isPlaying() &&
    !mySong10.isPlaying() &&
    !mySong15.isPlaying() &&
    !mySong20.isPlaying()
  ) {
    mySong90.play();
    mySong90.setVolume(0.3);
    button90.style("color", "#da291c");
    button90.style("background-color", "#ffc72c");
  } else {
    mySong90.pause();
    button90.style("color", "#ffc72c");
    button90.style("background-color", "#da291c");
  }
}

function togglePlaying95() {
  if (
    !mySong86.isPlaying() &&
    !mySong90.isPlaying() &&
    !mySong95.isPlaying() &&
    !mySong00.isPlaying() &&
    !mySong05.isPlaying() &&
    !mySong10.isPlaying() &&
    !mySong15.isPlaying() &&
    !mySong20.isPlaying()
  ) {
    mySong95.play();
    mySong95.setVolume(0.3);
    button95.style("color", "#da291c");
    button95.style("background-color", "#ffc72c");
  } else {
    mySong95.pause();
    button95.style("color", "#ffc72c");
    button95.style("background-color", "#da291c");
  }
}

function togglePlaying00() {
  if (
    !mySong86.isPlaying() &&
    !mySong90.isPlaying() &&
    !mySong95.isPlaying() &&
    !mySong00.isPlaying() &&
    !mySong05.isPlaying() &&
    !mySong10.isPlaying() &&
    !mySong15.isPlaying() &&
    !mySong20.isPlaying()
  ) {
    mySong00.play();
    mySong00.setVolume(0.3);
    button00.style("color", "#da291c");
    button00.style("background-color", "#ffc72c");
  } else {
    mySong00.pause();
    button00.style("color", "#ffc72c");
    button00.style("background-color", "#da291c");
  }
}
function togglePlaying05() {
  if (
    !mySong86.isPlaying() &&
    !mySong90.isPlaying() &&
    !mySong95.isPlaying() &&
    !mySong00.isPlaying() &&
    !mySong05.isPlaying() &&
    !mySong10.isPlaying() &&
    !mySong15.isPlaying() &&
    !mySong20.isPlaying()
  ) {
    mySong05.play();
    mySong05.setVolume(0.3);
    button05.style("color", "#da291c");
    button05.style("background-color", "#ffc72c");
  } else {
    mySong05.pause();
    button05.style("color", "#ffc72c");
    button05.style("background-color", "#da291c");
  }
}

function togglePlaying10() {
  if (
    !mySong86.isPlaying() &&
    !mySong90.isPlaying() &&
    !mySong95.isPlaying() &&
    !mySong00.isPlaying() &&
    !mySong05.isPlaying() &&
    !mySong10.isPlaying() &&
    !mySong15.isPlaying() &&
    !mySong20.isPlaying()
  ) {
    mySong10.play();
    mySong10.setVolume(0.3);
    button10.style("color", "#da291c");
    button10.style("background-color", "#ffc72c");
  } else {
    mySong10.pause();
    button10.style("color", "#ffc72c");
    button10.style("background-color", "#da291c");
  }
}

function togglePlaying15() {
  if (
    !mySong86.isPlaying() &&
    !mySong90.isPlaying() &&
    !mySong95.isPlaying() &&
    !mySong00.isPlaying() &&
    !mySong05.isPlaying() &&
    !mySong10.isPlaying() &&
    !mySong15.isPlaying() &&
    !mySong20.isPlaying()
  ) {
    mySong15.play();
    mySong15.setVolume(0.3);
    button15.style("color", "#da291c");
    button15.style("background-color", "#ffc72c");
  } else {
    mySong15.pause();
    button15.style("color", "#ffc72c");
    button15.style("background-color", "#da291c");
  }
}

function togglePlaying20() {
  if (
    !mySong86.isPlaying() &&
    !mySong90.isPlaying() &&
    !mySong95.isPlaying() &&
    !mySong00.isPlaying() &&
    !mySong05.isPlaying() &&
    !mySong10.isPlaying() &&
    !mySong15.isPlaying() &&
    !mySong20.isPlaying()
  ) {
    mySong20.play();
    mySong20.setVolume(0.3);
    button20.style("color", "#da291c");
    button20.style("background-color", "#ffc72c");
  } else {
    mySong20.pause();
    button20.style("color", "#ffc72c");
    button20.style("background-color", "#da291c");
  }
}

function draw() {
  // SETTO IL LAYOUT
  background("#da291c"); /*red*/

  let myMainText = "How many BigMac could you have bought with 10$? ";
  fill("#ffc72c"); /*yellow*/
  textFont("Alfa Slab One");
  textSize(130);
  text(
    myMainText,
    (windowWidth / k) * 1,
    (windowWidth / k) * 1,
    (windowWidth / k) * 20,
    (windowWidth / k) * 20
  );

  //MOSTRO GLI OGGETTI

  //Se la canzone sta suonando"...
  if (mySong86.isPlaying()) {
    // allora, partendo da zero fin tanto che non "considero"...
    //...tutti i panini corrispondenti al primo elemento dell'Array ( e dunque del JSON)...
    for (let i = 0; i < numeroPanini[0]; i++) {
      //mostro i panini...
      myBigMacArray[i].run();
    }
    //... i dollari...
    for (let i = 0; i < numeroDollari[0]; i++) {
      myDollarsArray[i].run();
    }
    //... e i centesimi
    for (let i = 0; i < numeroTenCents[0]; i++) {
      myTenCentsArray[i].run();
    }
  }

  //Metto a schermo tutto quello del 1990
  if (mySong90.isPlaying()) {
    for (let i = 0; i < numeroPanini[1]; i++) {
      myBigMacArray[i].run();
    }
    for (let i = 0; i < numeroDollari[1]; i++) {
      myDollarsArray[i].run();
    }
    for (let i = 0; i < numeroTenCents[1]; i++) {
      myTenCentsArray[i].run();
    }
  }

  //Metto a schermo tutto quello del 1995
  if (mySong95.isPlaying()) {
    for (let i = 0; i < numeroPanini[2]; i++) {
      myBigMacArray[i].run();
    }
    for (let i = 0; i < numeroDollari[2]; i++) {
      myDollarsArray[i].run();
    }
    for (let i = 0; i < numeroTenCents[2]; i++) {
      myTenCentsArray[i].run();
    }
  }

  //Metto a schermo tutto quello del 2000
  if (mySong00.isPlaying()) {
    for (let i = 0; i < numeroPanini[3]; i++) {
      myBigMacArray[i].run();
    }
    for (let i = 0; i < numeroDollari[3]; i++) {
      myDollarsArray[i].run();
    }
    for (let i = 0; i < numeroTenCents[3]; i++) {
      myTenCentsArray[i].run();
    }
  }

  //Metto a schermo tutto quello del 2005
  if (mySong05.isPlaying()) {
    for (let i = 0; i < numeroPanini[4]; i++) {
      myBigMacArray[i].run();
    }
    for (let i = 0; i < numeroDollari[4]; i++) {
      myDollarsArray[i].run();
    }
    for (let i = 0; i < numeroTenCents[4]; i++) {
      myTenCentsArray[i].run();
    }
  }

  //Metto a schermo tutto quello del 2010
  if (mySong10.isPlaying()) {
    for (let i = 0; i < numeroPanini[5]; i++) {
      myBigMacArray[i].run();
    }
    for (let i = 0; i < numeroDollari[5]; i++) {
      myDollarsArray[i].run();
    }
    for (let i = 0; i < numeroTenCents[5]; i++) {
      myTenCentsArray[i].run();
    }
  }

  //Metto a schermo tutto quello del 2015
  if (mySong15.isPlaying()) {
    for (let i = 0; i < numeroPanini[6]; i++) {
      myBigMacArray[i].run();
    }
    for (let i = 0; i < numeroDollari[6]; i++) {
      myDollarsArray[i].run();
    }
    for (let i = 0; i < numeroTenCents[6]; i++) {
      myTenCentsArray[i].run();
    }
  }
  //Metto a schermo tutto quello del 2020
  if (mySong20.isPlaying()) {
    for (let i = 0; i < numeroPanini[7]; i++) {
      myBigMacArray[i].run();
    }
    for (let i = 0; i < numeroDollari[7]; i++) {
      myDollarsArray[i].run();
    }
    for (let i = 0; i < numeroTenCents[7]; i++) {
      myTenCentsArray[i].run();
    }
  }
}
