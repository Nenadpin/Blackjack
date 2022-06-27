let prvaKarta = 0;
let drugaKarta = 0;
let dilerKarte = [];
let dilerSum = 0;
let diler = {};
let karte = [];
let sum = prvaKarta + drugaKarta;
let trecaKarta = 0;
let dobitak = false;
let igra = false;
let info = "";
let player = {
  name: "Nenad",
  kredit: 100,
};
let deck = [];
start();

function start() {
  document.getElementById("kreni").style.display = "block";
  document.getElementById("igra").style.display = "none";
}
function gameOn() {
  document.getElementById("kreni").style.display = "none";
  document.getElementById("igra").style.display = "block";
}
const convert = (x) => {
  if (x === 12) {
    return {
      card: "J",
      value: 10,
      suit: "",
    };
  } else if (x === 13) {
    return {
      card: "Q",
      value: 10,
      suit: "",
    };
  } else if (x === 14) {
    return {
      card: "K",
      value: 10,
      suit: "",
    };
  } else if (x === 11) {
    return {
      card: "A",
      value: 11,
      suit: "",
    };
  } else {
    return {
      card: x,
      value: x,
      suit: "",
    };
  }
};

let dilerEl = document.getElementById("diler-el");
let poruka = document.getElementById("poruka-el");
let sumEl = document.getElementById("sum-el");
let karteEl = document.getElementById("karte-el");
let playerEl = document.getElementById("player-el");
let startBtn = document.getElementById("start-Btn");
let novaBtn = document.getElementById("nova-Btn");
let proveraBtn = document.getElementById("provera-Btn");

if (JSON.parse(localStorage.getItem("kredit"))) {
  player.kredit = JSON.parse(localStorage.getItem("kredit"));
}

playerEl.textContent = `Igrac: ${player.name}  $: ${player.kredit}`;

const populateDeck = () => {
  for (let j = 2; j < 15; j++) {
    deck[j - 2] = convert(j);
    deck[j - 2].suit = "Clubs";
  }
  for (let j = 2; j < 15; j++) {
    deck[j + 13 - 2] = convert(j);
    deck[j + 13 - 2].suit = "Spades";
  }
  for (let j = 2; j < 15; j++) {
    deck[j + 26 - 2] = convert(j);
    deck[j + 26 - 2].suit = "Hearts";
  }
  for (let j = 2; j < 15; j++) {
    deck[j + 39 - 2] = convert(j);
    deck[j + 39 - 2].suit = "Diamonds";
  }
};

populateDeck();

novaBtn.addEventListener("click", () => {
  if (igra === true && dobitak === false) {
    if (deck.length === 0) populateDeck();
    trecaKarta = deck.splice(
      Math.floor(Math.random() * (deck.length - 1)),
      1
    )[0];
    karte.push(trecaKarta.card);
    sum += trecaKarta.value;
    vuci();
    karteEl.textContent += " " + karte[karte.length - 1];
  }
});
startBtn.addEventListener("click", () => {
  igra = true;
  dobitak = false;
  karte = [];
  dilerKarte = [];
  if (deck.length === 0) populateDeck();
  diler = deck.splice(Math.floor(Math.random() * (deck.length - 1)), 1)[0];
  dilerKarte[0] = diler.card;
  dilerSum = diler.value;
  if (deck.length === 0) populateDeck();
  prvaKarta = deck.splice(Math.floor(Math.random() * (deck.length - 1)), 1)[0];
  if (deck.length === 0) populateDeck();
  drugaKarta = deck.splice(Math.floor(Math.random() * (deck.length - 1)), 1)[0];
  karte[0] = prvaKarta.card;
  karte[1] = drugaKarta.card;
  sum = prvaKarta.value + drugaKarta.value;
  karteEl.textContent = `Karte: ${karte[0]} ${karte[1]}`;
  dilerEl.textContent = `Diler: ${dilerKarte}`;
  vuci();
});
const vuci = () => {
  if (igra) {
    gameOn();
  } else {
    start();
  }

  if (sum <= 20) {
    info = "Jos jednu kartu?";
  } else if (sum === 21) {
    info = "Dobili ste BlackJack!";
    dobitak = true;
    igra = false;
    player.kredit += 10;
    localStorage.setItem("kredit", JSON.stringify(player.kredit));
    playerEl.textContent = `Igrac: ${player.name}  $: ${player.kredit}`;
    start();
  } else {
    info = "Izgubili ste!";
    igra = false;
    player.kredit -= 10;
    localStorage.setItem("kredit", JSON.stringify(player.kredit));
    playerEl.textContent = `Igrac: ${player.name}  $: ${player.kredit}`;
    start();
  }
  poruka.textContent = info;
  sumEl.textContent = "Ukupno: " + sum;
};

proveraBtn.addEventListener("click", () => {
  if (igra) {
    if (sum === 21) {
      poruka.textContent = "Dobili ste!!!";
      dobitak = true;
      player.kredit += 10;

      localStorage.setItem("kredit", JSON.stringify(player.kredit));
      playerEl.textContent = `Igrac: ${player.name}  $: ${player.kredit}`;
      igra = false;
      start();
    } else {
      while (igra) {
        if (deck.length === 0) populateDeck();
        diler = deck.splice(
          Math.floor(Math.random() * (deck.length - 1)),
          1
        )[0];
        dilerKarte.push(diler.card);
        dilerEl.textContent += " " + diler.card;
        dilerSum += diler.value;
        if (dilerSum > 21) {
          poruka.textContent = "Dobili ste!!!";
          dobitak = true;
          player.kredit += 10;
          localStorage.setItem("kredit", JSON.stringify(player.kredit));

          playerEl.textContent = `Igrac: ${player.name}  $: ${player.kredit}`;
          igra = false;
          start();
          break;
        }
        if (dilerSum >= 17) {
          if (sum === dilerSum) {
            poruka.textContent = "Nereseno!";
            igra = false;
            start();
            break;
          } else if (sum > dilerSum) {
            poruka.textContent = "Dobili ste!!!";
            dobitak = true;
            player.kredit += 10;
            localStorage.setItem("kredit", JSON.stringify(player.kredit));

            playerEl.textContent = `Igrac: ${player.name}  $: ${player.kredit}`;
            igra = false;
            start();
            break;
          } else {
            poruka.textContent = "Izgubili ste!!!";
            dobitak = false;
            player.kredit -= 10;
            localStorage.setItem("kredit", JSON.stringify(player.kredit));

            playerEl.textContent = `Igrac: ${layer.name}  $: ${player.kredit}`;
            igra = false;
            start();
            break;
          }
        }
      }
    }
  }
});
