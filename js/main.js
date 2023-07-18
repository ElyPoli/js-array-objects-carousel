/*
Consegna:
Dato un array di oggetti letterali con:
- url dell’immagine
- titolo
- descrizione
Creare un carosello come nella foto allegata.

Milestone 0:
Come nel primo carosello realizzato, focalizziamoci prima sulla creazione del markup statico: costruiamo il container e inseriamo l’immagine grande in modo da poter stilare lo slider.

Milestone 1:
Ora rimuoviamo i contenuti statici e usiamo l’array di oggetti letterali per popolare dinamicamente il carosello.
Al click dell’utente sulle frecce verso sinistra o destra, l’immagine attiva diventerà visibile e dovremo aggiungervi titolo e testo.

Milestone 2:
Aggiungere il **ciclo infinito** del carosello. Ovvero se la miniatura attiva è la prima e l’utente clicca la freccia verso destra, la miniatura che deve attivarsi sarà l’ultima e viceversa per l’ultima miniatura se l’utente clicca la freccia verso sinistra.

BONUS 1:
Aggiungere le thumbnails (sottoforma di miniatura) ed al click attivare l’immagine corrispondente.

BONUS 2:
Aggiungere funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi) l’immagine attiva dovrà cambiare alla successiva.

BONUS 3:
Aggiungere bottoni di start/stop e di inversione del meccanismo di autoplay.
*/

// Dichiaro varibili
const upInput = document.querySelector("#up-input");
const downInput = document.querySelector("#down-input");
const startInput = document.querySelector("#start-input");
const stopInput = document.querySelector("#stop-input");
const reverseInput = document.querySelector("#reverse-input");
const carouselImageBox = document.querySelector("#carousel-image-box");
const thumbnailImageBox = document.querySelector("#thumbnail-image-box");
let reverse = false;
let currentCarousel = 0;
let timeToClick = new Date();
let autoplayStart = 0;
let autoplay;

const imagesList = [
    {
        image: 'img/01.webp',
        title: 'Marvel\'s Spiderman Miles Morale',
        text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
    }, {
        image: 'img/02.webp',
        title: 'Ratchet & Clank: Rift Apart',
        text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
    }, {
        image: 'img/03.webp',
        title: 'Fortnite',
        text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
    }, {
        image: 'img/04.webp',
        title: 'Stray',
        text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
    }, {
        image: 'img/05.webp',
        title: "Marvel's Avengers",
        text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
    }
];

createAllElement(); // creo tutti gli elementi

createThumbnail(); // creo le miniature

autoplayCreate() // autoplay

const carouselBox = document.querySelectorAll(".carousel-element-box");
const thumbnailImage = document.querySelectorAll(".thumbnail-image");

// Rendo attivo il primo elemento e la prima miniatura
carouselBox.forEach((singleElement, i) => {
    if (i === 0) {
        carouselBox[i].classList.add("active");
        thumbnailImage[i].classList.add("active");
    }
});

upInput.addEventListener("click", upInputClick); // Pulsante scorro verso l'alto
downInput.addEventListener("click", downInputClick); // Pulsante scorro verso il basso

// Creo tutti gli elementi
function createAllElement() {

    const idNumber = createIdNumber();

    imagesList.forEach((singleCarouselElement, i) => {
        const carouselElementBox = document.createElement("div");
        carouselElementBox.classList.add("position-absolute", "top-0", "start-0", "carousel-element-box");

        const carouselImage = document.createElement("img");
        carouselImage.src = imagesList[i].image;
        carouselImage.alt = imagesList[i].title;

        const carouselTextBox = document.createElement("div");
        carouselTextBox.classList.add("position-absolute", "bottom-0", "end-0", "carousel-text-box");

        const carouselTitle = document.createElement("h3");
        carouselTitle.textContent = imagesList[i].title;

        const carouselText = document.createElement("p");
        carouselText.textContent = imagesList[i].text;

        carouselElementBox.setAttribute("id", idNumber[i]);

        printAllElement(carouselImageBox, carouselElementBox, carouselTextBox, carouselImage, carouselTitle, carouselText); // stampo gil elementi
    });
}

// Stampo tutti gli elementi a schermo
function printAllElement(carouselImageBox, carouselElementBox, carouselTextBox, carouselImage, carouselTitle, carouselText) {
    carouselImageBox.append(carouselElementBox);
    carouselElementBox.append(carouselImage);
    carouselElementBox.append(carouselTextBox);
    carouselTextBox.append(carouselTitle);
    carouselTextBox.append(carouselText);
}

// Creo le miniature
function createThumbnail() {

    const idNumber = createIdNumber();

    imagesList.forEach((singleThumbnailElement, i) => {
        const thumbnailImage = document.createElement("img");
        thumbnailImage.classList.add("thumbnail-image");
        thumbnailImage.src = imagesList[i].image;
        thumbnailImage.alt = imagesList[i].title;

        thumbnailImage.setAttribute("id", idNumber[i]);

        thumbnailImageBox.append(thumbnailImage);

        thumbnailImage.addEventListener("click", thumbnailClicked); // attivo la funzione al click della miniatura
    });
}

// Crea un array di numeri da associare agli id
function createIdNumber() {
    let idArray = [];

    imagesList.forEach((number, i) => {
        idArray.push(`_${i}`);
    });

    return idArray;
}

// Click della miniatura
function thumbnailClicked() {
    // Scorro su entrambi gli array per trovare le corrispondenze tramite gli id
    carouselBox.forEach((singleCarouselElement, i) => {
        thumbnailImage[i].classList.remove("active");
        carouselBox[i].classList.remove("active");

        thumbnailImage.forEach((singleThumbnailElement, z) => {
            if (this.id === carouselBox[z].id) {
                carouselBox[z].classList.add("active");
                this.classList.add("active");

                currentCarousel = z;
            }
        });
    });

    autoplayStart = 0;
}

// Pulsante scorro verso l'alto
function upInputClick() {
    carouselBox[currentCarousel].classList.remove("active");
    thumbnailImage[currentCarousel].classList.remove("active");

    currentCarousel++;

    if (currentCarousel > carouselBox.length - 1) {
        currentCarousel = 0;
    }

    carouselBox[currentCarousel].classList.add("active");
    thumbnailImage[currentCarousel].classList.add("active");
    autoplayStart = 0;
}

// Pulsante scorro verso il basso
function downInputClick() {
    carouselBox[currentCarousel].classList.remove("active");
    thumbnailImage[currentCarousel].classList.remove("active");

    currentCarousel--;

    if (currentCarousel < 0) {
        currentCarousel = carouselBox.length - 1;
    }

    carouselBox[currentCarousel].classList.add("active");
    thumbnailImage[currentCarousel].classList.add("active");
    autoplayStart = 0;
}

// Aggiorno il tempo di attesa del click
setInterval(function () {
    timeToClick = new Date();
    autoplayStart++;
}, 1000);

// Autoplay
function autoplayCreate() {
    autoplay = setInterval(function () {

        if(reverse === false) {
            if (autoplayStart >= 5) {
                upInputClick(); // Pulsante scorro verso l'alto
                autoplayStart = 0;
            }    
        } else {
            if (autoplayStart >= 5) {
                downInputClick(); // Pulsante scorro verso il basso
                autoplayStart = 0;
            }    
        }
    }, 1000);    
}

// Reverse autoplay
reverseInput.addEventListener("click", function() {
    reverse = true;
})

// Stop autoplay
stopInput.addEventListener("click", function() {
    clearInterval(autoplay);    
})

// Play autoplay
startInput.addEventListener("click", function() {
    autoplayCreate(); // autoplay
})