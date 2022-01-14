// импортирую библиотеки нотифай, симпллайтбокс, аксиос
import './sass/main.scss';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
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
  // photoCardEl: document.querySelector('.photo-card'),
};

// ===немного оформления элементов
refs.form.style =
  'background-color: #4056b4; display: flex; justify-content: center; padding: 8px; margin-bottom: 8px';
refs.submitBtn.style = 'margin-left: 32px';
// refs.galleryEl.style = 'display: flex; flex-wrap: wrap';

// refs.loadMoreBtn.classList.add('is-hidden');
refs.loadMoreBtn.style = ' display: none';
//   ' display: flex; margin-top: 32px; margin-left: auto;  margin-right: auto; background-color: yellow';
// refs.loadMoreBtn.disabled = 'false';
// ====повесила слушатель события  на форму для ввода на событие сабмит
refs.form.addEventListener('submit', onSubmit);
// refs.galleryEl.addEventListener('click', onImageClick);
refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);

const imageApiService = new ImageApiService();

// console.log(imageApiService);
function createImageEl(hits) {
  const markup = hits
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `
          <a href="${largeImageURL}" class="photo-card">
           <img src="${webformatURL}" alt="${tags}" loading = "lazy"  class="photo-image" />
           <div class="info" style= "display: flex">
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
             </a> `;
    })
    .join('');
  // console.log(markup);
  refs.galleryEl.innerHTML = markup;
  console.log(refs.galleryEl);
  simpleLightbox();
  refs.loadMoreBtn.style =
    ' display: flex; margin-top: 32px; margin-left: auto;  margin-right: auto; background-color: yellow';
  // refs.galleryEl.insertAdjacentHTML('beforeend', markup);
}

// function photoMarkup(markup) {
//   console.log(markup);
//   // refs.galleryEl.innerHTML = markup;
//   refs.galleryEl.insertAdjacentHTML('beforeend', createImageEl());
//   // console.log(refs.galleryEl);
//   refs.loadMoreBtn.style =
//     ' display: flex; margin-top: 32px; margin-left: auto;  margin-right: auto; background-color: yellow';
//   // refs.galleryEl.insertAdjacentHTML('beforeend', markup);
// }

function onSubmit(e) {
  // ===== запрет браузеру на перезагрузку страницы
  e.preventDefault();
  imageApiService.searchQuery = e.currentTarget.elements.searchQuery.value;
  console.log(imageApiService.searchQuery);
  imageApiService.resetPage();
  try {
    if (imageApiService.searchQuery === '') {
      Notify.warning('Ведите запрос');
    } else {
      //  обрабатываем вернувшийся результат (промис) с бекенда
      imageApiService.fetchFotos().then(data => {
        console.log(data);
        console.log('работает зен');
        clearImagesContainer();
        if (data.hits.length === 0) {
          Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.',
          );
        } else {
          Notify.success(`Hooray! We found ${data.totalHits} images.`);
          createImageEl(data.hits);
        }
      });
    }
  } catch (error) {
    // === цепляю метод для обработки ошибки(=======)
    Notify.failure("We're sorry, but you've reached the end of search results.");
    console.log(error.message);
  }
}

function onLoadMoreClick(e) {
  // ===== запрет браузеру на перезагрузку страницы
  e.preventDefault();
  console.log('работает');
  imageApiService.fetchFotos().then(data => createImageEl(data.hits));
}
function clearImagesContainer() {
  refs.galleryEl.innerHTML = '';
}

function simpleLightbox() {
  let lightbox = new SimpleLightbox('.gallery a', {
    /* options */
  });
  lightbox.refresh();
}

// let infScroll = new InfiniteScroll('.gallery', {
//   // options
// });

// axiosPixabay(searchQuery)
//   //  обрабатываем вернувшийся результат (промис) с бекенда
//   .then(image => {
//     console.log('работает зен2', image);
//     pageNumber += 1;
//     // console.log(image.data);
//     // const imagesSearch = image.data.hits;
//     // console.log(imagesSearch);
//     // if (imagesSearch.length === 0) {
//     //   Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//     // } else {
//     //   createImageEl(imagesSearch);
//     // }
//   })
//   // === цепляю метод для обработки ошибки
//   .catch(error => console.log(error));
