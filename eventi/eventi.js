// Funzione per ottenere il parametro dalla URL
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Funzione per caricare e filtrare gli eventi dal CSV
function loadEvents() {
    Papa.parse('https://raw.githubusercontent.com/loressm/provasito/refs/heads/master/eventi.csv', {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: function(results) {
            console.log(results); // Log per debug
            const socioParam = getUrlParam('socio');
            console.log("Parametro socio nell'URL:", socioParam); // Log per debug

            // Filtra gli eventi in base al parametro socio
            const filteredEvents = results.data.filter(event => {
                // Controlla che 'Socio' esista prima di confrontarlo
                return socioParam && event.Socio && event.Socio.toLowerCase() === socioParam.toLowerCase();
            });

            // Mostra gli eventi filtrati
            displayEvents(filteredEvents);
        }
    });
}

// Funzione per visualizzare gli eventi filtrati sulla pagina
function displayEvents(events) {
    const eventsContainer = document.getElementById('events-list');
    eventsContainer.innerHTML = '';  // Pulisce la lista degli eventi

    if (events.length === 0) {
        eventsContainer.innerHTML = "<p>Nessun evento trovato per questo socio.</p>";
    } else {
        events.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.classList.add('event');
            eventElement.innerHTML = `
                <h3>${event.Produzioni}</h3>
                <p><strong>Data:</strong> ${event.Data}</p>
                <p><strong>Socio:</strong> ${event.Socio}</p>
                <p><strong>Spazio:</strong> ${event.Spazi}</p>
                <p><strong>Descrizione:</strong> ${event.Descrizione}</p>
            `;
            eventsContainer.appendChild(eventElement);
        });
    }
}

// Funzione per gestire il click sul bottone "Scopri i miei spettacoli"
document.getElementById('show-events-button').addEventListener('click', function() {
    const socioParam = getUrlParam('socio');
    if (!socioParam) {
        alert("Seleziona un socio per vedere gli eventi.");
        return;
    }

    loadEvents();  // Carica gli eventi per il socio selezionato
});