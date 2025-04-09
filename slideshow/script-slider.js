let currentSlide = 0;
const slides = document.querySelectorAll("#slideshow .slide");
const totalSlides = slides.length;
let slideInterval;
let isPlaying = true;  // Stato della riproduzione

// Funzione per cambiare slide
function changeSlide(direction) {
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
  slides[currentSlide].classList.add("active");
}

// Funzione per cambiare slide automaticamente ogni 5 secondi
function autoChangeSlide() {
  changeSlide(1); // Passa alla slide successiva
}

// Aggiungi la classe "active" alla prima immagine all'inizio
slides[currentSlide].classList.add("active");

// Imposta l'automazione per cambiare immagine ogni 5 secondi
function startSlideshow() {
  slideInterval = setInterval(autoChangeSlide, 5000);
}

// Ferma lo slideshow
function stopSlideshow() {
  clearInterval(slideInterval);
}

// Avvia o ferma lo slideshow quando si clicca sul tasto
document.getElementById("stopButton").addEventListener("click", () => {
  if (isPlaying) {
    stopSlideshow(); // Ferma lo slideshow
    document.getElementById("stopButton").textContent = "▶"; // Cambia il simbolo in play
  } else {
    startSlideshow(); // Riavvia lo slideshow
    document.getElementById("stopButton").textContent = "❚❚"; // Cambia il simbolo in stop
  }
  isPlaying = !isPlaying; // Cambia stato
});

// Ferma lo scorrimento automatico quando si clicca una freccia
document.querySelector(".prev").addEventListener("click", () => {
  clearInterval(slideInterval); // Ferma lo scorrimento automatico
  changeSlide(-1); // Vai alla slide precedente
  startSlideshow(); // Riavvia lo slideshow
});

document.querySelector(".next").addEventListener("click", () => {
  clearInterval(slideInterval); // Ferma lo scorrimento automatico
  changeSlide(1); // Vai alla slide successiva
  startSlideshow(); // Riavvia lo slideshow
});

// Avvia lo slideshow all'inizio
startSlideshow();
