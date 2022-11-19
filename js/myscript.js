// Descrizione:
// Visualizzare in pagina 5 numeri casuali.
// Da lì parte un timer di 30 secondi.
// Dopo 30 secondi i numeri scompaiono e l’utente deve inserire, uno alla volta, i numeri che ha visto precedentemente.
// Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.

const inputNumeri = document.getElementById("input-numeri");

const numeri = generaArrayNumUnici(5, 1, 20);

const numeriIndovinati = [];

const numeriAggiunti = [];

let seconds;

let timer;

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

function funzioneNascondiNumeri() {
    document.getElementById("numeri").classList.add("hidden");

    document.getElementById("input").classList.add("visible");
}

function creaTimer() {

    seconds--;

    if (seconds === 0) {
        clearInterval(timer);

        document.getElementById("secondi").classList.add("hidden");
    }

    document.getElementById("secondi").innerHTML = seconds;

}

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

function riprova() {

    window.location.reload(true);

}

function gioca() {
    
    document.getElementById("gioca").classList.add("hidden");

    setTimeout(funzioneNascondiNumeri, 30000);

    timer = setInterval(creaTimer, 1000);

    for (let i = 0; i < numeri.length; i++) {
        document.getElementById("numeri").innerHTML += `${numeri[i]} `;
    }

    document.getElementById("invia").addEventListener("click", inserisciNumeri);
}