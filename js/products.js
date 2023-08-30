const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
let currentProductsArray = [];

document.addEventListener('DOMContentLoaded', function() {
    const url = "https://japceibal.github.io/emercado-api/cats_products/101.json";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const productosDiv = document.getElementById("productos");
            currentProductsArray = data.products; // Almacenar los productos para el ordenamiento inicial

            showProductsList(); // Mostrar los productos iniciales

            document.getElementById("sortAsc").addEventListener("click", function() {
                sortAndShowProducts(ORDER_ASC_BY_NAME);
            });

            document.getElementById("sortDesc").addEventListener("click", function() {
                sortAndShowProducts(ORDER_DESC_BY_NAME);
            });

            document.getElementById("sortByCount").addEventListener("click", function() {
                sortAndShowProducts(ORDER_BY_PROD_COUNT);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

function sortAndShowProducts(sortCriteria) {
    currentProductsArray = sortProducts(sortCriteria, currentProductsArray);
    showProductsList();
}

function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME) {
        result = array.sort(function(a, b) {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_NAME) {
        result = array.sort(function(a, b) {
            if (a.name > b.name) return -1;
            if (a.name < b.name) return 1;
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_COUNT) {
        result = array.sort(function(a, b) {
            return b.soldCount - a.soldCount;
        });
    }

    return result;
}

function showProductsList() {
    const productosDiv = document.getElementById("productos");
    productosDiv.innerHTML = "";

    currentProductsArray.forEach(product => {
        productosDiv.innerHTML += `
        <div class="row list-group-item d-flex justify-content-between">
          <div class="col-3">
            <img src="${product.image}" alt="${product.name}" class="img-thumbnail">
          </div>
          <div class="col-7">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
          </div>
          <div class="col-2">
            <small>${product.soldCount}</small>
          </div>
        </div>`;
    });
}
