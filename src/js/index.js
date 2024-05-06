import { searchImages } from './pixabay-api';
import { scrollSmoothly } from './pixabay-api';

const searchForm = document.querySelector('form#search-form');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
let page = 1;

searchForm.addEventListener('submit', async function (event) {
  event.preventDefault();
  const searchQuery = this.searchQuery.value.trim();
  if (searchQuery === '') return;
  page = 1;
  gallery.innerHTML = '';
  await searchImages(searchQuery, page, gallery, btnLoadMore);
});

btnLoadMore.addEventListener('click', async function () {
  const searchQuery = searchForm.searchQuery.value.trim();
  if (searchQuery === '') return;
  page++;
  await searchImages(searchQuery, page, gallery, btnLoadMore);
  scrollSmoothly();
});
