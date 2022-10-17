import { markupCreate } from './markupcreate';
import { Notify } from 'notiflix';
import { refs } from './refs';

import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = 'key=30588481-828dd19e4086d4e0d5bf36dc4';

const params = {
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 40,
};

export async function getPhoto(query, page) {
  try {
    const urlSearh = `?${API_KEY}&q=${query}&page=${page}`;
    const { data } = await axios.get(urlSearh, { params });
    console.log('Знайдено сторінок: ', Math.ceil(data.total / params.per_page));

    if (Math.ceil(data.total / params.per_page > 1)) {
      refs.loadMore.classList.remove('hidden');
    }
    if (page === Math.ceil(data.total / params.per_page)) {
      refs.loadMore.classList.add('hidden');
      Notify.info("We're sorry, but you've reached the end of search results.");
    }

    if (data.hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      refs.gallery.innerHTML = '';
      refs.form.reset();
    }
    markupCreate(data);
  } catch (error) {
    Notify.failure(error.message);
    refs.gallery.innerHTML = '';
    console.error(error);
  } finally {
  }
}
