document.addEventListener("DOMContentLoaded", function() {
    // Funzione per ottenere il parametro dalla URL
    function getUrlParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Carica il CSV con PapaParse
    Papa.parse("eventi.csv", {
        download: true,
        complete: function(results) {
            let eventi = results.data;
            let parametro = getUrlParam("socio") || getUrlParam("produzione") || getUrlParam("spazio");
            
            // Se parametro è null o undefined, non tentiamo di filtrare
            if (!parametro) {
                console.log("Nessun parametro di filtro trovato.");
            }

            // Filtra gli eventi in base al parametro
            let eventiFiltrati = eventi.filter(evento => {
                if (parametro) {
                    // Controlliamo se i dati sono presenti e non nulli/undefined
                    if (getUrlParam("socio") && evento.Socio && evento.Socio.toString().toLowerCase().includes(parametro.toLowerCase())) {
                        return true; // Modifica qui per socio
                    }
                    if (getUrlParam("produzione") && evento.Produzioni && evento.Produzioni.toString().toLowerCase().includes(parametro.toLowerCase())) {
                        return true; // Modifica qui per produzione
                    }
                    if (getUrlParam("spazio") && evento.Spazi && evento.Spazi.toString().toLowerCase().includes(parametro.toLowerCase())) {
                        return true; // Modifica qui per spazio
                    }
                    return false; // Non troviamo corrispondenza
                }
                return true; // Se non c'è parametro, non facciamo alcun filtro
            });

            // Visualizza gli eventi filtrati
            let listaEventi = document.getElementById("events-list");
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
