import { createRouter, createWebHashHistory } from 'vue-router';
import LearnWords from './views/LearnWords.vue';
import StatsView from './views/StatsView.vue';

const routes = [
  { path: '/', component: LearnWords },
  { path: '/stats', component: StatsView },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
