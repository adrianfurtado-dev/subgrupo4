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
    if (ojo.classList.contains("fa-eye")) {
        ojo.classList.remove("fa-eye");
        ojo.classList.add("fa-eye-slash");
    } else {
        ojo.classList.remove("fa-eye-slash");
        ojo.classList.add("fa-eye");
    }

}

ojo.addEventListener('click', mostrar);
const botondarkmode = document.querySelector("#boton-darkmode");
const body = document.body;
const h1= document.querySelector("h1")
const form = document.querySelector("form")
const recordarbox = document.querySelector("#recordarcontraseñaosc")
const pespecial = document.querySelector("#registradoosc")
const registroform = document.querySelector("#signupform")
const pregistrado = document.querySelector('#yaregistrado')
const usuario = document.querySelector('#usuario')
const contraseñap= document.querySelector('#contrasena')
const probando = document.querySelector('#registrousuario')
const fecha = document.querySelector('#fecha')
const ingreseE = document.querySelector('#emailregistro')
const registcontraseña = document.querySelector('#contraseñaregistro')
const reppitcontraseña = document.querySelector('#repitacontraseña')
const calendario = document.querySelector('input[type="date"]')
const parrafoF = document.querySelector('#ParrafoF')



botondarkmode.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    h1.classList.toggle("h1-darkmode");
    form.classList.toggle("dark-mode")
    recordarbox.classList.toggle("luz")
    pespecial.classList.toggle("luz")
    registroform.classList.toggle("dark-mode")
    pregistrado.classList.toggle("luz")
    usuario.classList.toggle("activep")
    contraseñap.classList.toggle("activep")
    title.classList.toggle("luz")
    ojo.classList.toggle("activer")
    probando.classList.toggle("pblanco")
    fecha.classList.toggle("fechac")
    ingreseE.classList.toggle("eblanco")
    registcontraseña.classList.toggle("cblanco")
    reppitcontraseña.classList.toggle("rblanco")
    calendario.classList.toggle("activecal")
    parrafoF.classList.toggle("luz")
    requisitos.classList.toggle("luz")
    botondarkmode.classList.toggle("active")
});
botondarkmode.addEventListener('click', () =>{
    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "on");
    } else {
        localStorage.setItem("darkMode", "off");
    }
});






