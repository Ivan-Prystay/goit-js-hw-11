import { refs } from './refs';
export function markupCreate(photos) {
  return refs.gallery.insertAdjacentHTML(
    'beforeend',
    photos.hits
      .map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) => `<div class="photo-card">
<a class="photo-card__link" href="${largeImageURL}"><img class="photo-card__image" src="${webformatURL}" alt="${tags}" loading="lazy"/></a>
  <div class="info">
  <p class="info-item">
  <b>Likes: </b>${likes}
  </p>
  <p class="info-item">
  <b>Views: </b>${views}
  </p>
  <p class="info-item">
  <b>Comments: </b>${comments}
  </p>
  <p class="info-item">
  <b>Downloads: </b>${downloads}
  </p>
  </div>
  </div>`
      )
      .join('')
  );
}
