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
    }
})
