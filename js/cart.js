// URL ya definida en init.js
// const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";

const userId = 25801; // ID de usuario
const API_CART_URL = `${CART_INFO_URL}${userId}${EXT_TYPE}`;
const productDetails = document.getElementById('product-details');

fetch(API_CART_URL)
  .then(response => response.json())
  .then(data => {
    // Crear una tabla con la clase de Bootstrap
    const table = document.createElement('table');
    table.className = 'table';

    // Crear el encabezado de la tabla
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
      <th scope="col"></th>
      <th scope="col">Nombre</th>
      <th scope="col">Costo</th>
      <th scope="col">Cantidad</th>
      <th scope="col">Subtotal</th>
    `;
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Crear el cuerpo de la tabla
    const tbody = document.createElement('tbody');
    data.articles.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><img src="${item.image}" alt="${item.name}" class="img-thumbnail" width="250"></td>
        <td>${item.name}</td>
        <td>${item.currency} ${item.unitCost}</td>
        <td><input type="number" class="item-count" value="${item.count}" oninput="validateInput(this)"></td>
        <td><strong>${item.currency} ${item.unitCost * item.count}</strong></td>
      `;
      tbody.appendChild(row);
    });
    table.appendChild(tbody);

    // Agregar la tabla al contenedor de detalles del producto
    productDetails.appendChild(table);
  })
  .catch(error => console.error('Error:', error));

// Función para validar el campo de entrada
function validateInput(input) {
  input.value = input.value.replace(/[-+e]/ig, '');
  if (input.value < 1) {
    input.value = 1;
  }
}
