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

/*
const showProduct = (data) => {
  const imgs = data.images
    .map((element, index) => `
    <div class="carousel-item${index === 0 ? ' active' : ''}">
      <img src="${element}" class="d-block w-100">
    </div>
  `)
    .join('');

  container.innerHTML = `
    <h2 class="my-3">${data.name}</h2>
    <hr/>
    <div class="d-flex flex-column gap-3">
        <div>
            <strong>Precio</strong><br/>
            <span>${data.currency} ${data.cost}</span>
        </div>
        <div>
            <strong>Descripción</strong><br/>
            <span>${data.description}</span>
        </div>
        <div>
            <strong>Categoría</strong><br/>
            <span>${data.category}</span>
        </div>
        <div>
            <strong>Cantidad de vendidos</strong><br/>
            <span>${data.soldCount}</span>
        </div>
        <div>
            <strong>Imágenes ilustrativas</strong><br/>
            <div id="carouselProduct" class="carousel slide">
  <div class="carousel-inner">
    ${imgs}
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselProduct" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselProduct" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
          </div>
          `;
};

const requestToAPI = (URL) => {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => showProduct(data))
    .catch((error) => console.error('Error displaying product: ', error));
}; 
*/

const showProduct = (data) => {
  const imgs = data.images
    .map((element) => `<img src="${element}" width="250">`)
    .join('');

  container. innerHTML = `
    <h2 class="my-3">${data. name}</h2>
    <hr/>
    <div class="d-flex flex-column gap-3">
      <div>
        <strong>Precio</strong><br/>
        <span>${data.currency} ${data.cost}</span>
      </div>
      <div>
        <strong>Descripción</strong><br/>
        <span>${data.description}</span>
      </div>
      <div>
        <strong>Categoría</strong><br/>
        <span>${data.category}</span>
      </div>
      <div>
        <strong>Cantidad de vendidos</strong><br/>
        <span>${data.soldCount}</span>
      </div>
      <div>
        <strong>Imágenes ilustrativas</strong><br/>
        <div class="d-flex gap-2">
          ${imgs}
        </div>
      </div>
    </div>
  `;
  loadComments(productID);
};

const requestToAPI = (URL) => {
  fetch (URL)
    .then((response) => response. json())
    .then ((data) => showProduct(data))
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

const domLoaded = () => {
  loadComments(productID);
  if (productID) {
    const API_URL = `https://japceibal.github.io/emercado-api/products/${productID}.json`;
    requestToAPI(API_URL);
  }
};

document.addEventListener('DOMContentLoaded', domLoaded);

function newComment(event) {
  event.preventDefault();

  const comentarioNuevo = event.target.querySelector('.new-comment');
  const nuevoRating = parseFloat(document.getElementById('newRating').value);

  if (
    comentarioNuevo &&
    !isNaN(nuevoRating) &&
    nuevoRating >= 0 &&
    nuevoRating <= 5 &&
    comentarioNuevo.value.trim() !== ''
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

    commentsContainer.appendChild(nuevoComentario);

    comentarioNuevo.value = '';
    document.getElementById('newRating').value = '';
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

