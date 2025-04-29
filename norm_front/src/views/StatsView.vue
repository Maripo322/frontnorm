<template>
    <div>
      <p v-if="!telegramReady">⏳ Telegram инициализация...</p>
      <p v-else-if="!tg_id">❌ Не удалось получить Telegram ID</p>
      <div v-else-if="loading">📡 Загрузка статистики...</div>
      <div v-else>
        <h2>Статистика</h2>
        <p>Изучено слов: {{ stats.learnedCount }}</p>
        <p>В повторении: {{ stats.repeatCount }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { getStats } from '../api';
  
  export default {
    data() {
      return {
        tg_id: null,
        telegramReady: false,
        loading: false,
        stats: {},
      };
    },
    async created() {
      try {
        const tg = window.Telegram?.WebApp;
        tg.ready();
        this.telegramReady = true;
  
        this.tg_id = tg?.initDataUnsafe?.user?.id;
        if (!this.tg_id) {
          console.error("tg.initDataUnsafe:", tg?.initDataUnsafe);
          return;
        }
  
        this.loading = true;
        this.stats = await getStats(this.tg_id);
      } catch (e) {
        console.error("Ошибка получения статистики:", e);
      } finally {
        this.loading = false;
      }
    },
  };
  </script>
  