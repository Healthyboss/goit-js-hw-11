import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

export async function searchImages(searchQuery, page, gallery, btnLoadMore) {
  try {
    const params = new URLSearchParams({
      key: '43706689-5ac61aa02d8e0198b8519ebdf',
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 40,
    });
    const response = await axios.get(`https://pixabay.com/api/?${params}`);
    const { data } = response;
    const { hits, totalHits } = data;

    if (hits.length === 0) {
      gallery.innerHTML = '';
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    }

    hits.forEach(hit => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = hit;
      const card = `
    <div class="photo-card">
        <a href="${largeImageURL}" class="lightbox" data-alt="${tags}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        <div class="info">
        <p class="info-item"><b>Likes: </b>${likes}</p>
        <p class="info-item"><b>Views: </b>${views}</p>
        <p class="info-item"><b>Comments: </b>${comments}</p>
        <p class="info-item"> <b>Downloads: </b>${downloads}</p>
        </div>
    </div>`;
      gallery.insertAdjacentHTML('beforeend', card);
    });
    //   const lightbox = new SimpleLightbox('.lightbox');
    const lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
    lightbox.refresh();

    btnLoadMore.style.display = hits.length < totalHits ? 'block' : 'none';
    scrollSmoothly();
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

export function scrollSmoothly() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
