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
