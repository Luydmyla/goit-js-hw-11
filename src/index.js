// импортирую библиотеки нотифай, симпллайтбокс, аксиос
import './sass/main.scss';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
// import SimpleLightbox from 'simplelightbox/dist/simple-lightbox.esm';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';
import { axiosPixabay } from './axiosPixabay';
import ImageApiService from './axiosPixabay';

// установила симпллайтбокс, нотифай и аксиос зарегестрировалась на  пиксабей
// нашла ссылки на элементы формы и кнопки
const refs = {
  form: document.querySelector('#search-form'),
  submitBtn: document.querySelector('#search-form button'),
  galleryEl: document.querySelector('.gallery'),
};
// ===немного оформления элементов
refs.form.style = 'background-color: #4056b4; display: flex; justify-content: center; padding: 8px';
refs.submitBtn.style = 'margin-left: 32px';

// ====повесила слушатель события  на форму для ввода на событие сабмит
refs.form.addEventListener('submit', onSubmit);
// refs.galleryEl.addEventListener('click');
// const imageApiService = new ImageApiService();
let imagesSearch = '';
let searchQuery = '';
// simpleLightbox();
function createImageEl(imagesSearch) {
  simpleLightbox();
  const markup = imagesSearch
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `<div class="photo-card">
       <a href="${largeImageURL}">
           <img src="${webformatURL}" alt="${tags}" loading = "lazy" /> </a>
           <div class="info">
              <p class="info-item">
                 <b>Likes:</b>${likes}
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
           </div>`;
    })
    .join('');
  refs.galleryEl.innerHTML = markup;
  // refs.galleryEl.insertAdjacentHTML('beforeend', markup);
}
function simpleLightbox() {
  let gallery = new SimpleLightbox('.gallery a');
  gallery.refresh();
}

function onSubmit(e) {
  // ===== запрет браузеру на перезагрузку страницы
  e.preventDefault();
  searchQuery = e.currentTarget.elements.searchQuery.value;
  console.log(searchQuery);
  // imagesSearch = e.currentTarget;
  // console.log(imagesSearch);
  axiosPixabay(searchQuery)
    //  обрабатываем вернувшийся результат (промис) с бекенда
    .then(image => {
      console.log('работает зен', image);
      console.log(image.data);
      const imagesSearch = image.data.hits;
      console.log(imagesSearch);
      if (imagesSearch.length === 0) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      } else {
        createImageEl(imagesSearch);
      }
    })
    // === цепляю метод для обработки ошибки
    .catch(error => console.log(error));
}
