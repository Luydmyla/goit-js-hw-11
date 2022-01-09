// импортирую библиотеки нотифай, симпллайтбокс, аксиос
import './sass/main.scss';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';
import { axiosPixabay } from './axiosPixabay';

// установила симпллайтбокс, нотифай и аксиос зарегестрировалась на  пиксабей
// нашла ссылки на элементы формы и кнопки
const refs = {
  form: document.querySelector('#search-form'),
  submitBtn: document.querySelector('#search-form button'),
};
// ===немного оформления элементов
refs.form.style = 'background-color: #4056b4; display: flex; justify-content: center; padding: 8px';
refs.submitBtn.style = 'margin-left: 32px';

// ====повесила слушатель события  на форму для ввода на событие сабмит
refs.form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  // ===== запрет браузеру на перезагрузку страницы
  e.preventDefault();
  console.log(e.target);
  console.log(e.currentTarget);
  const imageSearch = e.target;
  axiosPixabay(imageSearch)
    //  обрабатываем вернувшийся результат (промис) с бекенда
    .then(image => {
      console.log('работает зен', image);
    })
    // === цепляю метод для обработки ошибки
    .catch(onFetchCatch);
}
