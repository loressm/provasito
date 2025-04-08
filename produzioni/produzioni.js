// Eventi associati alle produzioni
const eventsByProduction = {
    'il-mago-di-oz': [
        { date: '2025-06-10', description: 'Spettacolo teatrale: Il Mago di Oz' },
        { date: '2025-06-15', description: 'Rappresentazione speciale di Il Mago di Oz' }
    ],
    'il-gatto-e-la-volpe': [
        { date: '2025-07-12', description: 'Performance teatrale: Il Gatto e la Volpe' },
        { date: '2025-07-18', description: 'Spettacolo di teatro comico con Il Gatto e la Volpe' }
    ],
    'via-col-vento': [
        { date: '2025-08-20', description: 'Spettacolo teatrale: Via Col Vento' },
        { date: '2025-08-25', description: 'Rappresentazione epica di Via Col Vento' }
    ]
};

// Funzione per visualizzare gli eventi di una produzione
function filterEvents(productionId) {
    const events = eventsByProduction[productionId] || [];
    const eventBox = document.getElementById(productionId + '-events');
    eventBox.style.display = 'block';

    if (events.length === 0) {
        eventBox.innerHTML = 'Non ci sono eventi disponibili per questa produzione.';
    } else {
        eventBox.innerHTML = events.map(event => 
            `<p><strong>${event.date}</strong>: ${event.description}</p>`
        ).join('');
    }
}

// Funzione per mostrare/nascondere i dettagli di una produzione
function toggleProductionDetails(productionId) {
    const details = document.getElementById(productionId);
    const eventBox = document.getElementById(productionId + '-events');

    // Toggle visibilità della sezione dettagli della produzione
    if (details.style.display === "none" || details.style.display === "") {
        details.style.display = "block";
        // Carica e mostra gli eventi associati
        filterEvents(productionId);
    } else {
        details.style.display = "none";
        eventBox.style.display = 'none'; // Nasconde la lista degli eventi quando la produzione è nascosta
    }
}
