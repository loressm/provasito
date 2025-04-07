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
                // Confronto case-insensitive
                return socioParam && event.Socio.toLowerCase() === socioParam.toLowerCase();
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

// Calendario
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let selectedDate = null;

const monthNames = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
const weekdays = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];

function renderCalendar() {
    // Nascondi la descrizione dell'evento quando cambi mese
    const eventBox = document.getElementById('event-box');
    eventBox.style.display = 'none';

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const monthName = monthNames[currentMonth];
    document.getElementById('calendar-title').textContent = `Scopri gli eventi di ${monthName} ${currentYear}`;
    const numDays = lastDay.getDate();
    let calendarHtml = '';
    for (let i = 0; i < weekdays.length; i++) {
        calendarHtml += `<div class="day">${weekdays[i].slice(0, 3)}</div>`;
    }
    const firstDayOfWeek = (firstDay.getDay() + 6) % 7;
    for (let i = 0; i < firstDayOfWeek; i++) {
        calendarHtml += `<div class="day"></div>`;
    }
    for (let day = 1; day <= numDays; day++) {
        const dateStr = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        calendarHtml += `<div class="day" data-date="${dateStr}">${day}</div>`;
    }
    const lastDayOfWeek = (firstDay.getDay() + numDays) % 7;
    for (let i = lastDayOfWeek; i < 6; i++) {
        calendarHtml += `<div class="day"></div>`;
    }
    document.getElementById('calendar').innerHTML = calendarHtml;
}

document.getElementById('prev-month').addEventListener('click', function () {
    if (currentMonth > new Date().getMonth()) {
        currentMonth--;
        renderCalendar();
    }
});

document.getElementById('next-month').addEventListener('click', function () {
    if (currentMonth < 11) {
        currentMonth++;
        renderCalendar();
    }
});

renderCalendar();

// Menu Hamburger per mobile
document.getElementById('hamburger').addEventListener('click', function() {
    const menu = document.querySelector('nav ul');
    const hamburger = document.getElementById('hamburger');
    
    // Attiva/disattiva la classe 'active' per l'animazione dell'hamburger e del menu
    menu.classList.toggle('active');
    hamburger.classList.toggle('active');
});
