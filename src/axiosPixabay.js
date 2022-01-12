// === именованный экспорт функции которая делает запрос на бекенд и возвращает промис
import axios from 'axios';
export function axiosPixabay(q) {
  const params = {
    q: 'cat',
    key: '25154920-bc2b97b916e9c15e1ff6fb5dd',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
  };

  return axios.get('https://pixabay.com/api/', {
    params,
  });
}
