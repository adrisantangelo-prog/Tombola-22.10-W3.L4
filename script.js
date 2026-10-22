/*
  REGOLE
  - Solo const/let, mai var.
  - DOM con querySelector / querySelectorAll.
  - Eventi con addEventListener (mai onclick inline nell'HTML).
*/

let usciti = []; // array dei numeri già estratti


/* SCRIVI QUI LE TUE FUNZIONI E I TUOI LISTENER:
   1. rendiTabellone()  — crea 90 div, evidenzia i numeri usciti
   2. estrai()          — pesca un numero casuale tra i non usciti
   3. rendiCronologia() — mostra gli ultimi 10 estratti
   4. Listener click su #estrai e #reset
   EXTRA: conteggio, animazione di estrazione, localStorage
*/

// Array dei numeri già estratti

// Elementi del DOM
const tabelloneEl = document.querySelector('#tabellone');
const ultimoNumeroEl = document.querySelector('#ultimo-numero');
const cronologiaEl = document.querySelector('#cronologia');
const btnEstrai = document.querySelector('#estrai');
const btnReset = document.querySelector('#reset');

// 1. Funzione che crea il tabellone di 90 numeri ed evidenzia quelli usciti
const rendiTabellone = () => {
    tabelloneEl.innerHTML = ''; // Svuota il tabellone prima di rigenerarlo

    for (let i = 1; i <= 90; i++) {
        const divNumero = document.createElement('div');
        divNumero.classList.add('numero');
        divNumero.textContent = i;

        // Se il numero è tra quelli già estratti, aggiunge la classe .uscito
        if (usciti.includes(i)) {
            divNumero.classList.add('uscito');
        }

        tabelloneEl.appendChild(divNumero);
    }
};

// 2. Funzione che pesca un numero casuale tra quelli non ancora estratti
const estrai = () => {
    if (usciti.length >= 90) {
        alert('Tutti i numeri sono stati estratti!');
        return;
    }

    let numeroEstratto;
    
    // Genera un numero finché non ne trova uno non presente nell'array usciti
    do {
        numeroEstratto = Math.floor(Math.random() * 90) + 1;
    } while (usciti.includes(numeroEstratto));

    // Aggiunge il numero all'array
    usciti.push(numeroEstratto);

    // Aggiorna l'interfaccia grafica
    ultimoNumeroEl.textContent = numeroEstratto;
    rendiTabellone();
    rendiCronologia();
};

// 3. Funzione che mostra gli ultimi 10 estratti (dal più recente al meno recente)
const rendiCronologia = () => {
    if (usciti.length === 0) {
        cronologiaEl.textContent = 'Nessun numero estratto.';
        return;
    }

    // Prende gli ultimi 10 elementi e li inverte per mostrare l'ultimo estratto per primo
    const ultimiDieci = usciti.slice(-10).reverse();
    cronologiaEl.textContent = ultimiDieci.join(', ');
};

// 4. Listener per i click sui bottoni Estrai e Reset
btnEstrai.addEventListener('click', estrai);

btnReset.addEventListener('click', () => {
    usciti = []; // Svuota l'array
    ultimoNumeroEl.textContent = '-'; // Ripristina il trattino dell'ultimo estratto
    rendiTabellone(); // Svuota l'evidenziazione sul tabellone
    rendiCronologia(); // Ripristina il testo della cronologia
});

// Inizializzazione del tabellone all'avvio della pagina
rendiTabellone();