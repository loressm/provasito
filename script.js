// Menu Hamburger per mobile
const hamburger = document.getElementById('hamburger');
const menu = document.querySelector('nav ul');

hamburger.addEventListener('click', function () {
    menu.classList.toggle('active');
    hamburger.classList.toggle('active');

    if (menu.classList.contains('active')) {
        // Menu aperto: icona fissa in alto a destra
        hamburger.style.position = 'fixed';
        hamburger.style.top = '10px';
        hamburger.style.right = '10px';
        hamburger.style.left = 'auto';
        hamburger.style.zIndex = '1000';
    } else {
        // Menu chiuso: icona torna nell’header
        hamburger.style.position = 'absolute';
        hamburger.style.top = '';
        hamburger.style.right = '';
        hamburger.style.left = '';
        hamburger.style.zIndex = '';
    }
});

// Carica eventi dal file CSV
const events = {};

fetch('https://raw.githubusercontent.com/loressm/provasito/refs/heads/master/eventi.csv')
    .then(response => response.text())
    .then(data => {
        const rows = data.split('\n');
        rows.forEach(row => {
            const columns = row.split(',');
            if (columns.length === 5) {
                const date = columns[0];
                events[date] = {
                    production: columns[1],
                    member: columns[2],
                    location: columns[3],
                    description: columns[4]
                };
            }
        });
        renderCalendar();
    })
    .catch(error => console.error('Errore nel caricamento degli eventi:', error));

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let selectedDate = null;

const monthNames = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
const weekdays = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];

function renderCalendar() {
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
        const hasEvent = events[dateStr] ? 'highlighted' : '';
        calendarHtml += `<div class="day ${hasEvent}" data-date="${dateStr}">${day}</div>`;
    }
    const lastDayOfWeek = (firstDay.getDay() + numDays) % 7;
    for (let i = lastDayOfWeek; i < 6; i++) {
        calendarHtml += `<div class="day"></div>`;
    }
    document.getElementById('calendar').innerHTML = calendarHtml;

    const prevButton = document.getElementById('prev-month');
    const nextButton = document.getElementById('next-month');
    prevButton.disabled = currentYear === new Date().getFullYear() && currentMonth <= new Date().getMonth();
    nextButton.disabled = currentYear === new Date().getFullYear() && currentMonth === 11;
}

function showEvent(eventDate) {
    const event = events[eventDate];
    const eventBox = document.getElementById('event-box');
    
    if (event) {
        eventBox.style.display = 'block';
        eventBox.innerHTML = `
            <strong>Produzione:</strong> ${event.production}<br>
            <strong>Socio:</strong> ${event.member}<br>
            <strong>Spazio:</strong> ${event.location}<br>
            <strong>Descrizione:</strong> ${event.description}
        `;
    } else {
        eventBox.style.display = 'block';
        eventBox.innerHTML = 'Non ci sono eventi questo giorno';
    }
}

document.getElementById('calendar').addEventListener('click', function (event) {
    if (event.target.classList.contains('day') && event.target.dataset.date) {
        const newSelectedDate = event.target.dataset.date;
        if (selectedDate) {
            const oldSelectedDay = document.querySelector(`[data-date="${selectedDate}"]`);
            if (oldSelectedDay) {
                oldSelectedDay.classList.remove('selected');
            }
        }
        event.target.classList.add('selected');
        selectedDate = newSelectedDate;
        showEvent(selectedDate);
    }
});

document.getElementById('prev-month').addEventListener('click', function () {
    if (currentMonth > 0) {
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

// Avvia calendario
renderCalendar();
