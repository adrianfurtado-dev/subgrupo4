function mostrar(){
    var contraseña = document.getElementById('contrasena');
    if(contraseña.type == 'password'){
        contraseña.type = 'text'
    } else{
        contraseña.type = 'password'
    }
}
const ojo= document.getElementById('ojo')
ojo.addEventListener('click', mostrar)





