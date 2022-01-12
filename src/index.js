// импортирую библиотеки нотифай, симпллайтбокс, аксиос
import './sass/main.scss';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
// import SimpleLightbox from 'simplelightbox/dist/simple-lightbox.esm';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';
import { axiosPixabay } from './axiosPixabay';

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
let imagesSearch = '';
//
//     <div class="info">
//     <p class="info-item">
//       <b>Likes:</b>${likes}
//     </p>
//     <p class="info-item">
//       <b>Views: </b>${views}
//     </p>
//     <p class="info-item">
//       <b>Comments: </b>${comments}
//     </p>
//     <p class="info-item">
//       <b>Downloads: </b>${downloads}
//     </p>
// </div>
// const markup = createImageEl(imagesSearch);
// console.log(markup);
// function createImageEl(imagesSearch) {
//   return imagesSearch
//     .map(
//       image =>
//         `<a  href="${image.largeImageURL}"> <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy/> </a>`,
//     )

//     .join('');
// }
// refs.galleryEl.insertAdjacentHTML('beforeend', markup);

// --------- использую библиотеку симпллайтбокс как обработчик событий по клику на изображения-----------------

// gallery.on('show.simplelightbox', function () {
//   console.log(фото);
// });
//   captionsData: 'alt',
//   // captionPosition: 'bottom',
//   // captionDelay: 250,
// });
function createImageEl(imagesSearch) {
  const markup = imagesSearch
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `<a href="${largeImageURL}">
           <img src="${webformatURL}" alt="${tags}" loading = "lazy" /> </a>`;
    })
    .join('');
  refs.galleryEl.innerHTML = markup;
  // refs.galleryEl.insertAdjacentHTML('beforeend', markup);
}
function simpleLightbox() {
  let gallery = new SimpleLightbox('.gallery a', {});
  gallery.refresh();
}

function onSubmit(e) {
  // ===== запрет браузеру на перезагрузку страницы
  e.preventDefault();
  console.log(e.currentTarget);
  imagesSearch = e.currentTarget;
  console.log(imagesSearch);
  axiosPixabay(imagesSearch)
    //  обрабатываем вернувшийся результат (промис) с бекенда
    .then(image => {
      console.log('работает зен', image);
      console.log(image.data);
      const imagesSearch = image.data.hits;
      console.log(imagesSearch);
      if (imagesSearch.length === 0) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      } else {
        simpleLightbox();
        createImageEl(imagesSearch);
      }
    })
    // === цепляю метод для обработки ошибки
    .catch(error => console.log(error));
}
