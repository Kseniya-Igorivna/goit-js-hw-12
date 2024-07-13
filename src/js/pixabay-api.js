
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '44810429-780319b334a9c60538a2ecf11';

export async function fetchImages(query, page = 1) {
    const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=${page}`;
    const response = await axios.get(url);
    if (response.status !== 200) {
        throw new Error('Failed to fetch images');
    }
    return response.data;
}