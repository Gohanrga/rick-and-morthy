import axios from 'axios';
import store from './store/index';

const API_URL = 'https://rickandmortyapi.com/api/';

export class ApiService {

 
    async get(uri) {
        return await axios.get(API_URL + uri);
    }
    
    async getURL(url) {
        return await axios.get(url);
    }
    
    async post(uri, parametros) {
        return await axios.post((API_URL + uri), parametros);
    }
}