// Descrizione:
// Visualizzare in pagina 5 numeri casuali.
// Da lì parte un timer di 30 secondi.
// Dopo 30 secondi i numeri scompaiono e l’utente deve inserire, uno alla volta, i numeri che ha visto precedentemente.
// Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.

const inputNumeri = document.getElementById("input-numeri");

const numeri = generaArrayNumUnici(5, 1, 20);

const indovinati = [];

const numeriAggiunti = [];

let timer;

let seconds;

setTimeout(myFunction, 5000);

function numCasuale(min, max) {
    return (Math.floor(Math.random() * ((max + 1) - min) + min));
}

function generaArrayNumUnici(n, numMin, numMax) {
    const array = [];

    while (array.length < n) {
        let newNumber = numCasuale(numMin, numMax);

        if(!array.includes(newNumber)) {
            array.push(newNumber);
        }
    }

    return array;
} 

function myFunction() {
    document.getElementById("numeri").classList.add("hidden");

    document.getElementById("input").classList.add("visible");
}