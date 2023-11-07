const favoritesList = JSON.parse(localStorage.getItem('favoritesList')) || [];
function updateFavoritesPage() {
  // Obtén la lista de productos favoritos desde el almacenamiento local

  // Obtén el contenedor donde mostrarás los productos favoritos en favorites.html
  const favoritesContainer = document.getElementById('favorites-container');

  

  // Recorre la lista de productos favoritos y muestra cada producto
  for (const product of favoritesList) {
    // Puedes construir el HTML de cada producto y agregarlo al contenedor
    const productHTML = `
      <div class="favorite-product">
        <!-- Aquí puedes mostrar información del producto, como imagen, nombre, precio, etc. -->
      </div>
    `;
  }
}
function removeFromLocalStorage(productId) {
    // Obtiene la lista actual del carrito desde localStorage
    
  
    // Encuentra el primer índice del producto con el ID correspondiente
    const index = favoritesList.findIndex((item) => item.id === productId);
  
    // Si se encuentra el producto en la lista, elimínalo
    if (index !== -1) {
      favoritesList.splice(index, 1);
    }
  
    // Actualiza el carrito en el localStorage
    localStorage.setItem("favoritesList", JSON.stringify(favoritesList));
  }

