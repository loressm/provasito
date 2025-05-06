document.addEventListener("DOMContentLoaded", function () {
    // Sottomenu con effetto slide up/down
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
    const navLinks = document.querySelectorAll('nav ul li > a');

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            const submenu = this.nextElementSibling;

            if (!submenu || !submenu.classList.contains('submenu')) {
                const hamburger = document.getElementById('hamburger');
                const menu = document.querySelector('nav ul');
                
                if (menu.classList.contains('active')) {
                    menu.classList.remove('active');
                    hamburger.classList.remove('active');
                    hamburger.style.position = 'absolute';
                    hamburger.style.top = '';
                    hamburger.style.right = '';
                }
            }
        });
    });
});
