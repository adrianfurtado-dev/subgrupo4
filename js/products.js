document.addEventListener('DOMContentLoaded', function() {
    const url = "https://japceibal.github.io/emercado-api/cats_products/101.json";
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const productosDiv = document.getElementById('productos');
        
        // Recorrer la colección de productos y mostrarlos en products.html
        data.products.forEach(products => {
          const productoDiv = document.createElement('div');
          
          const nombre = document.createElement('h2');
          nombre.textContent = products.name;
          
          const precio = document.createElement('p');
          precio.textContent = `Precio: $${products.cost}`;
          
          const descripcion = document.createElement('p');
          descripcion.textContent = products.description;
          
          const cantidadVendidos = document.createElement('p');
          cantidadVendidos.textContent = `Cantidad Vendida: ${products.soldCount}`;
          
          const imagen = document.createElement('img');
          imagen.src = products.image;
          
          productoDiv.appendChild(nombre);
          productoDiv.appendChild(precio);
          productoDiv.appendChild(descripcion);
          productoDiv.appendChild(cantidadVendidos);
          productoDiv.appendChild(imagen);
          
          productosDiv.appendChild(productoDiv);
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });