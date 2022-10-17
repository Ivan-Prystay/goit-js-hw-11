import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { refs } from './js/refs';
import { getPhoto } from './js/getphoto';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import markupCreate from './js/markupcreate';
let page = 1;
let loadInputValue = '';

const lightbox = new SimpleLightbox('.gallery a');

refs.form.addEventListener('submit', event => {
  event.preventDefault();
  page += 1;
  const inputValue = refs.form.elements.searchQuery.value;
  if (!inputValue) {
    Notify.failure('Enter a search query!');
    return;
  }
  if (inputValue !== loadInputValue) {
    page = 1;
    refs.gallery.innerHTML = '';
    refs.loadMore.classList.add('hidden');
    loadInputValue = inputValue;
  }
  lightbox.refresh();
  getPhoto(inputValue, page);
  console.log('page: ', page);
});

refs.loadMore.addEventListener('click', () => {
  page += 1;
  getPhoto(loadInputValue, page);
  lightbox.refresh();
  console.log('page: ', page);
});
