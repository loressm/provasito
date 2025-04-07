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

    // Carica il CSV con PapaParse
    Papa.parse("eventi.csv", {
        download: true,
        complete: function(results) {
            // Logghiamo i dati per vedere se sono caricati correttamente
            console.log(results.data); // Aggiungi questa riga per debug

            let eventi = results.data;
            // Rimuovi temporaneamente il filtro
            let eventiFiltrati = eventi;  // Usa tutti gli eventi senza filtri

            // Visualizza gli eventi
            if (eventiFiltrati.length === 0) {
                listaEventi.innerHTML = "<p>Non ci sono eventi per questo filtro.</p>";
            } else {
                eventiFiltrati.forEach(evento => {
                    let eventoDiv = document.createElement("div");
                    eventoDiv.classList.add("evento");
                    eventoDiv.innerHTML = `
                        <h4>${evento.Produzioni || 'Produzione non disponibile'}</h4>
                        <p><strong>Data:</strong> ${evento.Data || 'Data non disponibile'}</p>
                        <p><strong>Socio:</strong> ${evento.Socio || 'Socio non disponibile'}</p>
                        <p><strong>Spazio:</strong> ${evento.Spazi || 'Spazio non disponibile'}</p>
                        <p><strong>Descrizione:</strong> ${evento.Descrizione || 'Descrizione non disponibile'}</p>
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
