//const para la función monstrar contraseña
const contrasena = document.getElementById('contrasena');
const ojo = document.getElementById('ojo');
//Función mostrar contraseña
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
//consts para activar el modo oscuro en ambos forms
const botondarkmode = document.querySelector("#boton-darkmode");
const body = document.body;
const h1= document.querySelector("h1")
const form = document.querySelector("form")
const recordarbox = document.querySelector("#recordarcontraseñaosc")
const pespecial = document.querySelector("#registradoosc")
const registroform = document.querySelector("#signupform")
const pregistrado = document.getElementById('yaregistrado')
const usuario = document.querySelector('#usuario')
const contraseñap= document.querySelector('#contrasena')
const registrousuario = document.querySelector('#registrousuario')
const fecha = document.querySelector('#fecha')
const ingreseE = document.querySelector('#emailregistro')
const registcontraseña = document.querySelector('#contraseñaregistro')
const reppitcontraseña = document.querySelector('#repitacontraseña')
const calendario = document.querySelector('input[type="date"]')
const parrafoF = document.querySelector('#ParrafoF')
const usuariologin = document.querySelector('#usuario')
const botondarkmodeRegistro = document.querySelector('#boton-darkmode-registro')
const formregistro = document.querySelector('#signupform');
const formlogin = document.getElementById('formlogin');
const terminos= document.getElementById('terminos')
const textofecha=document.getElementById('texto-fecha')
let darkModeActive = false;
//Función para alternar el modo oscuro entre ambos forms
function toggleDarkMode() {
    darkModeActive = !darkModeActive; 

    if (darkModeActive) {
        body.classList.add("dark-mode");
        formlogin.classList.add("dark-mode");
        formregistro.classList.add("dark-mode");
        botondarkmode.classList.toggle("active");
        h1.classList.add("luz");
        usuario.classList.add("luz");
        contraseñap.classList.add("luz");
        ojo.classList.add("luz");
        recordarbox.classList.add("luz");
        pespecial.classList.add("luz");
        botondarkmodeRegistro.classList.toggle("active");
        fecha.classList.add("luz")
        ingreseE.classList.add("holdersreg")
        registcontraseña.classList.add("holdersreg")
        reppitcontraseña.classList.add("holdersreg")
        calendario.classList.add("activecal")
        registrousuario.classList.add("holdersreg")
        pregistrado.classList.add("luz")
        terminos.classList.add("luz")
        requisitos.classList.add("luz")
        parrafoF.classList.add("luz")
        textofecha.classList.add(("luz"))

    } else {
        body.classList.remove("dark-mode");
        formlogin.classList.remove("dark-mode");
        formregistro.classList.remove("dark-mode");
        botondarkmode.classList.toggle("active");
        h1.classList.remove("luz");
        usuario.classList.remove("luz");
        contraseñap.classList.remove("luz");
        ojo.classList.remove("luz");
        recordarbox.classList.remove("luz");
        pespecial.classList.remove("luz");
        botondarkmodeRegistro.classList.toggle("active");
        registrousuario.classList.remove("holdersreg");
        fecha.classList.remove("luz")
        ingreseE.classList.remove("holdersreg")
        registcontraseña.classList.remove("holdersreg")
        reppitcontraseña.classList.remove("holdersreg")
        calendario.classList.remove("luz")
        pregistrado.classList.remove("luz")
        terminos.classList.remove("luz")
        body.classList.add("luzlenta")
        requisitos.classList.remove("luz")
        parrafoF.classList.remove("luz")
        textofecha.classList.remove(("luz"))

    }
}

botondarkmodeRegistro.addEventListener("click", toggleDarkMode);
botondarkmode.addEventListener('click', toggleDarkMode);


