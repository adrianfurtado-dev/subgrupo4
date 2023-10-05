const ORDER_ASC_BY_PRICE = "AZ";
const ORDER_DESC_BY_PRICE = "ZA";
const ORDER_BY_PROD_PRICE = "Rel.";
let minPrice = undefined;
let maxPrice = undefined;
let currentProductsArray = [];

const productosDiv = document.getElementById("productos");
const clearBtn = document.querySelector('#clearRangeFilter');
const priceMin = document.querySelector('#rangeFilterPriceMin');
const priceMax = document.querySelector('#rangeFilterPriceMax');

function APIUrl(url) {
    return `https://japceibal.github.io/emercado-api/cats_products/${url}.json`;
}

function getCatID() {
    return localStorage.getItem("catID");
}

function listTitle(catName) {
    const title = document.getElementById("title");
    title.innerHTML += `<span class="family-inter fs-5">${catName}</span>`;
}

function listProducts(products) {
    productosDiv.innerHTML = "";
    let resultFound = false;

    products.forEach(product => {
        if (((minPrice == undefined) || (minPrice != undefined && parseInt(product.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(product.cost) <= maxPrice))) {
                productosDiv.innerHTML += `
                <div onclick="setProductID(${product.id})" class="card list-card-item" style="width: 18rem;">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="card-body text-left">
                        <h5 class="fw-bold">${product.name}</h5>
                        <h6>${product.currency} ${product.cost}</h6>
                    </div>
                </div>
                `;
            resultFound = true;
        }
    });

    if (!resultFound) {
        productosDiv.innerHTML += `
            <div class="row list-group-item d-flex justify-content-between">
                <div class="col-12 text-left">
                    <p>No hay resultados para este filtro</p>
                </div>
            </div>`;
    }
}

function request() {
    const catID = getCatID();
    const url = APIUrl(catID);

    fetch(url)
        .then(response => response.json())
        .then(data => {
            listTitle(data.catName);
            currentProductsArray = data.products;
            listProducts(currentProductsArray);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function sorters() {
    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("rangeFilterPrice").addEventListener("click", function () {
        minPrice = priceMin.value !== '' ? parseFloat(priceMin.value) : undefined;
        maxPrice = priceMax.value !== '' ? parseFloat(priceMax.value) : undefined;
        if (isValidFilter(ORDER_DESC_BY_PRICE))
            sortAndShowProducts(ORDER_DESC_BY_PRICE);
        else
            listProducts([]);
    });

    document.getElementById("sortByCount").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_PROD_PRICE);
    });
}

function isValidFilter(sortCriteria) {
    return sortProducts(sortCriteria, currentProductsArray).length > 0;
}

function documentLoaded() {
    request();
    sorters();
}

function sortAndShowProducts(sortCriteria) {
    listProducts(sortProducts(sortCriteria, currentProductsArray));
}

function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) return -1;
            if (a.cost < b.cost) return 1;
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) return -1;
            if (a.cost > b.cost) return 1;
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_PRICE) {
        result = array.sort(function (a, b) {
            return b.soldCount - a.soldCount;
        });
    }

    return result;
}

const clearPriceInputs = () => {
    priceMin.value = '';
    priceMax.value = '';
    minPrice = undefined;
    maxPrice = undefined;
    listProducts(currentProductsArray.sort(function (x, y) {
        return x.id < y.id ? -1 : 1;
    }));
}

priceMin.addEventListener('input', () => {
    priceMin.value = priceMin.value.replace(/[^0-9.]/g, '');
});

priceMax.addEventListener('input', () => {
    priceMax.value = priceMax.value.replace(/[^0-9.]/g, '');
});

clearBtn.addEventListener('click', clearPriceInputs);

document.addEventListener('DOMContentLoaded', documentLoaded);

// Función para filtrar los productos en tiempo real
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = currentProductsArray.filter(product => {
        const productName = product.name.toLowerCase();
        const productDescription = product.description.toLowerCase();
        return productName.includes(searchTerm) || productDescription.includes(searchTerm);
    });
    listProducts(filteredProducts);
}
// Escuchar el evento input en el campo de búsqueda
searchInput.addEventListener('input', filterProducts);

//Se guarda el identificador del producto en el localstorage y se redirige a product-info.html
function setProductID(id) {
    localStorage.setItem('productoSeleccionado', id);
    window.location = 'product-info.html';
}