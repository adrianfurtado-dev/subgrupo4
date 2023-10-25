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
  })

// Función para validar el campo de entrada
function validateInput(input, id) {
  input.value = input.value.replace(/[-+e]/ig, '');
  if (input.value <= 0) {
    input.value = '';
  }

  const row = input.parentNode.parentNode;
  const unitCost = parseFloat(row.querySelector('td:nth-child(3)').innerText.split(' ')[1]);
  const itemCount = parseInt(input.value) ? parseInt(input.value) : 0;
  const currency = row.querySelector('td:nth-child(3)').innerText.split(' ')[0];
  const subtotal = row.querySelector('td:nth-child(5) strong');
  subtotal.innerText = `${currency} ${BigInt(itemCount * unitCost)}`;
}

const showProduct = (product, count) => {
  const tbody = document.querySelector('#tableBodyCart');
  tbody.innerHTML += `
    <tr>
      <td><img src="${product.images[0]}" alt="${product.name}" class="img-thumbnail" width="250"></td>
      <td>${product.name}</td>
      <td>${product.currency} ${product.cost}</td>
      <td><input type="number" class="item-count" value="${parseInt(count)}" oninput="validateInput(this, ${product.id})"></td>
      <td><strong>${product.currency} ${product.cost * parseInt(count)}</strong></td>
      <td><button class="btn btn-danger" onclick="removeProduct(this.parentNode.parentNode)">Eliminar</button></td>
    </tr>
  `;
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

//Función para restringir valores no númericos en los input del Modal
const inputcreditcardnumber= document.getElementById('inputcreditnumber')
const inputsecuritynumber = document.getElementById('securitynumber')
const inputexpiration = document.getElementById('expirationdate')
const accountnumber= document.getElementById('accountnumber')
function allowOnlyNumbers(...inputElements) {
  inputElements.forEach(inputElement => {
    inputElement.addEventListener('input', function () {
      this.value = this.value.replace(/[^0-9]/g, '');
    });
  });
}

allowOnlyNumbers(inputcreditcardnumber, inputsecuritynumber, inputexpiration, accountnumber)
//Función para el formato fecha MM/AA
inputexpiration.addEventListener('input', function () {
  // Elimina cualquier carácter que no sea un número
  this.value = this.value.replace(/\D/g, '');

  // Formatea MM/AA
  if (this.value.length > 2) {
    this.value = this.value.substring(0, 2) + '/' + this.value.substring(2, 4);
  }
});

//Función para deshabilitar campos
const creditcarddiv= document.getElementById('paymentcreditcard')
function disablebank(){
  accountnumber.disabled = true
  inputcreditcardnumber.disabled= false
inputsecuritynumber.disabled = false
inputexpiration.disabled = false
inputcreditcardnumber.value = ""
inputexpiration.value = ""
inputsecuritynumber.value = ""
accountnumber.value = ""
}
creditcarddiv.addEventListener('click', disablebank)

const bankdiv= document.getElementById('paymentbank')
function disablecreditcard(){
inputcreditcardnumber.disabled= true
inputsecuritynumber.disabled = true
inputexpiration.disabled = true
accountnumber.disabled = false
accountnumber.value = ""
inputcreditcardnumber.value = ""
inputexpiration.value = ""
inputsecuritynumber.value = ""
}
bankdiv.addEventListener('click', disablecreditcard)
document.addEventListener('DOMContentLoaded', ()=>{
  accountnumber.disabled=true
})

