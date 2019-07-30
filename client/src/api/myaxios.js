import axios from 'axios';

const AXIOS_PERSONALITY = axios.create({
  baseURL: 'http://localhost:3000/personalityAnalysisResult',
});

const AXIOS_PERPOST = axios.create({
  baseURL: 'http://localhost:3000/perPost',
});

export default AXIOS_PERSONALITY;
