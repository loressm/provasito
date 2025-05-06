document.addEventListener('DOMContentLoaded', function () {
    // Carica il contenuto dell'header
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;

            // Aggiungi la funzionalità dell'hamburger menu
            const hamburger = document.getElementById('hamburger');
            const navLinks = document.querySelector('.navbar ul');

            hamburger.addEventListener('click', () => {
                navLinks.classList.toggle('open'); // Aggiungi o rimuovi la classe 'open'
                hamburger.classList.toggle('active'); // Aggiungi/rimuovi classe attiva per l'hamburger

                if (navLinks.classList.contains('open')) {
                    hamburger.style.position = 'fixed';
                    hamburger.style.top = '10px';
                    hamburger.style.right = '10px';
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    hamburger.style.position = 'absolute';
                    hamburger.style.top = '';
                    hamburger.style.right = '';
                }
            });

            // Gestione dei sottomenu con effetto slide
            const dropdownLinks = document.querySelectorAll('.navbar .dropdown > a');

            dropdownLinks.forEach(link => {
                link.addEventListener('click', function (e) {
                    const submenu = this.nextElementSibling;

                    if (submenu && submenu.classList.contains('submenu')) {
                        e.preventDefault();

                        const isOpen = submenu.classList.contains('open');

                        // Chiudi tutti gli altri sottomenu
                        document.querySelectorAll('.submenu').forEach(menu => {
                            menu.classList.remove('open');
                            menu.style.maxHeight = null;
                            menu.style.paddingTop = '';
                            menu.style.paddingBottom = '';
                        });

                        // Se non era aperto, aprilo con effetto slide
                        if (!isOpen) {
                            submenu.classList.add('open');
                            submenu.style.maxHeight = submenu.scrollHeight + "px";
                            submenu.style.paddingTop = "10px";
                            submenu.style.paddingBottom = "10px";
                        }
                    }
                });
            });

            // Chiudi hamburger solo se clic su link senza submenu
            const navLinksItems = document.querySelectorAll('nav ul li > a');

            navLinksItems.forEach(link => {
                link.addEventListener('click', function () {
                    const submenu = this.nextElementSibling;

                    if (!submenu || !submenu.classList.contains('submenu')) {
                        if (navLinks.classList.contains('open')) {
                            navLinks.classList.remove('open');
                            hamburger.classList.remove('active');
                            hamburger.style.position = 'absolute';
                            hamburger.style.top = '';
                            hamburger.style.right = '';
                        }
                    }
                });
            });
        })
        .catch(error => console.error('Errore nel caricamento dell\'header:', error));
});
