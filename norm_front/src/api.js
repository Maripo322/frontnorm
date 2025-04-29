import axios from 'axios';

const API_BASE = 'https://urban-halibut-69597wq6645pfj66-8000.app.github.dev/'; 

export async function getQuiz(tg_id) {
  const res = await axios.get(`${API_BASE}/quiz/${tg_id}`);
  return res.data;
}

export async function postAnswer(data) {
  return axios.post(`${API_BASE}/answer`, data);
}

export async function getStats(tg_id) {
  const res = await axios.get(`${API_BASE}/stats/${tg_id}`);
  return res.data;
}
