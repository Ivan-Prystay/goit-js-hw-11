import { refs } from './js/refs';
import { getPhoto } from './js/getphoto';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
export let currentPage = 1;
let loadInputValue = '';

refs.form.addEventListener('submit', event => {
  event.preventDefault();
  currentPage += 1;
  const inputValue = refs.form.elements.searchQuery.value;
  if (!inputValue) {
    Notify.failure('Enter a search query!');
    return;
  }

  if (inputValue !== loadInputValue) {
    currentPage = 1;
    refs.gallery.innerHTML = '';
    refs.loadMore.classList.add('hidden');
    loadInputValue = inputValue;
  }
  getPhoto(inputValue, currentPage);

  console.log('input page: ', currentPage);
});

refs.loadMore.addEventListener('click', () => {
  currentPage += 1;
  getPhoto(loadInputValue, currentPage);

  console.log('loadmore  page: ', currentPage);
});

console.log('global currentPage: ', currentPage);
