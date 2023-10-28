const userId = 25801; // ID de usuario
const API_CART_URL = `${CART_INFO_URL}${userId}${EXT_TYPE}`;
const productDetails = document.getElementById("product-details");
const totalPriceElement = document.getElementById("total-price"); // Elemento para mostrar el precio total

function removeProduct(row) {
  const tbody = document.querySelector("#tableBodyCart");
  const imageSrc = row.querySelector("td img").src;
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
  let cartList = JSON.parse(localStorage.getItem("cartList"));

  // Encuentra el primer índice del producto con el ID correspondiente
  const index = cartList.findIndex((item) => item.id === productId);

  // Si se encuentra el producto en la lista, elimínalo
  if (index !== -1) {
    cartList.splice(index, 1);
  }

  // Actualiza el carrito en el localStorage
  localStorage.setItem("cartList", JSON.stringify(cartList));
}

function extractProductIdFromImageSrc(imageSrc) {
  const match = imageSrc.match(/img\/prod(\d+)_\d+\.jpg/);
  if (match && match[1]) {
    return match[1];
  }
  return null;
}

fetch(API_CART_URL)
  .then((response) => response.json())
  .then((data) => {
    // Crear una tabla con la clase de Bootstrap
    const table = document.createElement("table");
    table.className = "table";

    // Crear el encabezado de la tabla
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
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

    const subtotalGeneralElement = document.getElementById("subtotal-general");
    const costoEnvioElement = document.getElementById("costo-envio");
    const totalPagarElement = document.getElementById("total-pagar");

    subtotalGeneralElement.innerText = "USD 0";
    costoEnvioElement.innerText = "USD 0";
    totalPagarElement.innerText = "USD 0";

    // Crear el cuerpo de la tabla
    const tbody = document.createElement("tbody");
    tbody.id = "tableBodyCart";
    data.articles.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><img src="${item.image}" alt="${
        item.name
      }" class="img-thumbnail" width="250"></td>
        <td>${item.name}</td>
        <td>${item.currency} ${item.unitCost}</td>
        <td><input type="number" class="item-count" value="${
          item.count
        }" oninput="validateInput(this)"></td>
        <td><strong>${item.currency} ${item.unitCost * item.count}</strong></td>
        <td><button class="btn btn-danger" onclick="removeProduct(this.parentNode.parentNode)">Eliminar</button></td>
      `;
      tbody.appendChild(row);

      const input = row.querySelector(".item-count");
      input.addEventListener("input", () => {
        validateInput(input);
      });
    });
    table.appendChild(tbody);

    // Agregar la tabla al contenedor de detalles del producto
    productDetails.appendChild(table);
    showProducts();
  });

// Función para validar el campo de entrada
function validateInput(input, id) {
  input.value = input.value.replace(/[-+e]/gi, "");
  if (input.value <= 0) {
    input.value = "";
  }

  const row = input.parentNode.parentNode;
  const unitCost = parseFloat(
    row.querySelector("td:nth-child(3)").innerText.split(" ")[1]
  );
  const itemCount = parseInt(input.value);
  const currency = row.querySelector("td:nth-child(3)").innerText.split(" ")[0];
  const subtotal = row.querySelector("td:nth-child(5) strong");
  subtotal.innerText = `${currency} ${itemCount * unitCost}`;
  const index = input.parentNode.parentNode.id.split("-")[1];
  const subtotalElement = document.getElementById(`subtotal-${index}`);
  const subtotals = Array.from(
    document.querySelectorAll("td:nth-child(5) strong")
  ).map((el) => parseFloat(el.innerText.split(" ")[1]));
  const subtotalGeneralElement = document.getElementById("subtotal-general");
  subtotalGeneralElement.innerText = `${currency} ${subtotals.reduce(
    (acc, val) => acc + val,
    0
  )}`;
}

document.querySelectorAll('input[name="envio"]').forEach((input) => {
  input.addEventListener("change", () => {
    const selectedEnvio = parseFloat(input.value) / 100;
    const subtotalGeneral = parseFloat(
      document.getElementById("subtotal-general").innerText.split(" ")[1]
    );
    const costoEnvio = selectedEnvio * subtotalGeneral;
    const costoEnvioElement = document.getElementById("costo-envio");
    costoEnvioElement.innerText = `USD ${costoEnvio.toFixed(0)}`;
    const totalPagar = subtotalGeneral + costoEnvio;
    const totalPagarElement = document.getElementById("total-pagar");
    totalPagarElement.innerText = `USD ${totalPagar.toFixed(0)}`;
  });
});  

const showProduct = (product, count) => {
  const tbody = document.querySelector("#tableBodyCart");
  tbody.innerHTML += `
    <tr>
      <td><img src="${product.images[0]}" alt="${
    product.name
  }" class="img-thumbnail" width="250"></td>
      <td>${product.name}</td>
      <td>${product.currency} ${product.cost}</td>
      <td><input type="number" class="item-count" value="${parseInt(
        count
      )}" oninput="validateInput(this, ${product.id})"></td>
      <td><strong>${product.currency} ${
    product.cost * parseInt(count)
  }</strong></td>
      <td><button class="btn btn-danger" onclick="removeProduct(this.parentNode.parentNode)">Eliminar</button></td>
    </tr>
  `;
};

const fetchToAPI = (idProduct, count) => {
  const URL_API = `https://japceibal.github.io/emercado-api/products/${idProduct}.json`;
  fetch(URL_API)
    .then((response) => response.json())
    .then((data) => showProduct(data, count));
};

const showProducts = () => {
  const cartList = JSON.parse(localStorage.getItem("cartList"));
  cartList.forEach((product) => {
    fetchToAPI(product.id, product.count);
  });
};

// Funciones para restringir valores no numéricos y el formato de fecha
const inputcreditcardnumber = document.getElementById("inputcreditnumber");
const inputsecuritynumber = document.getElementById("securitynumber");
const inputexpiration = document.getElementById("expirationdate");
const accountnumber = document.getElementById("accountnumber");
const numberInput = document.getElementById("numero");
function allowOnlyNumbers(...inputElements) {
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      this.value = this.value.replace(/[^0-9]/g, "");
    });
  });
}

allowOnlyNumbers(
  inputcreditcardnumber,
  inputsecuritynumber,
  inputexpiration,
  accountnumber,
  numberInput
);

inputexpiration.addEventListener("input", function () {
  // Elimina cualquier carácter que no sea un número
  this.value = this.value.replace(/\D/g, "");

  // Formatea MM/AA
  if (this.value.length > 2) {
    this.value = this.value.substring(0, 2) + "/" + this.value.substring(2, 4);
  }
});

// Funciones para habilitar/deshabilitar campos
const creditcarddiv = document.getElementById("paymentcreditcard");
function disablebank() {
  accountnumber.disabled = true;
  inputcreditcardnumber.disabled = false;
  inputsecuritynumber.disabled = false;
  inputexpiration.disabled = false;
  inputcreditcardnumber.value = "";
  inputexpiration.value = "";
  inputsecuritynumber.value = "";
  accountnumber.value = "";
}
creditcarddiv.addEventListener("click", disablebank);

const bankdiv = document.getElementById("paymentbank");
function disablecreditcard() {
  inputcreditcardnumber.disabled = true;
  inputsecuritynumber.disabled = true;
  inputexpiration.disabled = true;
  accountnumber.disabled = false;
  accountnumber.value = "";
  inputcreditcardnumber.value = "";
  inputexpiration.value = "";
  inputsecuritynumber.value = "";
}
bankdiv.addEventListener("click", disablecreditcard);
document.addEventListener("DOMContentLoaded", () => {
  accountnumber.disabled = true;
});

//validaciones
const confirmButton = document.getElementById("confirm");

const streetInput = document.getElementById("calle");
const cornerInput = document.getElementById("esquina");
const shipmentRadios = document.querySelectorAll('input[name="shipment"]');
const paymentRadios = document.querySelectorAll('input[name="payment"]');
const shipmentError = document.getElementById("shipment-error");
const paymentError = document.getElementById("payment-error"); 

streetInput.addEventListener("input", validateStreet);
numberInput.addEventListener("input", validateNumber);
cornerInput.addEventListener("input", validateCorner);
inputcreditcardnumber.addEventListener("input", validateCreditNumber);
inputsecuritynumber.addEventListener("input", validateCVC);
inputexpiration.addEventListener("input", validateExpiration);
accountnumber.addEventListener("input", validateAccountNumber);

function validateStreet() {
  if (streetInput.value.trim() === "") {
    streetInput.classList.remove("is-valid");
    streetInput.classList.add("is-invalid");
  } else {
    streetInput.classList.remove("is-invalid");
    streetInput.classList.add("is-valid");
  }
}

function validateNumber() {
  if (numberInput.value.trim() === "") {
    numberInput.classList.remove("is-valid");
    numberInput.classList.add("is-invalid");
  } else {
    numberInput.classList.remove("is-invalid");
    numberInput.classList.add("is-valid");
  }
}

function validateCorner() {
  if (cornerInput.value.trim() === "") {
    cornerInput.classList.remove("is-valid");
    cornerInput.classList.add("is-invalid");
  } else {
    cornerInput.classList.remove("is-invalid");
    cornerInput.classList.add("is-valid");
  }
}

// Función para validar el envío
function validateShipment() {
  let selectedShipment = false;
  shipmentRadios.forEach((radio) => {
    if (radio.checked) {
      selectedShipment = true;
    }
  });

  if (!selectedShipment) {
    shipmentError.textContent = "Seleccione tipo de envío";
    return false;
  } else {
    shipmentError.textContent = "";
    return true;
  }
}

// Función para validar la forma de pago
function validatePayment() {
  let selectedPayment = false;
  paymentRadios.forEach((radio) => {
    if (radio.checked) {
      selectedPayment = true;
    }
  });

  if (!selectedPayment) {
    paymentError.textContent = "Debe seleccionar una forma de pago";
    return false;
  } else {
    paymentError.textContent = "";
    return true;
  }
}

// Agregar controladores de eventos para las radios de envío y forma de pago
shipmentRadios.forEach((radio) => {
  radio.addEventListener("change", validateShipment);
});

paymentRadios.forEach((radio) => {
  radio.addEventListener("change", validatePayment);
});

// Agregar un controlador de eventos para el botón de confirmación
confirmButton.addEventListener("click", function (event) {
  validateStreet();
  validateNumber();
  validateCorner();
  validateShipment();
  validatePayment();
  validateCreditCard()
  validateAccountNumber();
  event.preventDefault();
});

//validar datos forma de pago
function validateCreditCard(){
  if (creditcarddiv.checked && isCreditCardEmpty()){
    paymentError.textContent = "Debe cargar los datos de la tarjeta";
  } else if(bankdiv.checked && isAccountNumberEmpty()) {
    paymentError.textContent = "Debe cargar los datos de la cuenta";
  }
}

function isCreditCardEmpty(){
  return inputcreditcardnumber.value.trim() === "" || inputsecuritynumber.value.trim() === "" || inputexpiration.value.trim() === ""
}

function isAccountNumberEmpty(){
  return accountnumber.value.trim() === ""
}

//Validar tarjeta de credito
function validateCreditNumber() {
  if (inputcreditcardnumber.value.trim() === "") {
    inputcreditcardnumber.classList.remove("is-valid");
    inputcreditcardnumber.classList.add("is-invalid");
  } else {
    inputcreditcardnumber.classList.remove("is-invalid");
    inputcreditcardnumber.classList.add("is-valid");
  }
}

function validateCVC() {
  if (inputsecuritynumber.value.trim() === "") {
    inputsecuritynumber.classList.remove("is-valid");
    inputsecuritynumber.classList.add("is-invalid");
  } else {
    inputsecuritynumber.classList.remove("is-invalid");
    inputsecuritynumber.classList.add("is-valid");
  }
}

function validateExpiration() {
  if (inputexpiration.value.trim() === "") {
    inputexpiration.classList.remove("is-valid");
    inputexpiration.classList.add("is-invalid");
  } else {
    inputexpiration.classList.remove("is-invalid");
    inputexpiration.classList.add("is-valid");
  }
}

//Validar numero de cuenta
function validateAccountNumber() {
  if (accountnumber.value.trim() === "") {
    accountnumber.classList.remove("is-valid");
    accountnumber.classList.add("is-invalid");
  } else {
    accountnumber.classList.remove("is-invalid");
    accountnumber.classList.add("is-valid");
  }
}








