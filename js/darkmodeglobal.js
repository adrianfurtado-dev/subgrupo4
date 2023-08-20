const botondarkmode = document.querySelector("#boton-darkmode");
const body= document.body
const lead = document.querySelector(".lead")
const h2 = document.querySelector("h2")
const cant= document.querySelector("#pcant")
const contenedor = document.querySelector(".container")
const oscurecer = document.querySelector("#cat-list-container")



botondarkmode.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    lead.classList.toggle("luz")
    h2.classList.toggle("luz")
    cant.classList.toggle("luz")
    contenedor.classList.toggle("luz")
    oscurecer.classList.toggle("dark-mode")
    botondarkmode.classList.toggle("active")
});