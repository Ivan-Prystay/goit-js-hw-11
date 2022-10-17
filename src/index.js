import { refs } from './js/refs';
import { getPhoto } from './js/getphoto';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
let page = 1;
let loadInputValue = '';

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
  getPhoto(inputValue, page);

  console.log('page: ', page);
});

refs.loadMore.addEventListener('click', () => {
  page += 1;
  getPhoto(loadInputValue, page);

  console.log('page: ', page);
});
