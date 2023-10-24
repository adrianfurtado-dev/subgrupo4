window.addEventListener('DOMContentLoaded', (event) => {
    function toggleDarkMode() {
        const body = document.body;
        const modalContent = document.querySelector('.modal-content');

        const isDarkModeEnabled = body.classList.contains('dark-mode');
        isDarkModeEnabled ? body.classList.remove('dark-mode') : body.classList.add('dark-mode');
        modalContent.style.backgroundColor = isDarkModeEnabled ? '#fff' : '#333';
        modalContent.style.color = isDarkModeEnabled ? '#000' : '#fff';

        localStorage.setItem('darkModeEnabled', !isDarkModeEnabled);
    }

    function applyDarkModePreference() {
        const body = document.body;
        const modalContent = document.querySelector('.modal-content');
        const isDarkModeEnabled = localStorage.getItem('darkModeEnabled') === 'true';

        isDarkModeEnabled ? body.classList.add('dark-mode') : body.classList.remove('dark-mode');
        modalContent.style.backgroundColor = isDarkModeEnabled ? '#333' : '#fff';
        modalContent.style.color = isDarkModeEnabled ? '#fff' : '#000';
        
    }

    const darkModeButton = document.getElementById('boton-darkmode-registro');
    if (darkModeButton) {
        darkModeButton.addEventListener('click', toggleDarkMode);
    }

    applyDarkModePreference();
});
