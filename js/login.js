// Selección de elementos del DOM
const email = document.querySelector('#usuario');
const password = document.querySelector('#contrasena');
const remember = document.querySelector('#recordar')
const loginButton = document.querySelector('#button-login');
const title = document.querySelector('#title');

// Expresión regular para validar correos electrónicos
const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

// Función que realiza la verificación de la validez del correo electrónico
const checkValidEmail = () => regex.test(email.value);

// Función que verifica la validez de una contraseña
const checkValidPassword = () => password.value.length >= 8 && password.value.length <= 13;

// Función que realiza la verificación de entradas de inicio de sesión
const checkLoginInputs = () => checkValidEmail(email.value) && checkValidPassword();

// Alerta de inicio de sesión incorrecto
const alertHTML =
`<div class="alert alert-danger max-content" id="login-alert" role="alert">
    Email o contraseña incorrectos
</div>`;

// Función para mostrar una alerta de inicio de sesión incorrecto
const loginAlert = () => {
    title.insertAdjacentHTML('afterend', alertHTML);
    setTimeout(() => {
        const alertElement = document.querySelector('#login-alert');
        alertElement.remove();
    }, 1500);
};

// Función que valida el login del usuario
function login() {
    event.preventDefault();
    if(checkLoginInputs()) {
        const storage = remember.checked ? window.localStorage : window.sessionStorage;
        storage.setItem('logged', true);
        window.location.href = '../index.html';
    } else {
        loginAlert();
    }
};

// Evento de clic en el botón de inicio de sesión
loginButton.addEventListener('click', login);