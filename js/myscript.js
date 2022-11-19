// Descrizione:
// Visualizzare in pagina 5 numeri casuali.
// Da lì parte un timer di 30 secondi.
// Dopo 30 secondi i numeri scompaiono e l’utente deve inserire, uno alla volta, i numeri che ha visto precedentemente.
// Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.

const inputNumeri = document.getElementById("input-numeri");

const numeri = generaArrayNumUnici(5, 1, 20);

// Array che contiene numeri indovinati
const numeriIndovinati = [];

// Array che contiene numeri aggiunti dall'utente
const numeriAggiunti = [];

let seconds = 30;

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
    document.getElementById("numeri").classList.add("hidden");

    document.getElementById("input").classList.add("visible");
}

// Faccio partire il timer
function creaTimer() {

    seconds--;

    // Se i secondi arrivano a 0 azzero il timer e lo faccio scomparire
    if (seconds === 0) {
        clearInterval(timer);

        document.getElementById("secondi").classList.add("hidden");
    }

    document.getElementById("secondi").innerHTML = seconds;

}

// Funzione per far inserire i numeri all'utente
function inserisciNumeri() {

    let int = parseInt(inputNumeri.value);

    for (let i = 0; i < numeridaGenerare; i++) {
        
        if (numeri.includes(int)) {
                    
            numeriIndovinati.push(int);
                        
            const index = numeri.indexOf(int);
        
            numeri.splice(index, 1);

            console.log("numeri: ", numeri);

            console.log("indovinati: ", numeriIndovinati);

        }

        inputNumeri.value = "";
        
    }
    
    numeriAggiunti.push(int);

    console.log("numeri aggiunti: ", numeriAggiunti);

    if (numeriAggiunti.length === numeridaGenerare) {

        document.getElementById("input").classList.remove("visible");

        document.getElementById("riprova").classList.add("visible");

        if (numeriIndovinati.length != 0) {

            document.getElementById("risultato").append(`Hai indovinato ${numeriIndovinati.length} numeri, i numeri indovinati sono:`);
                
            for (let i = 0; i < numeriIndovinati.length; i++) {
                document.getElementById("risultato").append(` ${numeriIndovinati[i]}`);
            }
        }

        else {
            document.getElementById("risultato").append("Non hai indovinato nessun numero");
        }
    }

}

// Funzionec che ricarica la pagina
function riprova() {

    window.location.reload(true);

}

// Funzione per far partire il gioco
function gioca() {
    
    document.getElementById("gioca").classList.add("hidden");

    setTimeout(funzioneNascondiNumeri, 30000);

    timer = setInterval(creaTimer, 1000);

    for (let i = 0; i < numeri.length; i++) {
        document.getElementById("numeri").innerHTML += `${numeri[i]} `;
    }

    document.getElementById("invia").addEventListener("click", inserisciNumeri);
}