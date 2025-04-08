// Eventi associati agli spazi
const eventsBySpace = {
    'teatro-paperopoli': [
        { date: '2025-06-01', description: 'Spettacolo teatrale al Teatro di Paperopoli' },
        { date: '2025-06-10', description: 'Concerto di musica al Teatro di Paperopoli' }
    ],
    'teatro-ocopoli': [
        { date: '2025-07-15', description: 'Mostra artistica al Teatro di Ocopoli' },
        { date: '2025-07-20', description: 'Seminario al Teatro di Ocopoli' }
    ],
    'teatro-topolinia': [
        { date: '2025-08-05', description: 'Spettacolo di danza al Teatro di Topolinia' },
        { date: '2025-08-12', description: 'Festa musicale al Teatro di Topolinia' }
    ]
};

// Funzione per visualizzare gli eventi di uno spazio
function filterEvents(space) {
    const events = eventsBySpace[space] || [];
    const eventBox = document.getElementById('event-box');
    eventBox.style.display = 'block';
    
    if (events.length === 0) {
        eventBox.innerHTML = 'Non ci sono eventi disponibili per questo spazio.';
    } else {
        eventBox.innerHTML = events.map(event => 
            `<p><strong>${event.date}</strong>: ${event.description}</p>`
        ).join('');
    }
}

// Funzione per mostrare/nascondere i dettagli degli spazi
function toggleSpaceDetails(spaceId) {
    const spaceDetails = document.getElementById(spaceId);
    
    // Controlla lo stato della visibilità e toggle
    if (spaceDetails.style.display === 'none' || spaceDetails.style.display === '') {
        spaceDetails.style.display = 'block';
    } else {
        spaceDetails.style.display = 'none';
    }
}
