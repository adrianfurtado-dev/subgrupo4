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
    title.innerHTML += `
        <br>
        <h1>Productos</h1>
        <h5><span class="lead">Veras aqui todos los productos de la categoría</span> <b>${catName}</b> </h5>
        <br>`;
}

function listProducts(products) {
    productosDiv.innerHTML = "";
    let resultFound = false; 

    products.forEach(product => {
        if (((minPrice == undefined) || (minPrice != undefined && parseInt(product.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(product.cost) <= maxPrice))) {
            productosDiv.innerHTML += `
                <div class="row list-group-item d-flex justify-content-between">
                    <div class="col-3">
                        <img src="${product.image}" alt="${product.name}" class="img-thumbnail">
                    </div>
                    <div class="col-7 text-left">
                        <h3>${product.name} - ${product.currency} ${product.cost}</h3>
                        <p>${product.description}</p>
                    </div>
                    <div class="col-2">
                        <small>
                            ${product.soldCount} vendidos
                        </small>
                    </div>
                </div>`;
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
        minPrice = parseFloat(priceMin.value);
        maxPrice = parseFloat(priceMax.value);
        if (isValidFilter(ORDER_BY_PROD_PRICE))
            sortAndShowProducts(ORDER_BY_PROD_PRICE);
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
    } else if (criteria === ORDER_BY_PROD_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) return -1;
            if (a.cost > b.cost) return 1;
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_PRICE) {
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
    listProducts(currentProductsArray);
}

priceMin.addEventListener('input', () => {
    if (isNaN(priceMin.value) || priceMin.value < 0) {
        priceMin.value = 0;
    }
});

priceMax.addEventListener('input', () => {
    if (isNaN(priceMax.value) || priceMax.value < 0) {
        priceMax.value = 0;
    }
});

clearBtn.addEventListener('click', clearPriceInputs);

document.addEventListener('DOMContentLoaded', documentLoaded);

document.addEventListener('DOMContentLoaded', function() {
    const url = "https://japceibal.github.io/emercado-api/cats_products/101.json";
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const productosDiv = document.getElementById("productos");
        const searchInput = document.getElementById("searchInput");
  
        // Función para filtrar los productos en tiempo real
        function filterProducts() {
          const searchTerm = searchInput.value.toLowerCase();
          const filteredProducts = data.products.filter(product => {
            const productName = product.name.toLowerCase();
            const productDescription = product.description.toLowerCase();
            return productName.includes(searchTerm) || productDescription.includes(searchTerm);
          });
  
          // Limpiar la lista de productos antes de mostrar los resultados filtrados
          productosDiv.innerHTML = "";
  
          // Mostrar los productos filtrados
          filteredProducts.forEach(product => {
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
  
        // Escuchar el evento input en el campo de búsqueda
        searchInput.addEventListener('input', filterProducts);
  
        // Mostrar todos los productos al cargar la página
        filterProducts();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });