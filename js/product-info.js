// Se obtiene el producto seleccionado en el localStorage
const productID = localStorage.getItem('productoSeleccionado');
const container = document.querySelector('#product-container');
const commentsContainer = document.querySelector('#comments-container');
const relatedProductContainer = document.querySelector('#relacionados');
const relatedAPI = `https://japceibal.github.io/emercado-api/products/${productID}.json`

// Función para crear las estrellas
function stars(puntaje) {
  const starOuter = document.createElement('div');
  starOuter.classList.add('stars-outer');

  const starInner = document.createElement('div');
  starInner.classList.add('stars-inner');
  starInner.style.width = (puntaje / 5) * 100 + '%';

  starOuter.appendChild(starInner);
  return starOuter;
}

const addToCart = idProduct => {
  let cartList = JSON.parse(localStorage.getItem('cartList')).map(product => product.id);
  if (cartList.indexOf(idProduct) === -1) {
    cartList.push({ id: idProduct, count: 1 });
    localStorage.setItem('cartList', JSON.stringify(cartList));
    showMessage('center-end', 'success', 'Se añadió el producto al carrito')
  } else {
    showMessage('center-end', 'error', 'El producto ya se encuentra en el carrito')
  }
}

const showProduct = (data) => {
  const imgs = data.images
    .map((element, index) => `
  <div class="carousel-item${index === 0 ? ' active' : ''}">
    <img src="${element}" class="d-block w-100">
  </div>
`).join('');

  const buttons = data.images
    .map((_, index) => `
    <button type="button" data-bs-target="#productCarousel" data-bs-slide-to="${index}" class="${index === 0 ? 'active' : ''}" aria-current="true" aria-label="Slide ${index + 1}"></button>
`).join('');

  container.innerHTML = `
  <div class="row my-4">
    <div class="col-xl-6 col-12">
      <div id="productCarousel" class="carousel slide">
          <div class="carousel-indicators">
            ${buttons}
          </div>
          <div class="carousel-inner">
            ${imgs}
          </div>
          <button class="carousel-control-prev carousel-control_btn" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next carousel-control_btn" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
      </div>
    </div>
    <div class="col-xl-6 col-12">
      <span class="fs-sm">
        ${data.soldCount} vendidos
      </span>
      <h4 class="fw-bolder mt-1 bg-transparent">${data.name}</h4>
      <span id="product-rating_container">
        
      </span>
      <div class="product-price_container">
        <span class="fs-4">
          ${data.currency} ${data.cost}
        </span>
      </div>
      <div>
        <strong>Categoría</strong><br/>
        <span>${data.category}</span>
      </div>
      <div>
        <strong>Cantidad de vendidos</strong><br/>
        <span>${data.soldCount}</span>
      </div>
      <div class="product-buttons_container">
        <div class="my-2">
          <button class="px-3 py-1 btn_product-info">
            <span>
              <i class="fa-regular fa-credit-card"></i>
              Comprar
            </span>
          </button>
        </div>
        <button class="px-3 py-1 btn_product-info" onclick="addToCart('${data.id}')">
          <span>
            <i class="fa-solid fa-cart-shopping"></i>
            Agregar al carrito
          </span>
        </button>
        <button class="px-2 py-1 btn_product-info" id="heartButton">
            <i class="fa-regular fa-heart" id="heart"></i>
        </button>
      </div>
    </div>
  `;
  // Obtener el botón y el ícono de corazón
  const heartButton = document.getElementById('heartButton');
  const heartIcon = document.getElementById('heart');

  // Agregar evento de clic al botón
  heartButton.addEventListener('click', function () {
    // Cambiar la clase del ícono de corazón
    heartIcon.classList.toggle('fa-solid');
  });
  loadComments(productID);
};

const requestToAPI = (URL) => {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => showProduct(data))
    .catch((error) => console.error('Error displaying product: ', error));
};


const loadComments = (productID) => {
  if (productID) {
    const API_URL = `https://japceibal.github.io/emercado-api/products_comments/${productID}.json`;
    fetch(API_URL)
      .then((response) => response.json())
      .then((commentsData) => {
        commentsContainer.innerHTML = '';
        if (commentsData && commentsData.length > 0) {
          commentsData.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
          commentsData.forEach((comment) => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');

            const productRating = comment.score;
            const starsElement = stars(productRating);

            commentElement.innerHTML = `
              <div class="list-group-item list-group-item-action cursor-active">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <strong>${comment.user}</strong> ${comment.dateTime}
                    </div>
                    <div class="d-flex align-items-center">
                        ${starsElement.outerHTML} 
                        <p class="rating-container">(${comment.score})</p> 
                    </div>
                </div>
                <div> 
                    <p>${comment.description}</p>
                </div>
              </div>
            `;

            commentsContainer.appendChild(commentElement);
          });

          loadStorageComments();
        } else {
          commentsContainer.innerHTML = '<p>No hay comentarios disponibles.</p>';
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        commentsContainer.innerHTML = '<p>Error loading comments.</p>';
      });
  }
};

function loadStorageComments() {
  const storageComments = JSON.parse(localStorage.getItem('userComments')).filter(a => a.id === productID);
  if (storageComments.length > 0) {
    for (comments of storageComments) {
      const commentElement = document.createElement('div');
      commentElement.classList.add('comment');

      const productRating = comments.score;
      const starsElement = stars(productRating);

      commentElement.innerHTML = `
        <div class="list-group-item list-group-item-action cursor-active">
        <div class="d-flex justify-content-between align-items-center">
            <div>
                <strong>${comments.user}</strong> ${comments.dateTime}
            </div>
            <div class="d-flex align-items-center">
                ${starsElement.outerHTML} 
                <p class="rating-container">(${comments.score})</p> 
            </div>
        </div>
        <div> 
            <p>${comments.description}</p>
        </div>
      </div>
        `;

      commentsContainer.appendChild(commentElement);
    }
  }
}



const domLoaded = () => {
  if (productID) {
    const API_URL = `https://japceibal.github.io/emercado-api/products/${productID}.json`;
    requestToAPI(API_URL);
  }
};

document.addEventListener('DOMContentLoaded', domLoaded);

const addUserCommentToListOfComments = comment => {
  const userComments = JSON.parse(localStorage.getItem('userComments'));

  userComments.push(comment);

  localStorage.setItem('userComments', JSON.stringify(userComments));
}

function newComment(event) {
  event.preventDefault();

  const comentarioNuevo = event.target.querySelector('.new-comment');
  const nuevoRating = parseFloat(document.getElementById('newRating').value);

  if (
    comentarioNuevo &&
    !isNaN(nuevoRating) &&
    nuevoRating >= 0 &&
    nuevoRating <= 5 &&
    comentarioNuevo.value.trim() !== '' &&
    isLoggedIn()
  ) {
    const fechaYHora = new Date().toLocaleString('en-CA', {
      hour12: false,
    });

    const nuevoComentario = document.createElement('div');
    nuevoComentario.classList.add(
      'list-group-item',
      'list-group-item-action',
      'cursor-active'
    );
    nuevoComentario.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <strong>${user.textContent}</strong> ${fechaYHora
        .replace(/\//g, '-')
        .replace(',', '')}
          </div>
          <div class="d-flex align-items-center">
            ${stars(nuevoRating).outerHTML}
            <p class="rating-container">(${nuevoRating})</p>
          </div>
        </div>
        <div>
          <p>${comentarioNuevo.value}</p>
        </div>
      `;

    addUserCommentToListOfComments({
      id: productID,
      user: user.textContent,
      dateTime: fechaYHora.replace(/\//g, '-').replace(',', ''),
      score: nuevoRating,
      description: comentarioNuevo.value
    })

    commentsContainer.appendChild(nuevoComentario);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Comentario enviado',
      showConfirmButton: false,
      timer: 1500
    })
    comentarioNuevo.value = '';
    document.getElementById('newRating').value = '';
  } else {
    if (!isLoggedIn()) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Es necesario iniciar sesión para realizar un comentario',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }
}

const formComen = document.getElementById('commentForm');

if (formComen) {
  formComen.addEventListener('submit', newComment);
}

newRating.addEventListener('input', () => {
  const value = newRating.value;
  const isValid = /^-?\d*\.?\d*$/.test(value);

  if (!isValid) {
    newRating.value = '';
  }
  if (value > 5) {
    let stringRating = newRating.value.toString();
    newRating.value = stringRating.slice(-1) > 5 ? 5 : stringRating.slice(-1)
  }
});

newRating.addEventListener('keydown', (event) => {
  const key = event.key;
  const notValidKeys = ['-', '+', 'e']
  if (notValidKeys.includes(key)) {
    event.preventDefault();
  }
});

// Carga inicial de los productos relacionados
fetch(relatedAPI)
  .then(response => response.json())
  .then(data => {
    showRelatedProducts(data)
  })
  .catch(error => {
    console.error('Error al cargar datos relacionados:', error);
  });


function showRelatedProducts(data) {
  // Crea un contenedor para los productos relacionados
  const containerRelatedProducts = document.createElement('div');
  containerRelatedProducts.classList.add('d-flex');

  // Itera a través de los productos relacionados en los datos
  data.relatedProducts.forEach((relateProduct) => {
    // Crea un elemento para un producto relacionado
    const conte = document.createElement('div');
    conte.classList.add('related');
    // Genera el HTML para la tarjeta de producto relacionado
    conte.innerHTML += `
      <div class="card mx-2" style="width: 18rem">
        <div id="card-titulo" class="card-title text-center"><h4>${relateProduct.name}<h4></div>
        <img class="card-img-top img-thumbnail"" src="${relateProduct.image}">
      </div>
    `;
    // Agrega el producto relacionado al contenedor
    containerRelatedProducts.appendChild(conte);

    // Al hacer clic en una tarjeta relacionada, actualiza el producto seleccionado
    const tempID = `${relateProduct.id}`;
    conte.addEventListener('click', () => {
      updateProduct(tempID);
      scrollToTop();
    });
  });

  // Agrega el contenedor de productos relacionados a la página
  relatedProductContainer.appendChild(containerRelatedProducts);
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'instant'
  });
}


function updateProduct(productID) {
  const API_URL = `https://japceibal.github.io/emercado-api/products/${productID}.json`;

  // Realiza una solicitud fetch a la URL de la API
  fetch(API_URL)
    .then((response) => response.json()) // Procesa la respuesta como JSON
    .then((data) => {
      // Limpia el contenido actual en la página
      container.innerHTML = '';
      commentsContainer.innerHTML = '';
      relatedProductContainer.innerHTML = '';

      // Muestra los detalles del nuevo producto
      showProduct(data);
      loadComments(productID);
      showRelatedProducts(data);

      // Actualiza el ID del producto seleccionado en el localStorage
      localStorage.setItem('productoSeleccionado', productID);
    })
    .catch((error) => {
      console.error('Error al mostrar el producto:', error);
    });
}

function isLoggedIn() {
  return sessionStorage.getItem("email") || localStorage.getItem("email");
}

function showMessage(position, icon, title) {
  Swal.fire({
    position: position,
    icon: icon,
    title: title,
    showConfirmButton: false,
    timer: 1500,
    customClass: {
      title: 'showMessage_title',
      icon: 'showMessage_icon'
    },
    scrollbarPadding: false,
    heightAuto: false
  })
}
