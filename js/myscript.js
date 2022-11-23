// Descrizione:
// Visualizzare in pagina 5 numeri casuali.
// Da lì parte un timer di 30 secondi.
// Dopo 30 secondi i numeri scompaiono e l’utente deve inserire, uno alla volta, i numeri che ha visto precedentemente.
// Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.

const quantiIndovinati = document.getElementById("quanti-indovinati");

const qualiIndovinati = document.getElementById("quali-indovinati");

const inputNumeri = document.getElementById("input-numeri");

const numeridaGenerare = 5;

const minNumeri = 1;

const maxNumeri = 20;

const numeri = generaArrayNumUnici(numeridaGenerare, minNumeri, maxNumeri);

// Array che contiene numeri indovinati
const numeriIndovinati = [];

// Array che contiene numeri aggiunti dall'utente
const numeriAggiunti = [];

let seconds = 5;

let timer;

// Al click del bottone gioca
document.getElementById("gioca").addEventListener("click", gioca);

// Al click del bottone riprova
document.getElementById("riprova").addEventListener("click", riprova);

// Numero casuale tra min e max
function numCasuale(min, max) {
    return (Math.floor(Math.random() * ((max + 1) - min) + min));
}

// Genero array di n numeri casuali che non si ripetono
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

// Nascondo i numeri e faccio apparire l'input una volta che il timer arriva a 0 
function funzioneNascondiNumeri() {

    document.getElementById("numeri").classList.remove("visible");

    document.getElementById("input").classList.add("visible");
}

// Funzione per far inserire i numeri all'utente
function inserisciNumeri() {

    let int = parseInt(inputNumeri.value);

    inputNumeri.value = "";

    if (numeri.includes(int) && !numeriIndovinati.includes(int)) {
                    
        numeriIndovinati.push(int);

    }

    numeriAggiunti.push(int);

    console.log("numeri aggiunti: ", numeriAggiunti);

    console.log("indovinati: ", numeriIndovinati);

    if (numeriAggiunti.length === numeridaGenerare) {

        // Nascondo input 
        document.getElementById("input").classList.remove("visible");

        // Faccio apparire bottone riprova
        document.getElementById("riprova").classList.add("visible");

        // Faccio apparire il numero di indovinati
        quantiIndovinati.classList.add("visible");

        if (numeriIndovinati.length != 0) {

            // Faccio apparire quali numeri ha indovinato
            qualiIndovinati.classList.add("visible");

            quantiIndovinati.innerHTML = `Hai indovinato ${numeriIndovinati.length} numeri, i numeri indovinati sono:`;
                
            qualiIndovinati.innerHTML += ` ${numeriIndovinati}`;
        
        }

        else {
            quantiIndovinati.innerHTML = "Non hai indovinato nessun numero";
        }
    }

}

// Funzione che ricarica la pagina
function riprova() {

    window.location.reload();

}

// Funzione per far partire il gioco
function gioca() {
    
    // Nascondo il pulsante gioca
    document.getElementById("gioca").classList.add("hidden");

    // Mostro i numeri
    document.getElementById("numeri").classList.add("visible");

    setTimeout(funzioneNascondiNumeri, 5000);

    // Timer
    timer = setInterval(function creaTimer() {
        seconds--;

    // Se i secondi arrivano a 0 azzero il timer e lo faccio scomparire
    if (seconds === 0) {
        clearInterval(timer);

        document.getElementById("secondi").classList.add("hidden");
    }

    document.getElementById("secondi").innerHTML = `Timer: <span>${seconds}</span>`;
    }, 1000);

    document.getElementById("invia").addEventListener("click", inserisciNumeri);
}