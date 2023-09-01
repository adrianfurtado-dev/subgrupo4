const loginf = document.getElementById('divformlogin')
const loginbtn = document.getElementById('loginbtn')
const Msignup = document.getElementById('formsignup')
const signupbtn = document.getElementById('registro')
const btndarkmode = document.querySelector('#boton-darkmode')
//Determina la fuerza de la contraseña según los criterios dentro de la función
function fuerza(contraseña){
    let i=0
    if(contraseña.length > 6){
        i++
    }
    if(contraseña.length >=10){
        i++
    }
    if(/[A-Z]/.test(contraseña)){
        i++
    }
    if(/[0-9]/.test(contraseña)){
        i++;
    }
    if(/[A-Za-z0-8]/.test(contraseña)){
        i++
    }
    return i;
}
let medidor = document.querySelector('.medidor')
let barra = document.querySelector('.fuerza')
var str = document.getElementById('ParrafoF')
//Aplica las clases a la contraseña según se vaya actualizando
document.addEventListener('input', function(e){
    let contraseña = document.querySelector('#contraseñaregistro').value;
    let barra = fuerza(contraseña)
    if(barra ===0){
        medidor.style.display = 'none'
        
    } else if(barra >0) {
        medidor.style.display = 'block'
        
    }
    if( barra <= 2){
        medidor.classList.add('debil')
        medidor.classList.remove('medio')
        medidor.classList.remove('fuerte')
        str.innerHTML = "La contraseña es débil"
        
    } else if( barra >= 2 && barra <=4){
        medidor.classList.remove('debil')
        medidor.classList.add('medio')
        medidor.classList.remove('fuerte')
        str.innerHTML = "La contraseña es moderada"
        
    } else{
        medidor.classList.remove('debil')
        medidor.classList.remove('medio')
        medidor.classList.add('fuerte')
        str.innerHTML = "La contraseña es fuerte"
        

        }
    
})
const contraseñaregistro = document.querySelector('#contraseñaregistro')
const requisitos = document.querySelector('.requisitos-contraseña')
//Muestra una tabla con sugerencias para la contraseña
contraseñaregistro.addEventListener('click', () =>{
    requisitos.style.display = 'block'
})
//Si se clickea fuera del campo de texto, desaparece la tabla
document.addEventListener('click', (event) =>{
    if(event.target !== contraseñaregistro){
        requisitos.style.display ='none'
    }
})
const signup = document.getElementById('signupform');
const mensajeError = document.getElementById('mensaje-error')
//Validación de si los campos estan rellenados y el email cumple el formato + envío
signup.addEventListener('submit', function(event){
    event.preventDefault();
    const usuario= document.getElementById('registrousuario').value;
    const email = document.getElementById('emailregistro').value;
    const password = document.getElementById('contraseñaregistro').value;
    const fecha = document.getElementById('fecha').value;
    if (usuario === '' || email === '' || password === '' || fecha === ''){
        mensajeError.textContent = 'Se requiere llenar todos los campos'
        return;
    }
    const formatoemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatoemail.test(email)){
        mensajeError.textContent = 'Ingrese una dirección email valida';
        return;
    }
    mensajeError.textContent = ''
    signup.submit()
    
    window.location.href = 'index.html'
    Msignup.reset();
});
//Verifica si ambas contraseñas son iguales, en caso de serlo imprime un mensaje, en caso contrario no actua.
const repitacontraseñainput = document.getElementById('repitacontraseña');
repitacontraseñainput.addEventListener('input', () => {
    const contraseña = document.getElementById('contraseñaregistro').value;
    const repitacontraseña = repitacontraseñainput.value;
    if (contraseña !== repitacontraseña) {
        mensajeError.textContent = 'Las contraseñas no coinciden';
        mensajeError.style.color = 'red';
    } else {
        mensajeError.textContent = '';
    }
    if ( contraseña && repitacontraseña === ''){
        mensajeError.textContent = ''
    }
});
//Se mostrara el formulario de registro cuando se presione el enunciado registrese aquí, y volvera al login si se presiona en Ingrese aquí.
function mostrarregistro() {
    loginf.style.display = 'none';
    Msignup.style.display = 'block';
    btndarkmode.style.bottom = '5px';
}

function mostrarlogin() {
    Msignup.style.display = 'none';
    loginf.style.display = 'block';
    btndarkmode.style.bottom = '15rem';
}

document.addEventListener('DOMContentLoaded', function() {
    event.preventDefault();
    medidor.style.display = 'none';
    requisitos.style.display = 'none';
    signupbtn.addEventListener('click', mostrarregistro);
    loginbtn.addEventListener('click', mostrarlogin);
});
  
