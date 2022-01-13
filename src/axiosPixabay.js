const API_KEY = '25154920-bc2b97b916e9c15e1ff6fb5dd';
const BASE_URL = 'https://pixabay.com/api';

export default class ImageApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  fetchFotos() {
    console.log(this);

    const url = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        this.icrementPage();
        console.log(data);
        return data.hits;
      });
  }
  icrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.query - newQuery;
  }
}
// пробовала через аксиос, пока еще не получилось
// // === именованный экспорт функции которая делает запрос на бекенд и возвращает промис
// import axios from 'axios';
// export function axiosPixabay(searchQuery) {
//   let pageNumber = 1;
//   const params = {
//     q: `${searchQuery}`,
//     key: '25154920-bc2b97b916e9c15e1ff6fb5dd',
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: true,
//     per_page: 4,
//     page: `${pageNumber}`,
//   };

//   return axios.get('https://pixabay.com/api/', {
//     params,
//   });
// }
