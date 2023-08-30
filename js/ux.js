const contrasena = document.getElementById('contrasena');
const ojo = document.getElementById('ojo');

function mostrar() { 
    if (contrasena.type == 'password') {
        ojo.src = '/img/ojo con barra.png';
        contrasena.type = 'text';
    } else {
        ojo.src = '/img/ojo.png';
        contrasena.type = 'password';
    }
}

ojo.addEventListener('click', mostrar);
const botondarkmode = document.querySelector("#boton-darkmode");
const body = document.body;
const h1= document.querySelector("h1")
const form = document.querySelector("form")
const recordarbox = document.querySelector("#recordarcontraseñaosc")
const pespecial = document.querySelector("#registradoosc")

botondarkmode.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    h1.classList.toggle("h1-darkmode");
    form.classList.toggle("dark-mode")
    recordarbox.classList.toggle("luz")
    pespecial.classList.toggle("luz")
    botondarkmode.classList.toggle("active")
});
botondarkmode.addEventListener('click', () =>{
    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "on");
    } else {
        localStorage.setItem("darkMode", "off");
    }
});







