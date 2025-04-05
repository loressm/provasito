let currentSlide = 0;
const slides = document.querySelectorAll("#slideshow .slide");
const totalSlides = slides.length;

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
setInterval(autoChangeSlide, 5000);
