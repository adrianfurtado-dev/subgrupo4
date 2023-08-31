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

function listProducts(products){
  const productosDiv = document.getElementById("productos")

  products.forEach(product => {
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
        <small class="text-muted">
          ${product.soldCount} artículos
        </small>
    </div>
    </div>`
})
}

function documentLoaded() {
  const catID = getCatID();
  const url = APIUrl(catID);

  fetch(url)
    .then(response => response.json())
    .then(data => {
      listTitle(data.catName);
      listProducts(data.products);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


document.addEventListener('DOMContentLoaded', documentLoaded);
