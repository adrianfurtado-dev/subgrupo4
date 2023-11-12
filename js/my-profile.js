let profilePic = document.getElementById("profile-Pic");
let inputFile = document.getElementById("input-file");

inputFile.onchange = function () {
    profilePic.src = URL.createObjectURL(inputFile.files[0]);
}

document.addEventListener('DOMContentLoaded', () => {
    let emailValue = sessionStorage.getItem("email") || localStorage.getItem('email');

    // Asignar el valor al campo de texto 'emailperfil'
    let emailProfile = document.getElementById('emailperfil');
    emailProfile.value = emailValue;
    loadUserData();
})

const firstNameInput = document.getElementById("firstname");
const secondNameInput = document.getElementById("secondname");
const lastNameInput = document.getElementById("lastname");
const secondLastNameInput = document.getElementById("secondlastname");
const phoneInput = document.getElementById("phonenumber");

firstNameInput.addEventListener("input", validateFirstName);
lastNameInput.addEventListener("input", validateLastName);

phoneInput.addEventListener("input", function () {
    // Elimina cualquier carácter que no sea un número
    this.value = this.value.replace(/\D/g, "");
});

function onlyLetters(event) {
    // Elimina cualquier carácter que no sea una letra o espacio
    event.target.value = event.target.value.replace(/[^a-zA-Z\s]/g, "");
}

// Asignar la función a los eventos de entrada de cada input
firstNameInput.addEventListener("input", onlyLetters);
secondNameInput.addEventListener("input", onlyLetters);
lastNameInput.addEventListener("input", onlyLetters);
secondLastNameInput.addEventListener("input", onlyLetters);

// Validar nombre y apellido
function validateFirstName() {
    if (firstNameInput.value.trim() === "") {
        firstNameInput.classList.remove("is-valid");
        firstNameInput.classList.add("is-invalid");
    } else {
        firstNameInput.classList.remove("is-invalid");
        firstNameInput.classList.add("is-valid");
    }
}

function validateLastName() {
    if (lastNameInput.value.trim() === "") {
        lastNameInput.classList.remove("is-valid");
        lastNameInput.classList.add("is-invalid");
    } else {
        lastNameInput.classList.remove("is-invalid");
        lastNameInput.classList.add("is-valid");
    }
}

// Validar campos requeridos para envio de formulario
function validateRequiredFields() {
    let requiredFields = document.querySelectorAll("input[required]");
    let allValid = true;

    requiredFields.forEach(field => {
        if (field.value.trim() === "") {
            field.classList.add("is-invalid");
            allValid = false;
        } else {
            field.classList.remove("is-invalid");
        }
    });

    return allValid;
}

// Almacenar en el localStorage
function saveData() {
    if (validateRequiredFields()) {
        let userData = {
            firstName: firstNameInput.value,
            secondName: secondNameInput.value,
            lastName: lastNameInput.value,
            secondLastName: secondLastNameInput.value,
            phoneNumber: phoneInput.value,
        };

        localStorage.setItem("userData", JSON.stringify(userData));
        alert("Cambios guardados");
    } else {
        alert("Por favor, completa todos los campos obligatorios.");
    }
}

function loadUserData() {
    // Obtener datos almacenados localmente
    let storedData = JSON.parse(localStorage.getItem("userData"));

    if (storedData) {
        // Asignar los valores a los campos del formulario
        document.getElementById('firstname').value = storedData.firstName || '';
        document.getElementById('secondname').value = storedData.secondName || '';
        document.getElementById('lastname').value = storedData.lastName || '';
        document.getElementById('secondlastname').value = storedData.secondLastName || '';
        document.getElementById('phonenumber').value = storedData.phoneNumber || '';
    }
}

// Asignar evento al botón de guardar
document.querySelector('.btn-primary').addEventListener('click', saveData);