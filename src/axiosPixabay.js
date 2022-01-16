// === именованный экспорт функции которая делает запрос на бекенд и возвращает промис
// import axios from 'axios';
const axios = require('axios');
const API_KEY = '25154920-bc2b97b916e9c15e1ff6fb5dd';
const BASE_URL = 'https://pixabay.com/api';
// ==============запрос через фетч================
// export default class ImageApiService {
//   constructor() {
//     this.searchQuery = '';
//     this.page = 1;
//   }
//   fetchFotos() {
//     console.log(this);

//     const url = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
//     return fetch(url)
//       .then(response => response.json())
//       .then(data => {
//         this.icrementPage();
//         console.log(data);
//         return data;
//       });
//   }
//   icrementPage() {
//     this.page += 1;
//   }
//   resetPage() {
//     this.page = 1;
//   }
//   get query() {
//     return this.searchQuery;
//   }
//   set query(newQuery) {
//     this.query - newQuery;
//   }
// };

export default class ImageApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
  }
  async fetchFotos() {
    try {
      console.log(this);
      const params = new URLSearchParams({
        q: this.searchQuery,
        key: '25154920-bc2b97b916e9c15e1ff6fb5dd',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: this.per_page,
        page: this.page,
      });

      const url = `${BASE_URL}/?${params}`;
      console.log(url);
      console.log(params);
      this.icrementPage();
      // console.log(axios.get(url, { params }));
      return await axios.get(url);
    } catch (error) {
      // === цепляю метод для обработки ошибки(=======)
      console.log(error.message);
    }
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

//   return axios.get('url', {
//     params,
//   });
// }
