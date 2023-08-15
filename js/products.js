document.addEventListener('DOMContentLoaded', function() {
  const url = "https://japceibal.github.io/emercado-api/cats_products/101.json";

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const productosDiv = document.getElementById("productos")
      
      data.products.forEach(products => {
        const productoDiv = document.createElement('div');
        
        const nombre = document.createElement('h2');
        nombre.textContent = products.name;
        
        const precio = document.createElement('p');
        precio.textContent = `Precio: $${products.cost}`;
        
        const descripcion = document.createElement('p');
        descripcion.textContent = products.description;
        
        const cantidadVendidos = document.createElement('p');
        cantidadVendidos.textContent = `${products.soldCount} vendidos`;
        
        const imagen = document.createElement('img');
        imagen.src = products.image;

        const contenido = `
        <div class="row list-group-item d-flex justify-content-between">
        <div class="col-3">
          <img src="${imagen.src}" alt="${nombre.textContent}" class="img-thumbnail">
        </div>
        <div class="col-7">
        <h3>${nombre.textContent}</h3>
        <p>${descripcion.textContent}</p>
        </div>
        <div class="col-2">
            <small>
              ${cantidadVendidos.textContent}
            </small>
        </div>
        </div>`
        
        productoDiv.innerHTML += contenido

        productosDiv.appendChild(productoDiv)
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
});