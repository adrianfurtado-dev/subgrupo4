// Se obtiene el producto seleccionado en el localStorage
const productID = localStorage.getItem('productoSeleccionado');
const container = document.querySelector('#product-container')

const showProduct = data => {

    const imgs = data.images.map(element => `<img src="${element}" width="250">`).join('');

    container.innerHTML += `
    <h2 class="my-3">${data.name}</h2>
    <hr/>
    <div class="d-flex flex-column gap-3">
        <div>
            <strong>Precio</strong><br/>
            <span>${data.currency} ${data.cost}</span>
        </div>
        <div>
            <strong>Descripción</strong><br/>
            <span>${data.description}</span>
        </div>
        <div>
            <strong>Categoría</strong><br/>
            <span>${data.category}</span>
        </div>
        <div>
            <strong>Cantidad de vendidos</strong><br/>
            <span>${data.soldCount}</span>
        </div>
        <div>
            <strong>Imágenes ilustrativas</strong><br/>
            <div class="d-flex gap-2">
                ${imgs}
            </div>
        </div>
    </div>
    `;
}

const requestToAPI = URL => {
    fetch(URL)
    .then(response => response.json())
    .then(data => showProduct(data))
    .catch(error => console.error('Error to display product: ', error))
}

const domLoaded = (productID) => {
    const API_URL = `https://japceibal.github.io/emercado-api/products/${productID}.json`;
    requestToAPI(API_URL);
};

document.addEventListener('DOMContentLoaded', domLoaded(productID));