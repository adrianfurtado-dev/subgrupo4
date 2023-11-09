let favoritesList = JSON.parse(localStorage.getItem('favoritesList')) || [];

// Obtén el elemento <ul> donde se mostrarán los productos favoritos
let favoritesListElement = document.getElementById('favoritesList');

// Recorre la lista de productos favoritos y crea los elementos <li> correspondientes
favoritesList.forEach(function(product) {
  let listItem = document.createElement('li');
  let nameElement = document.createElement('span');
  let priceElement = document.createElement('span');
  let imageElement = document.createElement('img');

  // Realiza el fetch utilizando el ID del producto
  fetch(`${PRODUCT_INFO_URL}${product.id}${EXT_TYPE}`)
    .then((response) => response.json())
    .then((data) => {
      // Actualiza el nombre y el precio del producto en el elemento <li>
      nameElement.textContent = data.name;
      priceElement.textContent = "$ "+data.cost;
      const productImage = data.images[0];
      imageElement.src = productImage;
      imageElement.style.width='250px'
      

      // Agrega los elementos al elemento <li>
      listItem.appendChild(imageElement);
      listItem.appendChild(nameElement);
      listItem.appendChild(priceElement);
      

      // Agrega el elemento <li> al elemento <ul>
      favoritesListElement.appendChild(listItem);
    })
    .catch((error) => {
      console.error('Error al obtener la información del producto:', error);
    });
});