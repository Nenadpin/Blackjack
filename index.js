let prvaKarta = 0
let drugaKarta = 0
let dilerKarte = [0]
let dilerSum = 0
let karte = [0, 0]
let sum = prvaKarta + drugaKarta
let trecaKarta = 0
let dobitak = false
let igra = false
let info = ""
let player = {
    name: "Nenad",
    kredit: 100
}
prikaz1()

function prikaz1() {
    document.getElementById("kreni").style.display = "block"
    document.getElementById("igra").style.display = "none"
}
function prikaz2() {
    document.getElementById("kreni").style.display = "none"
    document.getElementById("igra").style.display = "block"
}

let dilerEl = document.getElementById("diler-el")
let poruka = document.getElementById("poruka-el")
let sumEl = document.getElementById("sum-el")
let karteEl = document.getElementById("karte-el")
let playerEl = document.getElementById("player-el")
let startBtn = document.getElementById("start-Btn")
let novaBtn = document.getElementById("nova-Btn")
let proveraBtn = document.getElementById("provera-Btn")

if (JSON.parse(localStorage.getItem("kredit"))) {
    player.kredit = JSON.parse(localStorage.getItem("kredit"))
}

playerEl.textContent = "Igrac: " + player.name + "  - " + " $:" + player.kredit
function getKard() {
    let i = Math.floor(Math.random() * 13) + 1;
    if (i > 10){
        return 10
    } else if (i===1) {
            return 11
    }    else {
            return i
        }
}
novaBtn.addEventListener("click", function () {
    if (igra===true && dobitak === false) {
    trecaKarta = getKard()
    sum += trecaKarta
    karte.push(trecaKarta)
    vuci()
    karteEl.textContent += " " + karte[karte.length - 1];
    }
}) 
startBtn.addEventListener("click", function () {
    igra = true
    dobitak = false
    dilerKarte= [getKard()]
    prvaKarta = getKard()
    drugaKarta = getKard()
    sum = prvaKarta + drugaKarta
    karte = [prvaKarta, drugaKarta]
    karteEl.textContent = "Karte: " + karte[0] + " " + karte[1]
    dilerEl.textContent = "Diler: " + dilerKarte
    vuci()
})
function vuci() {
    if (igra) {
        prikaz2()
    } else {
        prikaz1()
    }
    
    if (sum<=20) {
        info = "Jos jednu kartu?"
    } else if (sum === 21) {
        info = "Dobili ste BlackJack!"
        dobitak = true
        igra=false
        player.kredit +=10
        localStorage.setItem("kredit", JSON.stringify(player.kredit))
        playerEl.textContent = "Igrac: " + player.name + "  - " + " $:" + player.kredit
        prikaz1()
    } else {
        info = "Izgubili ste!"
        igra = false
        player.kredit -=10
        localStorage.setItem("kredit", JSON.stringify(player.kredit))
        playerEl.textContent = "Igrac: " + player.name + "  - " + " $:" + player.kredit
        prikaz1()
    }
poruka.textContent = info;
sumEl.textContent = "Ukupno: " + sum;
}
proveraBtn.addEventListener("click", function () {
if(igra === true) {
    if (sum===21) {
        poruka.textContent = "Dobili ste!!!"
        dobitak = true
        igra=false
        player.kredit += 10
        localStorage.setItem("kredit", JSON.stringify(player.kredit))
        playerEl.textContent = "Igrac: " + player.name + "  - " + " $:" + player.kredit
        prikaz1()
    } else {
    
    dilerSum = dilerKarte[0]
    for(let i = 1; sum > dilerSum; i++) {
        dilerKarte.push(getKard())
        dilerEl.textContent += " " + dilerKarte[i];
        dilerSum += dilerKarte[i];
    }
    if(dilerSum > 21) {
        poruka.textContent = "Dobili ste!!!"
        dobitak = true
        player.kredit += 10
        localStorage.setItem("kredit", JSON.stringify(player.kredit))
        playerEl.textContent = "Igrac: " + player.name + "  - " + " $:" + player.kredit
        prikaz1()
        igra=false
    } else {
        poruka.textContent = "Izgubili ste!!!"
        player.kredit -= 10
        localStorage.setItem("kredit", JSON.stringify(player.kredit))
        playerEl.textContent = "Igrac: " + player.name + "  - " + " $:" + player.kredit
        prikaz1()
        igra = false
        }
}
}
})