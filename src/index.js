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
  loadMoreBtn: document.querySelector('.load-more'),
  // infoItemdEl: document.querySelector('.info-item'),
};
// ===немного оформления элементов
refs.form.style = 'background-color: #4056b4; display: flex; justify-content: center; padding: 8px';
refs.submitBtn.style = 'margin-left: 32px';
refs.loadMoreBtn.style =
  ' display: flex; margin-top: 32px; margin-left: auto;  margin-right: auto; background-color: yellow';
// refs.infoItemdEl.style = 'display: flex; justify-content: center';
// console.log(refs.infoItemdEl);

// ====повесила слушатель события  на форму для ввода на событие сабмит
refs.form.addEventListener('submit', onSubmit);
refs.galleryEl.addEventListener('click', onImageClick);
refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);

// const imageApiService = new ImageApiService();
let imagesSearch = '';
let searchQuery = '';
let pageNumber = 1;
// simpleLightbox();
function createImageEl(imagesSearch) {
  const markup = imagesSearch
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `<div class="photo-card">
       <a href="${largeImageURL}">
           <img src="${webformatURL}" alt="${tags}" loading = "lazy" /> </a>
           <div class="info" style= "display: flex; justify-content: space-around">
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

  console.log(markup);
  refs.galleryEl.innerHTML = markup;
  console.log(refs.galleryEl);
  // refs.galleryEl.insertAdjacentHTML('beforeend', markup);
}

// function simpleLightbox() {}
function onImageClick(e) {
  console.log('работает онклик');
  e.preventDefault();
  let lightbox = new SimpleLightbox('.gallery a', {
    /* options */
  });
  lightbox.refresh();
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
      // console.log(image.data);
      const imagesSearch = image.data.hits;
      pageNumber = Number(image.config.params.page);
      console.log(pageNumber);
      console.log(imagesSearch);
      if (imagesSearch.length === 0) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      } else {
        createImageEl(imagesSearch);
      }
      pageNumber += 1;
    })
    // === цепляю метод для обработки ошибки
    .catch(error => console.log(error));
}
function onLoadMoreClick(e) {
  // ===== запрет браузеру на перезагрузку страницы
  e.preventDefault();
  console.log('работает');
  console.log(pageNumber);
  // pageNumber = pageNumber + 1;
  // console.log(pageNumber);

  axiosPixabay(searchQuery)
    //  обрабатываем вернувшийся результат (промис) с бекенда
    .then(image => {
      console.log('работает зен2', image);
      pageNumber += 1;
      // console.log(image.data);
      // const imagesSearch = image.data.hits;
      // console.log(imagesSearch);
      // if (imagesSearch.length === 0) {
      //   Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      // } else {
      //   createImageEl(imagesSearch);
      // }
    })
    // === цепляю метод для обработки ошибки
    .catch(error => console.log(error));
}
