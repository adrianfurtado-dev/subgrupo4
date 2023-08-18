const contrasena = document.getElementById('contrasena');
const ojo = document.getElementById('ojo');

function mostrar() { 
    if (contrasena.type == 'password') {
        ojo.src = '../img/ojo con barra.png';
        contrasena.type = 'text';
    } else {
        ojo.src = '../img/ojo.png';
        contrasena.type = 'password';
    }
}

ojo.addEventListener('click', mostrar);





