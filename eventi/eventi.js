document.addEventListener("DOMContentLoaded", function() {
    // Funzione per ottenere il parametro dalla URL
    function getUrlParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Controlliamo se l'elemento #events-list esiste
    const listaEventi = document.getElementById("events-list");
    if (!listaEventi) {
        console.error("Elemento #events-list non trovato.");
        return; // Se non troviamo l'elemento, fermiamo l'esecuzione del codice
    }

    // Otteniamo i parametri dalla URL
    const socio = getUrlParam('socio');
    const produzione = getUrlParam('produzione');
    const spazio = getUrlParam('spazio');

    // Array di colori allegri e variegati
    const colori = [
        '#FFDDC1', // Pesca chiaro
        '#FFABAB', // Rosa pallido
        '#FFC3A0', // Arancio chiaro
        '#FF677D', // Rosa intenso
        '#F6D02F', // Giallo sole
        '#31A2AC', // Blu turchese
        '#61C0BF', // Verde acqua
        '#ACD8AA', // Verde menta
        '#FF9A8B', // Rosa brillante
        '#FFB3B3', // Rosa tenue
        '#F8C8DC', // Rosa polvere
        '#D4A5A5', // Rosso polveroso
        '#A7C7E7', // Blu cielo chiaro
        '#F8D49D', // Giallo dorato
        '#6B4226', // Marrone chiaro (per un tocco caldo)
        '#A1D6E2', // Azzurro chiaro
        '#C4E1C1', // Verde pastello
        '#F4A300', // Arancio dorato
        '#D9BF77', // Giallo senape
        '#FF6F61'  // Corallo
    ];

    // Carica il CSV con PapaParse
    Papa.parse("https://raw.githubusercontent.com/loressm/provasito/refs/heads/master/eventi.csv", { // Usa il link raw di GitHub
        download: true,
        complete: function(results) {
            // Logghiamo i dati per vedere se sono caricati correttamente
            console.log("Dati CSV caricati correttamente:", results.data);

            let eventi = results.data;

            // Filtriamo le righe vuote se necessario
            eventi = eventi.filter(evento => evento[0] && evento[1] && evento[2] && evento[3] && evento[4]);

            // Se c'è il parametro socio, filtra gli eventi per socio
            if (socio) {
                eventi = eventi.filter(evento => evento[2].toLowerCase() === socio.toLowerCase());
            }

            // Se c'è il parametro produzione, filtra gli eventi per produzione
            if (produzione) {
                eventi = eventi.filter(evento => evento[1].toLowerCase() === produzione.toLowerCase());
            }

            // Se c'è il parametro spazio, filtra gli eventi per spazio
            if (spazio) {
                eventi = eventi.filter(evento => evento[3].toLowerCase() === spazio.toLowerCase());
            }

            // Visualizza gli eventi
            if (eventi.length === 0) {
                listaEventi.innerHTML = "<p>Non ci sono eventi per questi filtri.</p>";
            } else {
                eventi.forEach((evento, index) => {
                    let eventoDiv = document.createElement("div");
                    eventoDiv.classList.add("evento");

                    // Assegna un colore casuale dall'array colori
                    const coloreCasuale = colori[index % colori.length];
                    eventoDiv.style.backgroundColor = coloreCasuale;
                    eventoDiv.style.padding = "15px";
                    eventoDiv.style.marginBottom = "20px";
                    eventoDiv.style.borderRadius = "8px";
                    eventoDiv.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)"; // Ombra per il risultato

                    eventoDiv.innerHTML = `
                        <h4>${evento[1] || 'Produzione non disponibile'}</h4>
                        <p><strong>Data:</strong> ${evento[0] || 'Data non disponibile'}</p>
                        <p><strong>Socio:</strong> ${evento[2] || 'Socio non disponibile'}</p>
                        <p><strong>Spazio:</strong> ${evento[3] || 'Spazio non disponibile'}</p>
                        <p><strong>Descrizione:</strong> ${evento[4] || 'Descrizione non disponibile'}</p>
                    `;
                    listaEventi.appendChild(eventoDiv);
                });
            }
        },
        error: function(error) {
            console.error("Errore nel caricamento del CSV:", error);
        }
    });
});
