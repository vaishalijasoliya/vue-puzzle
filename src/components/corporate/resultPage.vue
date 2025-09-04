<template>
    <v-card style="position: relative;" elevation="6">
        <v-card class="question-box" elevation="4" style="position: relative; overflow: hidden">
            <div class="card-bg" :style="{ background: quizData.gradient }"></div>
            <div class="result-page d-flex flex-column align-center justify-center"
                style="position: relative; z-index: 1">
                <!-- Correct Answers -->
                <v-chip color="deep-purple-accent-4" text-color="white"
                    class="mb-16 font-weight-bold px-6 py-4 correct-chip">
                    Correct Answer {{ correctCount }}/{{ totalQuestions }}
                </v-chip>

                <!-- Rank Card -->
                <v-card class="rank-card text-center pa-8 animate-card" elevation="12">
                    <!-- Ribbon with Glow -->
                    <div class="ribbon glow">
                        <v-avatar size="90" class="avatar-shadow">
                            <v-img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Profile" />
                        </v-avatar>
                    </div>

                    <!-- User Info -->
                    <h2 class="name mt-8">{{ userName }}</h2>
                    <p class="rank-label">{{ rankLabel }}</p>

                    <!-- Animated Rank -->
                    <h1 class="rank-number">{{ animatedRank }}</h1>
                </v-card>

                <!-- Congrats Message -->
                <div class="text-center mt-10 px-6">
                    <h2 class="font-weight-bold mb-2">🎉 Congratulations!</h2>
                    <p class="subtitle">
                        You've completed this quiz.<br />Keep testing your knowledge by playing more quizzes!
                    </p>
                </div>


                <BaseButton class="mt-8 px-10">
                    Explore More
                </BaseButton>
            </div>
        </v-card>
    </v-card>
</template>

<script setup>
import { ref, onMounted, computed, defineProps } from "vue"
import { BaseButton } from "../ui/baseButton"

const props = defineProps({
    answers: { type: Array, required: true },
    quizData: { type: Object, required: true },
})

const allQuestions = computed(() => props.quizData.quiz || [])


const correctCount = computed(() =>
    allQuestions.value.reduce((acc, q, i) => {
        return acc + (props.answers[i] === q.answer ? 1 : 0)
    }, 0)
)

const totalQuestions = allQuestions.value.length
const userName = ref("Roxane")
const rank = computed(() => correctCount.value)
const animatedRank = ref(0)


const rankLabel = computed(() => {
    if (correctCount.value === totalQuestions) {
        return "🌟 Excellent!"
    } else if (correctCount.value < 5) {
        return "⚡ Needs Improvement"
    } else {
        return "✅ Good Job"
    }
})

onMounted(() => {
  let count = 0
  const interval = setInterval(() => {
    if (count < rank.value) {
      count += 1  
      animatedRank.value = count
    } else {
      animatedRank.value = rank.value
      clearInterval(interval)
    }
  }, 100) 
})
</script>

<style scoped>
.card-bg {
    position: absolute;
    inset: 0;
    opacity: 0.35;
    z-index: 0;
}

.question-box {
    color: #000;
    position: relative;
    overflow: hidden;
}

.result-page {
    padding: 32px;
}

.correct-chip {
    z-index: 10;
    position: relative;
}

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

.subtitle {
    opacity: 0.9;
    font-size: 1rem;
    line-height: 1.5;
}

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