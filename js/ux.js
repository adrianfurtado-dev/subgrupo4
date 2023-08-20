const contrasena = document.getElementById('contrasena');
const ojo = document.getElementById('ojo');

function mostrar() { 
    if (contrasena.type == 'password') {
        ojo.src = "/img/ojo-con-barra.png";
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

botondarkmode.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    h1.classList.toggle("h1-darkmode");
    botondarkmode.classList.toggle("active")
});
botondarkmode.addEventListener('click', () =>{
    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "on");
    } else {
        localStorage.setItem("darkMode", "off");
    }
});




