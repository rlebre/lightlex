import axios from 'axios';

const API_URL = process.env.API_URL || 'https://api.themoviedb.org/3';
const API_KEY = process.env.API_KEY;

export default axios.create({
  baseURL: API_URL,
  params: {
    api_key: API_KEY,
    include_adult: false
  },
  headers: {
    'Accept': 'application/json'
  }
});
