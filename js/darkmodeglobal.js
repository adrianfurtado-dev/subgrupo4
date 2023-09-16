
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');

    // Guardar el estado en localStorage
    const isDarkModeEnabled = body.classList.contains('dark-mode');
    localStorage.setItem('darkModeEnabled', isDarkModeEnabled);
}

function applyDarkModePreference() {
    const body = document.body;
    const isDarkModeEnabled = localStorage.getItem('darkModeEnabled') === 'true';

    if (isDarkModeEnabled) {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
}

const darkModeButton = document.getElementById('boton-darkmode');
darkModeButton.addEventListener('click', toggleDarkMode);

applyDarkModePreference();