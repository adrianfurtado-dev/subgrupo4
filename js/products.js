document.addEventListener('DOMContentLoaded', function() {
  const url = "https://japceibal.github.io/emercado-api/cats_products/101.json";

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const productosDiv = document.getElementById("productos")
      
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