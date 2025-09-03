<template>
  <v-container class="py-8">
    <v-row class="mb-6" align="center" justify="space-between">
      <v-col cols="12" md="8" class="text-md-left">
        <h2 class="page-title">Training Topics</h2>
        <p class="page-sub">Click a card to start a quiz or view details.</p>
      </v-col>
      <v-col cols="12" md="4" class="text-md-right">
        <v-text-field v-model="search" variant="solo" hide-details rounded clearable prepend-inner-icon="mdi-magnify"
          placeholder="Search topics" />
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="(topic, i) in filteredTopics" :key="i" cols="12" sm="6" md="4" lg="3">
        <v-hover v-slot="{ isHovering, props }">
          <v-card v-bind="props" class="topic-card" :elevation="isHovering ? 12 : 6" @click="goTo(topic)">
            <div class="card-bg" :style="{ background: topic.gradient }" />

            <div class="card-content">
              <v-avatar size="44" class="mb-3" variant="tonal">
                <v-icon :icon="topic.icon" size="28" />
              </v-avatar>

              <h3 class="card-title">{{ topic.title }}</h3>
              <p class="card-desc">{{ topic.desc }}</p>

              <div class="mt-4 d-flex align-center gap-8">
                <v-chip size="small" variant="elevated" class="chip">{{ topic.level }}</v-chip>
                <v-chip size="small" variant="outlined" class="chip">{{ topic.estimated }}</v-chip>
              </div>

              <div class="mt-6 d-flex align-center gap-8">
                <v-btn size="small" variant="elevated" class="action-btn" @click.stop="startQuiz(topic)">Start</v-btn>
                <v-btn size="small" variant="text" icon="mdi-chevron-right" />
              </div>
            </div>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'

import { useRouter } from 'vue-router'

const router = useRouter()

function startQuiz(topic) {
  router.push({
    name: 'QuizPage',
    params: { title: topic.title },
    query: {
      data: JSON.stringify(topic)
    }
  })
}
// Convert your <h1> list into an array for v-for mapping
const topics = ref([
  {
    title: 'Company Knowledge & Policies',
    desc: 'Know the company handbook, compliance, security and benefits.',
    icon: 'mdi-shield-check',
    level: 'Core',
    estimated: '10–12 mins',
    gradient:
      'linear-gradient(135deg, rgba(85,60,255,1) 0%, rgba(147,112,255,1) 45%, rgba(255,153,102,1) 100%)',
    quiz: [{ q: 'What is included in company compliance?', options: ['Policy A', 'Policy B'], answer: 0 }, { q: 'Which benefit is mandatory?', options: ['Health Insurance', 'Gym'], answer: 0 },],
  },
  {
    title: 'Business Communication Skills',
    desc: 'Email, Slack, meetings, and presentation best practices.',
    icon: 'mdi-email-check-outline',
    level: 'Core',
    estimated: '8–10 mins',
    gradient:
      'linear-gradient(135deg, rgba(0,170,255,1) 0%, rgba(0,200,180,1) 50%, rgba(152,251,152,1) 100%)',
    quiz: [{ q: 'What is included in company compliance?', options: ['Policy A', 'Policy B'], answer: 0 }, { q: 'Which benefit is mandatory?', options: ['Health Insurance', 'Gym'], answer: 0 },],
  },
  {
    title: 'Workplace Ethics & Integrity',
    desc: 'Professional conduct, anti-harassment and fair decisions.',
    icon: 'mdi-scale-balance',
    level: 'Core',
    estimated: '7–9 mins',
    gradient:
      'linear-gradient(135deg, rgba(255,94,98,1) 0%, rgba(255,149,0,1) 50%, rgba(255,206,86,1) 100%)',
    quiz: [{ q: 'What is included in company compliance?', options: ['Policy A', 'Policy B'], answer: 0 }, { q: 'Which benefit is mandatory?', options: ['Health Insurance', 'Gym'], answer: 0 },],
  },
  {
    title: 'Leadership & Management',
    desc: 'Motivation, feedback, delegation and performance reviews.',
    icon: 'mdi-account-tie',
    level: 'Advanced',
    estimated: '12–15 mins',
    gradient:
      'linear-gradient(135deg, rgba(255,0,132,1) 0%, rgba(155,89,182,1) 50%, rgba(52,152,219,1) 100%)',
    quiz: [{ q: 'What is included in company compliance?', options: ['Policy A', 'Policy B'], answer: 0 }, { q: 'Which benefit is mandatory?', options: ['Health Insurance', 'Gym'], answer: 0 },],
  },
  {
    title: 'Time Management & Productivity',
    desc: 'Prioritization, focus techniques, and smart automation.',
    icon: 'mdi-timer-outline',
    level: 'Core',
    estimated: '9–11 mins',
    gradient:
      'linear-gradient(135deg, rgba(0,210,255,1) 0%, rgba(58,123,213,1) 50%, rgba(58,96,115,1) 100%)',
    quiz: [{ q: 'What is included in company compliance?', options: ['Policy A', 'Policy B'], answer: 0 }, { q: 'Which benefit is mandatory?', options: ['Health Insurance', 'Gym'], answer: 0 },],
  },
])

const search = ref('')

const filteredTopics = computed(() =>
  topics.value.filter(t =>
    [t.title, t.desc, t.level].some(v => v.toLowerCase().includes(search.value.toLowerCase()))
  )
)

function goTo(topic) {
  console.log('Open topic:', topic.title)
}
</script>

<style scoped>
.page-title {
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0;
  background: linear-gradient(90deg, #ff5900, #ff8e42, #ffd194);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.page-sub {
  opacity: 0.7;
  margin: 4px 0 0 0;
  color: #fff;
}

.topic-card {
  position: relative;
  overflow: hidden;
  border-radius: 18px;
  transition: transform 180ms ease, box-shadow 180ms ease;
  cursor: pointer;
}

.topic-card:hover {
  transform: translateY(-4px) scale(1.01);
}

.card-bg {
  position: absolute;
  inset: 0;
  opacity: 0.35;
}

.card-content {
  position: relative;
  padding: 22px 20px 18px;
  display: flex;
  flex-direction: column;
}

.card-title {
  font-weight: 700;
  line-height: 1.2;
  margin: 4px 0 6px;
}

.card-desc {
  opacity: 0.8;
  font-size: 0.95rem;
  min-height: 44px;
}

.gap-8>*+* {
  margin-left: 8px;
}

.chip {
  border-radius: 999px;
}

.action-btn {
  border-radius: 12px;
  font-weight: 600;
  letter-spacing: 0.2px;
}
</style>
