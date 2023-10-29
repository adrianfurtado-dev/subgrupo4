window.addEventListener('DOMContentLoaded', (event) => {
    function toggleDarkMode() {
        const body = document.body;

        const isDarkModeEnabled = body.classList.contains('dark-mode');
        isDarkModeEnabled ? body.classList.remove('dark-mode') : body.classList.add('dark-mode');

        localStorage.setItem('darkModeEnabled', !isDarkModeEnabled);
    }

    function applyDarkModePreference() {
        const body = document.body;
        const isDarkModeEnabled = localStorage.getItem('darkModeEnabled') === 'true';

        isDarkModeEnabled ? body.classList.add('dark-mode') : body.classList.remove('dark-mode');

    }

    const darkModeButton = document.getElementById('boton-darkmode-registro');
    darkModeButton.addEventListener('click', toggleDarkMode);

    applyDarkModePreference();
});
