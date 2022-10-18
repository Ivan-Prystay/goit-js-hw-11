import axios from 'axios';
import { Notify } from 'notiflix';
import { Loading } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { markupCreate } from './markupcreate';
import { refs } from './refs';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = 'key=30588481-828dd19e4086d4e0d5bf36dc4';

const params = {
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 40,
};

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: `alt`,
  captionDelay: 250,
});

export async function getPhoto(query, page) {
  try {
    const urlSearh = `?${API_KEY}&q=${query}&page=${page}`;
    const { data } = await axios.get(urlSearh, { params });
    showMessage(data, page);
    markupCreate(data);
    lightbox.refresh();
    Loading.standard('Loading...', {
      backgroundColor: 'rgba(0,0,0,0.8)',
    });
  } catch (error) {
    Loading.standard('Loading...', {
      backgroundColor: 'rgba(0,0,0,0.8)',
    });
    Notify.failure(error.message);
    refs.loadMore.classList.add('hidden');
    console.error(error);
  } finally {
    Loading.remove(500);
  }
}

function showMessage(data, page) {
  console.log('Знайдено сторінок: ', Math.ceil(data.total / params.per_page));
  if (Math.ceil(data.total / params.per_page > 1)) {
    refs.loadMore.classList.remove('hidden');
  }

  if (page === Math.ceil(data.total / params.per_page)) {
    refs.loadMore.classList.add('hidden');
    Notify.info("We're sorry, but you've reached the end of search results.");
    refs.form.reset();
  }

  if (page > Math.ceil(data.total / params.per_page)) {
    return (
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      ),
      (refs.gallery.innerHTML = ''),
      refs.loadMore.classList.add('hidden'),
      refs.form.reset(),
      setTimeout(() => {
        document.location.reload();
      }, 1000)
    );
  }

  if (data.hits.length === 0) {
    return (
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      ),
      (refs.gallery.innerHTML = ''),
      refs.loadMore.classList.add('hidden'),
      refs.form.reset()
    );
  }
  Notify.success(
    `Hooray! We found ${data.total} images on ${Math.ceil(
      data.total / params.per_page
    )} pages.`
  );
}
