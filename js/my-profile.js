let profilePic = document.getElementById("profile-Pic");
let inputFile = document.getElementById("input-file");

inputFile.onchange = function(){
    profilePic.src = URL.createObjectURL(inputFile.files[0]);
}

document.addEventListener('DOMContentLoaded', () => {
    let emailValue = sessionStorage.getItem("email");

    // Asignar el valor al campo de texto 'emailperfil'
    let emailProfile = document.getElementById('emailperfil');
    if (emailValue) {
        emailProfile.value = emailValue;
        loadUserData();
    } else {
        window.location.href = '/login.html'
    }
})

// Función para cargar los datos del usuario en el formulario
function loadUserData() {
    // Obtener datos almacenados localmente
    let storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData) {
        document.getElementById('firstname').value = storedData.firstName;
        document.getElementById('secondname').value = storedData.secondName;
        document.getElementById('lastname').value = storedData.lastName;
        document.getElementById('secondlastname').value = storedData.secondLastName;
        document.getElementById('phonenumber').value = storedData.phoneNumber;
    }
}





