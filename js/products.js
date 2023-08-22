document.addEventListener('DOMContentLoaded', function() {
  const catID = localStorage.getItem("catID");
  const url = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const productosDiv = document.getElementById("productos")
      productosDiv.innerHTML += `
      <h1>Productos</h1>
      <h5>Veras aqui todos los productos de la categoría <b>${data.catName}</b> </h5>
      <br>`

      data.products.forEach(products => {
        productosDiv.innerHTML += `
        <div class="row list-group-item d-flex justify-content-between">
        <div class="col-3">
          <img src="${products.image}" alt="${products.name}" class="img-thumbnail">
        </div>
        <div class="col-7">
        <h3>${products.name}</h3>
        <p>${products.description}</p>
        </div>
        <div class="col-2">
            <small>
              ${products.soldCount}
            </small>
        </div>
        </div>`
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
});