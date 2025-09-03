<template>
    <v-container class="py-8 quiz-page">
        <!-- Quiz UI -->
        <div v-if="!submitted">
            <v-row class="mb-8" align="center" justify="space-between">
                <v-col cols="12" md="8" class="text-md-left">
                    <h2 class="page-title">{{ data.title }}</h2>
                    <p class="quiz-sub">{{ data.desc }}</p>
                </v-col>
                <v-col cols="12" md="4" class="text-md-right">
                    <v-chip size="large" color="deep-purple-accent-4" text-color="white" class="font-weight-bold">
                        {{ data.quiz.length }} Questions
                    </v-chip>
                </v-col>
            </v-row>

            <div v-if="data?.quiz?.length" class="quiz-container pa-6">
                <v-card class="mb-6 pa-6 question-card" style="position: relative;" elevation="6">

                    <v-card class="question-box mb-6" elevation="4" style="position: relative; overflow: hidden;">
                        <div class="card-bg" :style="{ background: data.gradient }"></div>
                        <div class="text-center pa-6" style="position: relative; z-index: 1;">
                            <h3 class="question-text">
                                {{ currentIndex + 1 }}. {{ currentQuestion.q }}
                            </h3>
                        </div>
                    </v-card>

                    <!-- Timer -->
                    <div class="d-flex align-center justify-space-between mb-4" style="gap: 10px;">
                        <v-progress-linear :model-value="progressValue" height="10" color="deep-orange" rounded
                            striped />
                        <span class="time-text">{{ formattedTime }}</span>
                    </div>

                    <!-- Options -->
                    <div class="d-flex flex-column mb-8" style="gap: 12px;">
                        <v-card v-for="(opt, j) in currentQuestion.options" :key="j" class="option-card"
                            :class="{ selected: answers[currentIndex] === j }" @click="answers[currentIndex] = j"
                            elevation="3">
                            <div class="d-flex align-center pa-4">
                                <span class="option-text">
                                    {{ String.fromCharCode(65 + j) }}. {{ opt }}
                                </span>
                                <v-spacer />
                                <v-icon v-if="answers[currentIndex] === j" color="teal" size="28">
                                    mdi-check-circle
                                </v-icon>
                            </div>
                        </v-card>
                    </div>

                    <!-- Buttons -->
                    <v-row justify="center" style="gap: 10px;" class="mt-8">
                        <baseButton v-if="!usedAddTime[currentIndex] && canAddTime" @click="addTime">
                            Add Time
                        </baseButton>

                        <baseButton :disabled="currentIndex === 0" @click="prevQuestion">Previous</baseButton>

                        <baseButton v-if="currentIndex < data.quiz.length - 1" @click="skipQuestion">Skip →</baseButton>

                        <baseButton v-if="currentIndex < data.quiz.length - 1"
                            :disabled="answers[currentIndex] === undefined" @click="nextQuestion">
                            Next →
                        </baseButton>

                        <baseButton v-else @click="submitQuiz">
                            <v-icon left>mdi-check-bold</v-icon> Submit Quiz
                        </baseButton>
                    </v-row>
                </v-card>
            </div>
        </div>

        <!-- Result Page -->
        <div v-if="data?.quiz?.length" class="quiz-container pa-6">
            <ResultPage v-if="submitted" :answers="answers" :quizData="data" />
        </div>
    </v-container>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue"
import { useRoute } from "vue-router"
import { BaseButton } from "../ui/baseButton"
import ResultPage from "./resultPage.vue"

const route = useRoute()
const answers = ref([])
const currentIndex = ref(0)
const usedAddTime = ref([])
const submitted = ref(false)

const data = computed(() => {
    try {
        return JSON.parse(route.query.data)
    } catch (e) {
        return { quiz: [] }
    }
})

const currentQuestion = computed(() => data.value.quiz[currentIndex.value] || {})

const totalTime = 59
const timeLeft = ref(totalTime)
let timer = null

const progressValue = computed(() => ((totalTime - timeLeft.value) / totalTime) * 100)
const canAddTime = computed(() => timeLeft.value === 0)

const formattedTime = computed(() => {
    const m = Math.floor(timeLeft.value / 60).toString().padStart(1, "0")
    const s = (timeLeft.value % 60).toString().padStart(2, "0")
    return `${m}:${s}`
})

function startTimer() {
    clearInterval(timer)
    timer = setInterval(() => {
        if (timeLeft.value > 0) {
            timeLeft.value--
        } else {
            clearInterval(timer)
        }
    }, 1000)
}

function addTime() {
    if (timeLeft.value === 0) {
        timeLeft.value = 15
        usedAddTime.value[currentIndex.value] = true
        startTimer()
    }
}

function nextQuestion() {
    if (answers.value[currentIndex.value] !== undefined) {
        if (currentIndex.value < data.value.quiz.length - 1) {
            currentIndex.value++
        }
    }
}

function skipQuestion() {
    if (currentIndex.value < data.value.quiz.length - 1) {
        currentIndex.value++
    }
}

function prevQuestion() {
    if (currentIndex.value > 0) {
        currentIndex.value--
    }
}

function submitQuiz() {
    clearInterval(timer)
    submitted.value = true
}

watch(currentIndex, () => {
    timeLeft.value = totalTime
    startTimer()
})

onMounted(startTimer)
onBeforeUnmount(() => clearInterval(timer))
</script>

<style scoped>
.card-bg {
    position: absolute;
    inset: 0;
    opacity: 0.35;
    z-index: 0;
    border-radius: 20px;
}

.page-title {
    font-weight: 800;
    letter-spacing: -0.02em;
    margin: 0;
    background: linear-gradient(90deg, #ff5900, #ff8e42, #ffd194);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.quiz-sub {
    color: #fff;
    opacity: 0.8;
    margin-top: 6px;
}

.quiz-container {
    max-width: 550px;
    margin: auto;
}

.question-box {
    border-radius: 20px;
    color: #000;
    position: relative;
    overflow: hidden;
}

.option-card {
    border-radius: 14px;
    transition: 0.25s;
    cursor: pointer;
}

.option-card:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.option-card.selected {
    border: 2px solid teal;
    background-color: #e0f7f4;
}

.option-text {
    font-size: 1rem;
    font-weight: 500;
}

.submit-btn {
    font-weight: 600;
    padding: 0 24px;
}
</style>
