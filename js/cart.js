const userId = 25801; // ID de usuario
const API_CART_URL = `${CART_INFO_URL}${userId}${EXT_TYPE}`;
const productDetails = document.getElementById('product-details');
const totalPriceElement = document.getElementById('total-price'); // Elemento para mostrar el precio total

function removeProduct(row) {
  const tbody = document.querySelector('#tableBodyCart');
  const imageSrc = row.querySelector('td img').src;
  const productId = extractProductIdFromImageSrc(imageSrc);

  // Elimina la fila de la tabla
  tbody.removeChild(row);

  // Elimina el producto del carrito en el localStorage
  removeFromLocalStorage(productId);

  // Actualiza el precio total
  updateTotalPrice();
}

// Función para eliminar un producto del carrito en el localStorage
function removeFromLocalStorage(productId) {
  // Obtiene la lista actual del carrito desde localStorage
  let cartList = JSON.parse(localStorage.getItem('cartList'));

  // Encuentra el primer índice del producto con el ID correspondiente
  const index = cartList.findIndex(item => item.id === productId);

  // Si se encuentra el producto en la lista, elimínalo
  if (index !== -1) {
    cartList.splice(index, 1);
  }

  // Actualiza el carrito en el localStorage
  localStorage.setItem('cartList', JSON.stringify(cartList));
}

function extractProductIdFromImageSrc(imageSrc) {
  const match = imageSrc.match(/img\/prod(\d+)_\d+\.jpg/);
  if (match && match[1]) {
    return match[1];
  }
  return null;
}


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
      <th scope="col">Remover</th>
    `;
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Crear el cuerpo de la tabla
    const tbody = document.createElement('tbody');
    tbody.id = 'tableBodyCart';
    data.articles.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><img src="${item.image}" alt="${item.name}" class="img-thumbnail" width="250"></td>
        <td>${item.name}</td>
        <td>${item.currency} ${item.unitCost}</td>
        <td><input type="number" class="item-count" value="${item.count}" oninput="validateInput(this)"></td>
        <td><strong>${item.currency} ${item.unitCost * item.count}</strong></td>
        <td><button class="btn btn-danger" onclick="removeProduct(this.parentNode.parentNode)">Eliminar</button></td>
      `;
      tbody.appendChild(row);

      const input = row.querySelector('.item-count');
      input.addEventListener('input', () => {
        validateInput(input);
      });
    });
    table.appendChild(tbody);

    // Agregar la tabla al contenedor de detalles del producto
    productDetails.appendChild(table);
    showProducts();
    updateTotalPrice(); // Actualizar el precio total al cargar la página
  })
  .catch(error => console.error('Error:', error));

// Función para validar el campo de entrada
function validateInput(input) {
  input.value = input.value.replace(/[-+e]/ig, '');
  if (input.value < 1) {
    input.value = 1;
  }

  const row = input.parentNode.parentNode;
  const unitCost = parseFloat(row.querySelector('td:nth-child(3)').innerText.split(' ')[1]);
  const itemCount = parseInt(input.value);
  const currency = row.querySelector('td:nth-child(3)').innerText.split(' ')[0];
  const subtotal = row.querySelector('td:nth-child(5) strong');
  subtotal.innerText = `${currency} ${itemCount * unitCost}`;
}

const showProduct = (product, count) => {
  const tbody = document.querySelector('#tableBodyCart');
  tbody.innerHTML += `
    <tr>
      <td><img src="${product.images[0]}" alt="${product.name}" class="img-thumbnail" width="250"></td>
      <td>${product.name}</td>
      <td>${product.currency} ${product.cost}</td>
      <td><input type="number" class="item-count" value="${parseInt(count)}" oninput="validateInput(this)"></td>
      <td><strong>${product.currency} ${product.cost * parseInt(count)}</strong></td>
      <td><button class="btn btn-danger" onclick="removeProduct(this.parentNode.parentNode)">Eliminar</button></td>
    </tr>
  `;
  updateTotalPrice(); // Actualizar el precio total cuando se agrega un producto
}

const fetchToAPI = (idProduct, count) => {
  const URL_API = `https://japceibal.github.io/emercado-api/products/${idProduct}.json`;
  fetch(URL_API)
    .then(response => response.json())
    .then(data => showProduct(data, count))
}

const showProducts = () => {
  const cartList = JSON.parse(localStorage.getItem('cartList'));
  cartList.forEach(product => {
    fetchToAPI(product.id, product.count);
  });
}

function updateTotalPrice() {
  const rows = document.querySelectorAll('#tableBodyCart tr');
  let totalPrice = 0;
  rows.forEach(row => {
    const subtotalText = row.querySelector('td:nth-child(5) strong').textContent;
    const subtotal = parseFloat(subtotalText.split(' ')[1]);
    totalPrice += subtotal;
  })
  totalPriceElement.textContent = `Total: ${totalPrice} USD`;
}
//Función para restringir valores no númericos en los input del Modal
// numeric-input.js
const inputcreditcardnumber= document.getElementById('inputcreditnumber')
const inputsecuritynumber = document.getElementById('securitynumber')
const inputexpiration = document.getElementById('expirationdate')
// numeric-input.js
function allowOnlyNumbers(...inputElements) {
  inputElements.forEach(inputElement => {
    inputElement.addEventListener('input', function () {
      this.value = this.value.replace(/[^0-9]/g, '');
    });
  });
}

allowOnlyNumbers(inputcreditcardnumber, inputsecuritynumber, inputexpiration)

//Función para deshabilitar cambios
const creditcarddiv= document.getElementById('paymentcreditcard')
const accountnumber= document.getElementById('accountnumber')
function disablebank(){
  accountnumber.disabled = true
  inputcreditcardnumber.disabled= false
inputsecuritynumber.disabled = false
inputexpiration.disabled = false
inputcreditcardnumber.value = ""
inputexpiration.value = ""
inputsecuritynumber = ""
}
creditcarddiv.addEventListener('click', disablebank)

const bankdiv= document.getElementById('paymentbank')
function disablecreditcard(){
inputcreditcardnumber.disabled= true
inputsecuritynumber.disabled = true
inputexpiration.disabled = true
accountnumber.disabled = false
accountnumber.value = ""
}
bankdiv.addEventListener('click', disablecreditcard)
document.addEventListener('DOMContentLoaded', ()=>{
  accountnumber.disabled=true
})