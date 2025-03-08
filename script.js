// Aggiungi questo codice nel file script.js
document.addEventListener("DOMContentLoaded", function() {
    // Seleziona l'icona dell'hamburger e il menu di navigazione
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.querySelector("nav ul");

    // Quando l'icona dell'hamburger viene cliccata, attiva/disattiva la classe 'active'
    hamburger.addEventListener("click", function() {
        navMenu.classList.toggle("active");
        hamburger.classList.toggle("active");
    });

    // Chiudi il menu quando un link viene cliccato (opzionale)
    navMenu.addEventListener("click", function(event) {
        if (event.target.tagName === "A") {
            navMenu.classList.remove("active");
            hamburger.classList.remove("active");
        }
    });
});
