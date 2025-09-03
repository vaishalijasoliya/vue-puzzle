<template>
    <v-container>

        <v-card class="mb-6" style="position: relative;" elevation="6">
            <v-card class="question-box " elevation="4" style="position: relative; overflow: hidden">
                <div class="card-bg" :style="{ background: quizData.gradient }"></div>
                <div class="result-page d-flex flex-column align-center justify-center"
                    style="position: relative; z-index: 1">

                    <v-chip color="deep-purple-accent-4" text-color="white"
                        class="mb-16 font-weight-bold px-6 py-4 correct-chip">
                        Correct Answer {{ correctCount }}/{{ totalQuestions }}
                    </v-chip>
                    <v-card class="rank-card text-center pa-8 animate-card" elevation="12">
                        <!-- Ribbon with Glow -->
                        <div class="ribbon glow">
                            <v-avatar size="90" class="avatar-shadow">
                                <v-img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Profile" />
                            </v-avatar>
                        </div>

                        <!-- User Info -->
                        <h2 class="name mt-8">{{ userName }}</h2>
                        <p class="rank-label">Rank</p>

                        <!-- Animated Rank -->
                        <h1 class="rank-number">{{ animatedRank }}</h1>
                    </v-card>
                    <div class="text-center mt-10 px-6">
                        <h2 class="font-weight-bold mb-2">🎉 Congratulations!</h2>
                        <p class="subtitle">You've completed this quiz.<br>Keep testing your knowledge by playing more
                            quizzes!</p>
                    </div>

                    <!-- Explore Button -->
                    <v-btn size="x-large" class="mt-8 px-10 explore-btn" elevation="8">
                        Explore More
                    </v-btn>
                </div>
            </v-card>
        </v-card>

        <!-- Badge Card -->


        <!-- Congratulation Message -->

    </v-container>
</template>

<script setup>
import { ref, onMounted, computed, defineProps } from "vue"

const props = defineProps({
    answers: { type: Array, required: true },
    quizData: { type: Object, required: true }
})
const allQuestions = computed(() => props.quizData.quiz || [])

// Count correct answers
const correctCount = computed(() =>
    allQuestions.value.reduce((acc, q, i) => {
        return acc + (props.answers[i] === q.answer ? 1 : 0)
    }, 0)
)

const totalQuestions = allQuestions.value.length
const userName = ref("Roxane")
const rank = ref(432)
const animatedRank = ref(0)

onMounted(() => {
    let count = 0
    const interval = setInterval(() => {
        if (count < rank.value) {
            count += 5
            animatedRank.value = count
        } else {
            animatedRank.value = rank.value
            clearInterval(interval)
        }
    }, 20)
})
</script>

<style scoped>
.card-bg {
    position: absolute;
    inset: 0;
    opacity: 0.35;
    z-index: 0;
    /* border-radius: 20px; */
}

.question-box {
    color: #000;
    position: relative;
    overflow: hidden;
}

.result-page {
    /* min-height: 100vh; */
    padding: 32px;
}

/* Ensure chip stays visible */
.correct-chip {
    z-index: 10;
    position: relative;
}

/* Card Styling */
.rank-card {
    border-radius: 28px;
    width: 100%;
    max-width: 360px;
    background: white;
    position: relative;
    overflow: visible;
    transform: translateY(30px);
    opacity: 0;
    animation: slideUp 0.8s ease forwards;
}

/* Ribbon Glow */
.ribbon {
    position: absolute;
    top: -50px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(90deg, #7b2ff7, #f107a3);
    padding: 8px 40px;
    border-radius: 20px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    z-index: 5;
}

.glow {
    box-shadow: 0 0 18px rgba(241, 7, 163, 0.6), 0 0 28px rgba(123, 47, 247, 0.5);
}

.avatar-shadow {
    border: 4px solid white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* Text Styles */
.name {
    font-weight: 700;
    font-size: 1.4rem;
    margin: 0;
}

.rank-label {
    margin-top: 8px;
    color: gray;
    font-size: 1rem;
}

.rank-number {
    font-size: 3rem;
    font-weight: 900;
    margin-top: 8px;
    background: linear-gradient(90deg, #7b2ff7, #f107a3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

/* Subtitle */
.subtitle {
    opacity: 0.9;
    font-size: 1rem;
    line-height: 1.5;
}

/* Fancy Button */
.explore-btn {
    border-radius: 50px;
    background: linear-gradient(90deg, #ff8a00, #e52e71);
    color: white;
    font-weight: bold;
    transition: 0.3s;
}

.explore-btn:hover {
    box-shadow: 0 0 15px rgba(229, 46, 113, 0.6);
    transform: translateY(-2px);
}

/* Animations */
@keyframes slideUp {
    from {
        transform: translateY(30px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}
</style>
