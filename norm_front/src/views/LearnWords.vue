<template>
    <div v-if="quiz">
      <h2>{{ quiz.word_eng }}</h2>
      <div v-for="(option, index) in options" :key="index">
        <button @click="checkAnswer(option)">{{ option }}</button>
      </div>
    </div>
  </template>
  
  <script>
  import { getQuiz, postAnswer } from '../api';
  
  export default {
    data() {
      return {
        quiz: null,
        tg_id: null,
        options: [],
      };
    },
    async created() {
      const tg = window.Telegram.WebApp;
      tg.ready();
      this.tg_id = tg.initDataUnsafe.user?.id;
      if (!this.tg_id) {
        alert("tg_id не получен");
        return;
      }
      await this.loadQuiz();
    },
    methods: {
      async loadQuiz() {
        const data = await getQuiz(this.tg_id);
        if (!data.word_id) return;
  
        this.quiz = data;
  
        const correct = data.word_rus;
        const wrong = ['стол', 'небо', 'песня', 'вода'].filter(w => w !== correct); // простая замена
        this.options = [correct, ...wrong.slice(0, 3)].sort(() => Math.random() - 0.5);
      },
      async checkAnswer(answer) {
        const isCorrect = answer === this.quiz.word_rus;
        await postAnswer({
          tg_id: this.tg_id,
          word_id: this.quiz.word_id,
          was_in_repeat: this.quiz.was_in_repeat,
        });
        if (isCorrect) alert('Правильно!');
        else alert('Неправильно!');
        await this.loadQuiz();
      },
    },
  };
  </script>
  