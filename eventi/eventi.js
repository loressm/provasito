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
    Papa.parse("https://raw.githubusercontent.com/loressm/provasito/refs/heads/master/eventi.csv", { // Usa il link raw di GitHub
        download: true,
        complete: function(results) {
            // Logghiamo i dati per vedere se sono caricati correttamente
            console.log("Dati CSV caricati correttamente:", results.data);

            let eventi = results.data;
            let eventiFiltrati = eventi;  // Usa tutti gli eventi senza filtri

            // Visualizza gli eventi
            if (eventiFiltrati.length === 0) {
                listaEventi.innerHTML = "<p>Non ci sono eventi per questo filtro.</p>";
            } else {
                eventiFiltrati.forEach(evento => {
                    let eventoDiv = document.createElement("div");
                    eventoDiv.classList.add("evento");
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
