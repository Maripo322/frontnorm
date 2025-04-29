<template>
    <div>
      <p v-if="!telegramReady">⏳ Инициализация Telegram...</p>
      <p v-else-if="!tg_id">❌ Не удалось получить Telegram ID</p>
      <div v-else-if="loading">📡 Загружаем слово...</div>
      <div v-else-if="quiz">
        <h2>{{ quiz.word_eng }}</h2>
        <div v-for="(option, index) in options" :key="index">
          <button @click="checkAnswer(option)">{{ option }}</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { getQuiz, postAnswer } from '../api';
  
  export default {
    data() {
      return {
        tg_id: null,
        telegramReady: false,
        loading: false,
        quiz: null,
        options: [],
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
  
        await this.loadQuiz();
      } catch (e) {
        console.error("Ошибка инициализации:", e);
      }
    },
    methods: {
      async loadQuiz() {
        try {
          this.loading = true;
          const data = await getQuiz(this.tg_id);
          if (!data || !data.word_id) {
            this.quiz = null;
            return;
          }
  
          this.quiz = data;
  
          const correct = data.word_rus;
          const wrong = ['стол', 'небо', 'песня', 'вода'].filter(w => w !== correct);
          this.options = [correct, ...wrong.slice(0, 3)].sort(() => Math.random() - 0.5);
        } catch (err) {
          console.error("Ошибка загрузки слова:", err);
        } finally {
          this.loading = false;
        }
      },
      async checkAnswer(answer) {
        const isCorrect = answer === this.quiz.word_rus;
        await postAnswer({
          tg_id: this.tg_id,
          word_id: this.quiz.word_id,
          was_in_repeat: this.quiz.was_in_repeat,
        });
        alert(isCorrect ? '✅ Правильно!' : '❌ Неправильно!');
        await this.loadQuiz();
      },
    },
  };
  </script>
  