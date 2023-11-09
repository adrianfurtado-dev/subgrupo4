document.addEventListener('DOMContentLoaded', function() {
  // Obtén la lista de productos favoritos desde el almacenamiento local
  let favoritesList = JSON.parse(localStorage.getItem('favoritesList')) || [];

  // Obtén el elemento <ul> donde se mostrarán los productos favoritos
  let favoritesListElement = document.getElementById('favoritesList');

  // Recorre la lista de productos favoritos y crea los elementos <li> correspondientes
  favoritesList.forEach(function(product) {
    let listItem = document.createElement('li');
    let nameElement = document.createElement('span');
    let priceElement = document.createElement('span');
  
    nameElement.textContent = product.name;
    priceElement.textContent = product.price;
  
    listItem.appendChild(nameElement);
    listItem.appendChild(priceElement);
  
    favoritesListElement.appendChild(listItem);
  });
});