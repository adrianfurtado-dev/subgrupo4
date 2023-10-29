const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

const userProfile = () => {
  const user = document.querySelector('#user');

  if (isLoggedIn()) {
    const email = localStorage.getItem('email') || sessionStorage.getItem('email');
    user.textContent = email;
    user.href = 'my-profile.html';
  } else {
    user.textContent = 'Iniciar sesión';
    user.href = 'login.html';
  }
}
//Función que evalua si el usuario esta logeado
function isLoggedIn() {
  return sessionStorage.getItem("email") || localStorage.getItem("email");
}
if (!isLoggedIn()) {
  userProfile();
}

function logout() {
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = 'index.html'; // Redirige a la página de inicio
}

// Función de cierre de sesión
const logoutButton = document.getElementById('logout');
if (logoutButton) {
  logoutButton.addEventListener('click', logout);
}
//Función para que el usuario/iniciar sesión se actualice
function updateUserContent() {
  if (isLoggedIn()) {
    const email = localStorage.getItem('email') || sessionStorage.getItem('email');
    user.textContent = email;
    user.href = 'my-profile.html';
  } else {
    user.textContent = 'Iniciar sesión';
    user.href = 'login.html';
  }
}
document.addEventListener('userLoggedIn', updateUserContent);
if (isLoggedIn()) {
  const userLoggedInEvent = new Event('userLoggedIn');
  document.dispatchEvent(userLoggedInEvent);
}
const dropdown = document.querySelector('.dropdown');
//Función para validar si esta logeado
function validate(){
    if (!isLoggedIn()) {
 
        window.location.href = 'login.html';
      } else {
        userProfile();
      }
}
//Al clickear valida si esta logeado
dropdown.addEventListener('click', () => {
validate()
})
//Oculta o muestra el menú desplegable o boton de iniciar sesión según corresponda si esta logeado o no
document.addEventListener('DOMContentLoaded', function() {
  const esconder = document.getElementById('esconder');
  if (isLoggedIn()) {
    user.style.display = 'block';
    esconder.style.display = 'none';
  } else {
    user.style.display = 'none';
    esconder.style.display = 'block';
  }
});

if (!localStorage.getItem('cartList')) { localStorage.setItem('cartList', JSON.stringify([])) }
