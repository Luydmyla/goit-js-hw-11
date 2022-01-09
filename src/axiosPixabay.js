// === именованный экспорт функции которая делает запрос на бекенд и возвращает промис
import axios from 'axios';
export function axiosPixabay(q) {
  const params = {
    key: 25154920,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  axios
    .get(`https://pixabay.com/users/lyticok/q/${q}?fields=${params}`)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  // .then(function () {
  //   // always executed
  // });
}
