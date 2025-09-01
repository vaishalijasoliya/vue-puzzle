<template>
  <div style="padding: 60px">
  <div  class="quiz-container">
    <h1 class="title">{{ quizData.name }}</h1>

    <!-- Progress bar -->
    <div v-if="currentQuestion < quizData.questions.length" class="progress-wrapper">
      <div class="progress-bar" :style="{ width: progressPercent + '%' }"></div>
    </div>

    <!-- Questions -->
    <div v-if="currentQuestion < quizData.questions.length" class="question-block">
      <h2 class="question-title">
        {{ currentQuestion + 1 }} / {{ quizData.questions.length }}
        <span class="question-text">{{ quizData.questions[currentQuestion].title }}</span>
      </h2>

      <div class="options">
        <button
          v-for="(option, index) in quizData.questions[currentQuestion].options"
          :key="index"
          class="option-btn"
          @click="selectAnswer(option.type)"
        >
          {{ String.fromCharCode(65 + index) }}. {{ option.label }}
        </button>
      </div>
    </div>

    <!-- Result Section -->
    <div v-else class="result-block">
      <h2 class="result-title flex items-center justify-center gap-2">
        <PartyPopperIcon class="w-6 h-6 text-purple-600" />
        Your Result
        <PartyPopperIcon class="w-6 h-6 text-purple-600" />
      </h2>

      <div class="answer-counts">
        <!-- Tie -->
        <template v-if="answers.satisfier === answers.maximizer">
          <h3 class="tie-text flex items-center justify-center gap-2">
            <HandshakeIcon class="w-5 h-5 text-yellow-500" />
            It's a Tie!
          </h3>
          <p>Satisfier answers: {{ answers.satisfier }}</p>
          <p>Maximizer answers: {{ answers.maximizer }}</p>
        </template>

        <!-- Winner -->
        <template v-else>
          <div class="flex flex-col items-center">
            <component
              :is="resultData.icon === 'satisfier' ? SmileIcon : RocketIcon"
              class="w-8 h-8 text-purple-600 mb-2"
            />
            <h3 class="result-name" :class="resultData.name === 'The Satisfier' ? 'satisfier' : 'maximizer'">
              {{ resultData.name }}
            </h3>
            <p class="description">{{ resultData.description }}</p>
            <p v-if="resultData.name === quizData.types.satisfier.name" style="display: flex; align-items: center; justify-content: center; gap: 2px;">
              <CheckCircleIcon class="w-5 h-4 text-green-500" />
              You chose Satisfier answers <strong>{{ answers.satisfier }}</strong> times
            </p>
            <p v-else style="display: flex; align-items: center; justify-content: center; gap: 2px;">
              <CheckCircleIcon class="w-5 h-4 text-green-500" />
              You chose Maximizer answers <strong>{{ answers.maximizer }}</strong> times
            </p>
          </div>
        </template>
      </div>

      <!-- Restart -->
      <button class="restart-btn flex items-center justify-center gap-2" @click="restartQuiz">
        <RotateCcwIcon class="w-5 h-5" />
        Restart Quiz
      </button>
    </div>
  </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
import {
  PartyPopperIcon,
  HandshakeIcon,
  CheckCircleIcon,
  RotateCcwIcon,
  SmileIcon,
  RocketIcon,
} from "lucide-vue-next";

const quizData = {
  name: "What kind of decision maker are you?",
  types: {
    satisfier: {
      name: "The Satisfier",
      description: "A satisfier is someone who is content with 'good enough' and makes decisions quickly.",
      icon: "satisfier",
    },
    maximizer: {
      name: "The Maximizer",
      description: "A maximizer is someone who strives to make the best possible choice by exploring all options.",
      icon: "maximizer",
    },
  },
  questions: [
    {
      title: "What do you do when buying shoes?",
      options: [
        { label: "Buy the first pair I like then stop looking.", type: "satisfier" },
        { label: "Check every shop to get the best deal.", type: "maximizer" },
      ],
    },
    {
      title: "How do you choose a restaurant?",
      options: [
        { label: "Pick one that looks good and go in.", type: "satisfier" },
        { label: "Scroll through reviews and compare menus before deciding.", type: "maximizer" },
      ],
    },
    {
      title: "How do you approach choosing a movie to watch?",
      options: [
        { label: "I’ll pick one quickly and start watching.", type: "satisfier" },
        { label: "I’ll browse trailers, reviews, and ratings before deciding.", type: "maximizer" },
      ],
    },
    {
      title: "When planning a vacation, what do you do?",
      options: [
        { label: "Pick a destination and book without much comparison.", type: "satisfier" },
        { label: "Compare flights, hotels, and activities to get the best deal.", type: "maximizer" },
      ],
    },
    {
      title: "How do you shop for a new phone?",
      options: [
        { label: "Buy one that looks good and fits my needs.", type: "satisfier" },
        { label: "Research multiple brands, features, and reviews before buying.", type: "maximizer" },
      ],
    },
    {
      title: "How do you decide what to wear in the morning?",
      options: [
        { label: "Grab something comfortable and go.", type: "satisfier" },
        { label: "Mix and match outfits until I find the best look.", type: "maximizer" },
      ],
    },
    {
      title: "How do you pick a book to read?",
      options: [
        { label: "Choose one that catches my eye and start reading.", type: "satisfier" },
        { label: "Read reviews, ratings, and summaries before deciding.", type: "maximizer" },
      ],
    },
    {
      title: "What do you do when ordering food online?",
      options: [
        { label: "Pick the first meal that looks tasty.", type: "satisfier" },
        { label: "Scroll through multiple restaurants and compare menus.", type: "maximizer" },
      ],
    },
    {
      title: "How do you approach buying a gift for someone?",
      options: [
        { label: "Choose something thoughtful but simple.", type: "satisfier" },
        { label: "Research different ideas to find the perfect gift.", type: "maximizer" },
      ],
    },
    {
      title: "How do you decide on a workout routine?",
      options: [
        { label: "Pick an exercise I like and just do it.", type: "satisfier" },
        { label: "Compare different routines, benefits, and schedules first.", type: "maximizer" },
      ],
    },
  ],
};

const currentQuestion = ref(0);
const answers = reactive({ satisfier: 0, maximizer: 0 });

function selectAnswer(type) {
  answers[type]++;
  currentQuestion.value++;
}

function restartQuiz() {
  currentQuestion.value = 0;
  answers.satisfier = 0;
  answers.maximizer = 0;
}

const resultData = computed(() => {
  return answers.satisfier >= answers.maximizer
    ? quizData.types.satisfier
    : quizData.types.maximizer;
});

const progressPercent = computed(() => {
  return ((currentQuestion.value / quizData.questions.length) * 100).toFixed(0);
});
</script>

<style scoped>
.quiz-container {
  max-width: 700px;
  margin: auto;
  background: rgba(255, 255, 255, 0.8);
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 12px 40px rgba(99, 102, 241, 0.2);
  text-align: center;
  animation: fadeIn 0.7s ease-in-out;
}

.title {
  font-size: 30px;
  font-weight: 700;
  background: linear-gradient(90deg, #6366f1, #a855f7, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 25px;
}

.progress-wrapper {
  background: #f1f5f9;
  border-radius: 10px;
  height: 8px;
  margin-bottom: 20px;
  overflow: hidden;
}

.progress-bar {
  height: 8px;
  background: linear-gradient(90deg, #6366f1, #a855f7, #ec4899);
  transition: width 0.4s ease-in-out;
}

.question-title {
  font-size: 18px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 18px;
}

.question-text {
  display: block;
  font-size: 22px;
  font-weight: 700;
  color: #111827;
  margin-top: 6px;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.option-btn {
  padding: 14px 20px;
  border: none;
  border-radius: 9999px;
  background: linear-gradient(135deg, #6366f1, #a855f7, #ec4899);
  color: white;
  font-size: 16px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease-in-out;
}

.option-btn:hover {
  transform: translateY(-1px) scale(1);
  background: linear-gradient(135deg, #4338ca, #9333ea, #db2777);
  box-shadow: 0 6px 18px rgba(168, 85, 247, 0.4);
}

.result-block {
  margin-top: 20px;
}

.result-title {
  font-size: 26px;
  font-weight: bold;
  color: #4338ca;
  margin-bottom: 16px;
}

.result-name {
  font-size: 24px;
  font-weight: 700;
  margin: 10px 0;
}

.result-name.satisfier {
  color: #16a34a;
}

.result-name.maximizer {
  color: #dc2626;
}

.description {
  margin-top: 10px;
  font-size: 16px;
  color: #475569;
}

.tie-text {
  font-size: 20px;
  font-weight: bold;
  color: #f59e0b;
}

.restart-btn {
  margin-top: 25px;
  padding: 14px 28px;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border: none;
  border-radius: 9999px;
  font-size: 16px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;
  margin: auto;
}

.restart-btn:hover {
  transform: translateY(-1px) scale(1.05);
  background: linear-gradient(135deg, #059669, #047857);
  box-shadow: 0 6px 18px rgba(16, 185, 129, 0.5);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
