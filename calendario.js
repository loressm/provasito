// JavaScript per il calendario
const events = {
    '2025-02-10': 'Evento di esempio 1',
    '2025-02-12': 'Evento speciale il 12 febbraio!',
    '2025-02-15': 'Evento di esempio 2',
    '2025-02-20': 'Evento di esempio 3',
    '2025-03-05': 'Evento di esempio 4',
    '2025-03-10': 'Conferenza su <b>JavaScript</b>',
    '2025-06-20': 'Festa estiva <b>super</b> divertente!',
};

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
    const eventDescription = events[eventDate] || 'Non ci sono eventi questo giorno';
    const eventBox = document.getElementById('event-box');
    eventBox.style.display = 'block';
    eventBox.innerHTML = eventDescription;
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
