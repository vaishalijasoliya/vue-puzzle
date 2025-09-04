<template>
  <v-container class="py-8">
    <div v-if="!selectedTopic">
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
            <v-card v-bind="props" class="topic-card" :elevation="isHovering ? 12 : 6">
              <div class="card-bg" :style="{ background: topic.gradient }" />

              <div class="card-content">
                <v-avatar size="44" class="mb-3" variant="tonal">
                  <v-icon :icon="topic.icon" size="28" />
                </v-avatar>

                <h3 class="card-title">{{ topic.title }}</h3>
                <p class="card-desc">{{ topic.desc }}</p>

                <div class="mt-4 d-flex align-center gap-8">
                  <v-chip size="small" variant="elevated" class="chip">{{ topic.level }}</v-chip>
                  <v-chip size="small" variant="outlined" class="chip">{{ topic.quiz.length }} mins</v-chip>
                </div>

                <div class="mt-6 d-flex align-center gap-8">
                  <v-btn size="small" variant="elevated" class="action-btn" @click.stop="startQuiz(topic)">
                    Start
                  </v-btn>
                  <v-btn size="small" variant="text" icon="mdi-chevron-right" />
                </div>
              </div>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <QuizPage :quizData="selectedTopic" @back="selectedTopic = null" />
    </div>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import QuizPage from './QuizPage.vue'

const topics = ref([
  {
    title: 'Company Knowledge & Policies',
    desc: 'Know the company handbook, compliance, security and benefits.',
    icon: 'mdi-shield-check',
    level: 'Core',
    estimated: '10–12 mins',
    gradient:
      'linear-gradient(135deg, rgba(85,60,255,1) 0%, rgba(147,112,255,1) 45%, rgba(255,153,102,1) 100%)',
    quiz: [
      {
        q: 'You are assigned a high-pressure task with a short deadline. How do you react first?',
        options: [
          'Break it down into smaller steps',
          'Panic and feel overwhelmed',
          'Delay and hope deadline is extended',
          'Immediately ask someone else to do it'
        ],
        answer: 0
      },
      {
        q: 'During a heated meeting, a colleague strongly disagrees with you. What is your response?',
        options: [
          'Raise your voice to prove your view',
          'Ignore their opinion completely',
          'Walk out of the discussion',
          'Listen and calmly explain your point'
        ],
        answer: 3
      },
      {
        q: 'If you make a mistake in an important report, what is the best action?',
        options: [
          'Blame a colleague',
          'Ignore it and hope no one notices',
          'Delete the report entirely',
          'Take responsibility and correct it'
        ],
        answer: 3
      },
      {
        q: 'How do you usually handle workplace stress?',
        options: [
          'Avoid responsibilities',
          'React angrily at small issues',
          'Plan and prioritize tasks',
          'Withdraw completely from coworkers'
        ],
        answer: 2
      },
      {
        q: 'When working in a team project, what role do you often take?',
        options: [
          'Silent observer who avoids input',
          'Collaborator who balances tasks',
          'Controller who ignores others',
          'Distractor who derails progress'
        ],
        answer: 1
      },
      {
        q: 'You receive constructive criticism from your manager. How do you feel?',
        options: [
          'Defensive and upset',
          'Indifferent and ignore it',
          'Grateful for improvement feedback',
          'Angry and retaliate later'
        ],
        answer: 2
      },
      {
        q: 'When facing a complex problem, what’s your natural approach?',
        options: [
          'Give up quickly',
          'Guess without thinking',
          'Wait for someone else to solve it',
          'Analyze it step by step'
        ],
        answer: 3
      },
      {
        q: 'If a coworker seems unusually quiet and upset, what would you do?',
        options: [
          'Spread gossip about them',
          'Tell them to stop being emotional',
          'Check in respectfully and offer support',
          'Ignore them completely'
        ],
        answer: 2
      },
      {
        q: 'Which trait best describes your workplace personality?',
        options: [
          'Highly reactive to small changes',
          'Avoidant of challenges',
          'Argumentative in most situations',
          'Adaptable and calm under pressure'
        ],
        answer: 3
      },
      {
        q: 'What motivates you most at work?',
        options: [
          'Fear of failure',
          'Growth and learning opportunities',
          'Avoiding responsibility',
          'External rewards only'
        ],
        answer: 1
      }
    ],
  },
  {
    title: 'Business Communication Skills',
    desc: 'Email, Slack, meetings, and presentation best practices.',
    icon: 'mdi-email-check-outline',
    level: 'Core',
    estimated: '8–10 mins',
    gradient:
      'linear-gradient(135deg, rgba(0,170,255,1) 0%, rgba(0,200,180,1) 50%, rgba(152,251,152,1) 100%)',
    quiz: [
      {
        q: 'What is the most professional way to start a formal email?',
        options: [
          'Hey there,',
          'Hi buddy,',
          'Dear [Name],',
          'Yo [Name],'
        ],
        answer: 2
      },
      {
        q: 'Which of the following is considered good etiquette for Slack or instant messaging at work?',
        options: [
          'Always sending long paragraphs',
          'Using clear and concise messages',
          'Sending messages late at night',
          'Avoiding greetings'
        ],
        answer: 1
      },
      {
        q: 'In a business presentation, what is the MOST effective way to keep the audience engaged?',
        options: [
          'Reading directly from slides',
          'Using visuals and key points',
          'Talking as fast as possible',
          'Adding unrelated jokes'
        ],
        answer: 1
      },
      {
        q: 'Which subject line is best for a professional email?',
        options: [
          'Quick question!!!',
          'Important — READ NOW',
          'Meeting Agenda for Friday, Sept 8',
          'Hi there :)'
        ],
        answer: 2
      },
      {
        q: 'During a meeting, what should you do if you disagree with someone’s idea?',
        options: [
          'Interrupt and say they are wrong',
          'Stay silent',
          'Politely share your perspective with reasoning',
          'Roll your eyes'
        ],
        answer: 2
      },
      {
        q: 'What is the recommended maximum length for most professional emails?',
        options: [
          '1–2 paragraphs',
          '4–5 pages',
          '10 bullet points minimum',
          'No limit'
        ],
        answer: 0
      },
      {
        q: 'What is the best way to close a professional email?',
        options: [
          'See ya!',
          'Later bro,',
          'Best regards,',
          'Thx,'
        ],
        answer: 2
      },
      {
        q: 'When giving feedback, which approach is most effective in corporate communication?',
        options: [
          'Be vague and indirect',
          'Use constructive and respectful language',
          'Focus only on mistakes',
          'Ignore positive contributions'
        ],
        answer: 1
      },
      {
        q: 'Which of the following is NOT a good practice for business communication?',
        options: [
          'Listening actively',
          'Maintaining eye contact in meetings',
          'Using jargon excessively',
          'Tailoring your message to the audience'
        ],
        answer: 2
      },
      {
        q: 'Why is it important to proofread your emails before sending?',
        options: [
          'To check for spelling and grammar errors',
          'To ensure professionalism and clarity',
          'To avoid misunderstandings',
          'All of the above'
        ],
        answer: 3
      }
    ],
  },
  {
    title: 'Workplace Ethics & Integrity',
    desc: 'Professional conduct, anti-harassment and fair decisions.',
    icon: 'mdi-scale-balance',
    level: 'Core',
    estimated: '7–9 mins',
    gradient:
      'linear-gradient(135deg, rgba(255,94,98,1) 0%, rgba(255,149,0,1) 50%, rgba(255,206,86,1) 100%)',
    quiz: [
      {
        q: 'Which of the following is a key aspect of workplace ethics?',
        options: [
          'Respecting colleagues',
          'Ignoring company rules',
          'Favoritism in promotions',
          'Gossiping about coworkers'
        ],
        answer: 0
      },
      {
        q: 'What is the best response if you witness workplace harassment?',
        options: [
          'Ignore it',
          'Report it to HR or management',
          'Join in to fit in',
          'Post it on social media'
        ],
        answer: 1
      },
      {
        q: 'Which of the following demonstrates integrity at work?',
        options: [
          'Taking credit for someone else’s work',
          'Admitting mistakes honestly',
          'Sharing confidential company data',
          'Arriving late without notice'
        ],
        answer: 1
      },
      {
        q: 'What is considered a conflict of interest?',
        options: [
          'Working with integrity',
          'Hiring a family member without disclosure',
          'Following company policies',
          'Reporting unethical behavior'
        ],
        answer: 1
      },
      {
        q: 'If you accidentally receive confidential information not meant for you, what should you do?',
        options: [
          'Share it with coworkers',
          'Delete it and inform the sender',
          'Post it online',
          'Use it for personal gain'
        ],
        answer: 1
      },
      {
        q: 'Why is fairness important in workplace decisions?',
        options: [
          'It improves trust and teamwork',
          'It helps only managers',
          'It avoids following company rules',
          'It reduces accountability'
        ],
        answer: 0
      },
      {
        q: 'Which behavior violates workplace ethics?',
        options: [
          'Respecting deadlines',
          'Discriminating against colleagues',
          'Reporting misconduct',
          'Treating others with respect'
        ],
        answer: 1
      },
      {
        q: 'What should you do if you are pressured to act unethically?',
        options: [
          'Follow the instructions quietly',
          'Refuse and report the situation',
          'Ignore your values to keep your job',
          'Blame others for the outcome'
        ],
        answer: 1
      },
      {
        q: 'Which of the following is part of anti-harassment policy?',
        options: [
          'Maintaining a safe and respectful workplace',
          'Encouraging offensive jokes',
          'Ignoring inappropriate behavior',
          'Allowing favoritism'
        ],
        answer: 0
      },
      {
        q: 'Why is integrity considered a core value at work?',
        options: [
          'It builds credibility and trust',
          'It allows bending rules',
          'It encourages favoritism',
          'It promotes dishonesty'
        ],
        answer: 0
      }
    ],
  },
  {
    title: 'Leadership & Management',
    desc: 'Motivation, feedback, delegation and performance reviews.',
    icon: 'mdi-account-tie',
    level: 'Advanced',
    estimated: '12–15 mins',
    gradient:
      'linear-gradient(135deg, rgba(255,0,132,1) 0%, rgba(155,89,182,1) 50%, rgba(52,152,219,1) 100%)',
    quiz: [
      {
        q: 'Which leadership style focuses on empowering team members to make decisions?',
        options: [
          'Autocratic',
          'Democratic',
          'Laissez-faire',
          'Transformational'
        ],
        answer: 1
      },
      {
        q: 'What is the primary purpose of delegation in management?',
        options: [
          'Reduce the leader’s workload only',
          'Empower employees and improve efficiency',
          'Avoid accountability',
          'Micromanage tasks'
        ],
        answer: 1
      },
      {
        q: 'Which is the most effective way to deliver constructive feedback?',
        options: [
          'Be vague to avoid conflict',
          'Focus only on negatives',
          'Provide specific examples and suggest improvements',
          'Compare with other employees'
        ],
        answer: 2
      },
      {
        q: 'What motivates employees the MOST in the long run?',
        options: [
          'Recognition and growth opportunities',
          'Frequent criticism',
          'Lack of communication',
          'Unrealistic deadlines'
        ],
        answer: 0
      },
      {
        q: 'What should a leader do during performance reviews?',
        options: [
          'Highlight only mistakes',
          'Provide balanced feedback and set goals',
          'Avoid discussing weaknesses',
          'Focus only on numbers'
        ],
        answer: 1
      },
      {
        q: 'Which of the following is NOT a good leadership quality?',
        options: [
          'Empathy',
          'Active listening',
          'Consistency',
          'Favoritism'
        ],
        answer: 3
      },
      {
        q: 'What is the best way to handle conflicts within a team?',
        options: [
          'Ignore the conflict',
          'Encourage open communication and resolution',
          'Blame one side immediately',
          'Avoid addressing it'
        ],
        answer: 1
      },
      {
        q: 'Why is goal-setting important in management?',
        options: [
          'It provides clarity and direction',
          'It avoids accountability',
          'It makes employees confused',
          'It reduces performance tracking'
        ],
        answer: 0
      }
    ],
  },
  {
    title: 'Time Management & Productivity',
    desc: 'Prioritization, focus techniques, and smart automation.',
    icon: 'mdi-timer-outline',
    level: 'Core',
    estimated: '9–11 mins',
    gradient:
      'linear-gradient(135deg, rgba(0,210,255,1) 0%, rgba(58,123,213,1) 50%, rgba(58,96,115,1) 100%)',
    quiz: [
      { q: 'What is included in company compliance?', options: ['Policy A', 'Policy B'], answer: 0 },
      { q: 'Which benefit is mandatory?', options: ['Health Insurance', 'Gym'], answer: 0 },
    ],
  },
])

const search = ref('')
const selectedTopic = ref(null)

const filteredTopics = computed(() =>
  topics.value.filter(t =>
    [t.title, t.desc, t.level].some(v =>
      v.toLowerCase().includes(search.value.toLowerCase())
    )
  )
)

function startQuiz(topic) {
  selectedTopic.value = topic
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
