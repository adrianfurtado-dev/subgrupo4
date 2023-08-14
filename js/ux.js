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
const form = document.getElementById('login-form');

form.addEventListener('click', (event) => {
    event.preventDefault();
    const username = form.username.value;
    const password = form.password.value;

    
    if (username === 'user' && password === 'password') {
        alert('Login successful!');
    } else {
        alert('Login failed. Please check your credentials.');
    }
});


