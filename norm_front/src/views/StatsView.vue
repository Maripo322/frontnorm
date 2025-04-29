<template>
    <div>
      <h2>Статистика</h2>
      <p>Изучено слов: {{ stats.learnedCount }}</p>
      <p>В повторении: {{ stats.repeatCount }}</p>
    </div>
  </template>
  
  <script>
  import { getStats } from '../api';
  
  export default {
    data() {
      return {
        tg_id: null,
        stats: {},
      };
    },
    async created() {
      const tg = window.Telegram.WebApp;
      this.tg_id = tg.initDataUnsafe.user?.id;
      if (!this.tg_id) {
        alert("tg_id не получен");
        return;
      }
      this.stats = await getStats(this.tg_id);
    },
  };
  </script>
  