'use strict';

class Artikal {
  constructor(id, naziv, cena, dostupan) {
    this.id = id;
    this.naziv = naziv;
    this.cena = cena;
    this.dostupan = dostupan; // true ili false
  }
}

class Prodavnica {
  constructor(naziv, artikli) {
    this.naziv = naziv;
    this.artikli = artikli;
  }
}

class Kupac {
  constructor(ime, sredstva, artikli) {
    this.ime = ime;
    this.sredstva = sredstva;
    this.artikli = artikli;
  }
}

function pronadjiNajjeftinijeArtikle(sveProdavnice, artikliKupac) {
  let najjeftinijiArtikli = [];
  let pronadjenoJeftinije = false;

  for (let artikal of artikliKupac) {
    let najnizaCena = artikal.cena;
    let najjeftinijaProdavnica = null;


    for (let prodavnica of sveProdavnice) {
      for (let pArtikal of prodavnica.artikli) {
        if (pArtikal.naziv === artikal.naziv) {
          if (pArtikal.cena < najnizaCena) {
            najnizaCena = pArtikal.cena;
            najjeftinijaProdavnica = prodavnica.naziv;
          }
        }
      }
    }

  
    if (najjeftinijaProdavnica !== null) {
      if (!pronadjenoJeftinije) {
        console.log("Pronasli smo za vas jeftinije artikle!");
        pronadjenoJeftinije = true;
      }
      console.log(`${artikal.naziv}, u prodavnici: ${najjeftinijaProdavnica}, ima cenu: ${najnizaCena}e.`);
    }

    najjeftinijiArtikli.push(new Artikal(artikal.naziv, najnizaCena));
  } 

  return najjeftinijiArtikli;
}

function izracunajIPlati(kupac, artikliZaNaplatu) {
  let ukupnaCena = 0;

  for (let artikal of artikliZaNaplatu) {
    ukupnaCena += artikal.cena;
  }

  if (kupac.sredstva >= ukupnaCena) {
    kupac.sredstva -= ukupnaCena;
    return ukupnaCena;
  } else {
    return null;
  }
}

function ispisiPoruku(kupac, prodavnica, potrosenIznos) {
  if (potrosenIznos !== null) {
    let naziviArtikala = [];
    for (let artikal of kupac.artikli) {
      naziviArtikala.push(artikal.naziv);
    }
    let spisak = naziviArtikala.join(", ");

    console.log(`${kupac.ime}, uspesno ste izvrsili kupovinu u ${prodavnica.naziv} prodavnici u iznosu od ${potrosenIznos}e! Kupili ste sledece artikle: ${spisak}.`);
  } else {
    console.log(`${kupac.ime}, nemate dovoljno sredstava na racunu!`);
  }
}



let grafickaKartaGigatron = new Artikal("GTX-4060", 780);
let tvGigatron = new Artikal("LG-TV", 880);
let misGigatron = new Artikal("Logitech-ZG-230", 30);
let artikliProdavnica = [grafickaKartaGigatron, tvGigatron, misGigatron];
let prodavnica = new Prodavnica("Gigatron", artikliProdavnica);

let tvGames = new Artikal("LG-TV", 800);
let misGames = new Artikal("RAZER", 56);
let games = new Prodavnica("Games", [tvGames, misGames]);

let tvTehnomanija = new Artikal("LG-TV", 740);
let misTehnomanija = new Artikal("Logitech-ZG-230", 30);
let procesorTehnomanija = new Artikal("intel i5", 430);
let tehnomanija = new Prodavnica("Tehnomanija", [tvTehnomanija, misTehnomanija, procesorTehnomanija]);

let sveProdavnice = [prodavnica, games, tehnomanija];

let artikliKupac = [misGigatron, tvGigatron];
let kupac = new Kupac("Marko", 1500, artikliKupac);


let korigovaniArtikli = pronadjiNajjeftinijeArtikle(sveProdavnice, kupac.artikli);
let potrosenIznos = izracunajIPlati(kupac, korigovaniArtikli);
ispisiPoruku(kupac, prodavnica, potrosenIznos);