const contrasena = document.getElementById('contrasena');
const ojo = document.getElementById('ojo');

function mostrar() { 
    if (contrasena.type == 'password') {
        ojo.src = '/subgrupo4/img/ojo con barra.png';
        contrasena.type = 'text';
    } else {
        ojo.src = '/subgrupo4/img/ojo.png';
        contrasena.type = 'password';
    }
}

ojo.addEventListener('click', mostrar);





