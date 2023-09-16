// Se obtiene el producto seleccionado en el localStorage
const productID = localStorage.getItem('productoSeleccionado');
const container = document.querySelector('#product-container');
const commentsContainer = document.querySelector('#comments-container');

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

const showProduct = (data) => {
  const imgs = data.images
    .map((element) => `<img src="${element}" width="250">`)
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
            <div class="d-flex gap-2">
                ${imgs}
            </div>
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

const loadComments = () => {
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
  loadComments();
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

newRating.addEventListener('input', event => {
  newRating.value.replace(/[^0-9.]/g, '')

  if (newRating.value > 5) {
    let stringRating = newRating.value.toString();
    newRating.value = stringRating.slice(-1) > 5 ? 5 : stringRating.slice(-1)
  }
});
