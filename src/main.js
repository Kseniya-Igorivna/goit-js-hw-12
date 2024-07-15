
import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, showError, showLoading, hideLoading, clearGallery } from './js/render-functions.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('search-form');
    const input = form.querySelector('input[name="query"]');
    const loadMoreButton = document.querySelector('.load-more');
    let query = '';
    let page = 1;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        query = input.value.trim();
        page = 1;
        if (query === '') {
            showError('Please enter a search query');
            input.value = '';
            return;
        }
        try {
            showLoading();
            const data = await fetchImages(query, page);
            hideLoading();
            clearGallery();
            if (data.hits.length === 0) {
                showError('Sorry, there are no images matching your search query. Please try again!');
                loadMoreButton.style.display = 'none';
            } else {
                renderGallery(data.hits);
                input.value = '';
                if (data.totalHits > 15) {
                    loadMoreButton.style.display = 'block';
                } else {
                    loadMoreButton.style.display = 'none';
                }
            }
        } catch (error) {
            hideLoading();
            clearGallery();
            showError('Failed to fetch images. Please try again later.');
            loadMoreButton.style.display = 'none';
        }
    });

    loadMoreButton.addEventListener('click', async () => {
        page += 1;
        try {
            showLoading();
            const data = await fetchImages(query, page);
            hideLoading();
            if (data.hits.length > 0) {
                renderGallery(data.hits, true);
                if (data.hits.length < 15) {
                    loadMoreButton.style.display = 'none';
                    showError("We're sorry, but you've reached the end of search results.");
                }
            } else {
                loadMoreButton.style.display = 'none';
                showError("We're sorry, but you've reached the end of search results.");
            }
        } catch (error) {
            hideLoading();
            showError('Failed to fetch images. Please try again later.');
            loadMoreButton.style.display = 'none';
        }
    });
});