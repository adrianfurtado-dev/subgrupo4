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
  
  window.location.href = 'login.html';
} else {
  userProfile();
}

function logout() {
  localStorage.removeItem('email');
  sessionStorage.removeItem('email');
  window.location.href = 'index.html'; // Redirige a la página de inicio
}

// Función de cierre de sesión
const logoutButton = document.getElementById('logout');
if (logoutButton) {
  logoutButton.addEventListener('click', logout);
}
