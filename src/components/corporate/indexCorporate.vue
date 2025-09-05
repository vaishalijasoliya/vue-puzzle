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


      <v-row align="stretch">
        <v-col v-for="(topic, i) in filteredTopics" :key="i" cols="12" sm="6" md="4" lg="3" class="d-flex">
          <v-hover v-slot="{ isHovering, props }" class="flex-grow-1">

            <v-card v-bind="props" class="topic-card d-flex flex-column" :elevation="isHovering ? 12 : 6">
              <div class="card-bg" :style="{ background: topic.gradient }" />

              <div class="card-content d-flex flex-column flex-grow-1">
                <v-avatar size="44" class="mb-3" variant="tonal">
                  <v-icon :icon="topic.icon" size="28" />
                </v-avatar>

                <h3 class="card-title">{{ topic.title }}</h3>
                <p class="card-desc">{{ topic.desc }}</p>

                <div class="mt-4 d-flex align-center gap-8">
                  <v-chip size="small" variant="elevated" class="chip">
                    {{ topic.level }}
                  </v-chip>
                  <v-chip size="small" variant="outlined" class="chip">
                    {{ topic.quiz.length }} mins
                  </v-chip>
                </div>
                <div class="mt-auto pt-6 d-flex align-center gap-8">
                  <v-btn size="small" variant="elevated" class="action-btn" @click.stop="startQuiz(topic)">
                    Start
                  </v-btn>
                  <v-btn size="small" variant="text" icon @click.stop="startQuiz(topic)">
                    <ChevronRight />
                  </v-btn>
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
import { ref, computed } from "vue";
import QuizPage from "./QuizPage.vue";
import { ChevronRight,ShieldCheck,MailCheck,Scale,UserRoundCog,Timer,ChartLine,IndianRupee,Laptop,GlobeLock,Gavel,Users  } from 'lucide-vue-next';

const topics = ref([
  {
    title: 'Company Knowledge & Policies',
    desc: 'Know the company handbook, compliance, security and benefits.',
    icon: ShieldCheck,
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
    icon: MailCheck,
    level: 'Core',
    estimated: '8–10 mins',
    gradient:
      'linear-gradient(135deg, rgba(0,170,255,1) 0%, rgba(0,200,180,1) 50%, rgba(152,251,152,1) 100%)',
    quiz: [
      {
        q: 'A colleague sends you a long, confusing email. What is the best response?',
        options: [
          'Reply with frustration',
          'Ignore the email completely',
          'Ask clarifying questions politely',
          'Forward it to others to deal with'
        ],
        answer: 2
      },
      {
        q: 'In a meeting, someone keeps interrupting you. How should you handle it?',
        options: [
          'Raise your voice and talk over them',
          'Wait until they finish, then assertively continue your point',
          'Stay silent and let them dominate',
          'Leave the meeting angrily'
        ],
        answer: 1
      },
      {
        q: 'You receive negative feedback on your presentation style. What is the healthiest reaction?',
        options: [
          'Defend yourself aggressively',
          'Reflect and ask for specific improvement tips',
          'Ignore the feedback',
          'Complain to coworkers about it'
        ],
        answer: 1
      },
      {
        q: 'If you need urgent input from a teammate, what is the most effective communication method?',
        options: [
          'Send a clear, concise message on chat',
          'Write a 5-page detailed email',
          'Wait and hope they notice your task',
          'Leave vague notes on their desk'
        ],
        answer: 0
      },
      {
        q: 'During a presentation, you notice the audience looks disengaged. What should you do?',
        options: [
          'Continue reading your slides without change',
          'Ask interactive questions or use examples',
          'Scold the audience for not paying attention',
          'End the presentation early'
        ],
        answer: 1
      },
      {
        q: 'A teammate misunderstands your email instructions. What’s the best step?',
        options: [
          'Clarify with a call or face-to-face chat',
          'Send a sarcastic reply',
          'Ignore their mistake',
          'Blame them in front of others'
        ],
        answer: 0
      },
      {
        q: 'If a coworker shares an idea you disagree with in a brainstorming session, what is the right approach?',
        options: [
          'Shut them down immediately',
          'Respectfully explain your perspective',
          'Laugh it off as silly',
          'Ignore and change the subject'
        ],
        answer: 1
      },
      {
        q: 'When writing a professional message, what shows emotional intelligence?',
        options: [
          'Acknowledging others’ efforts before sharing feedback',
          'Only pointing out errors',
          'Using emojis excessively to replace tone',
          'Copying managers unnecessarily'
        ],
        answer: 0
      },
      {
        q: 'Your manager misinterprets your email tone as rude. What should you do?',
        options: [
          'Apologize and clarify your intent',
          'Defend that they misunderstood',
          'Ignore it',
          'Stop emailing altogether'
        ],
        answer: 0
      },
      {
        q: 'A colleague is presenting and forgets a key point. How do you act?',
        options: [
          'Interrupt and correct them harshly',
          'Subtly support them by reminding the point if appropriate',
          'Mock them after the meeting',
          'Stay silent and let them struggle'
        ],
        answer: 1
      }
    ],
  },
  {
    title: 'Workplace Ethics & Integrity',
    desc: 'Professional conduct, anti-harassment and fair decisions.',
    icon: Scale,
    level: 'Core',
    estimated: '7–9 mins',
    gradient:
      'linear-gradient(135deg, rgba(255,94,98,1) 0%, rgba(255,149,0,1) 50%, rgba(255,206,86,1) 100%)',
    quiz: [
      {
        q: 'You notice a coworker being excluded from team discussions. What is the best response?',
        options: [
          'Join the others in excluding them',
          'Privately talk to them and raise inclusion concerns with the team/manager',
          'Ignore it since it doesn’t affect you',
          'Make jokes about the situation'
        ],
        answer: 1
      },
      {
        q: 'Your manager asks you to adjust numbers in a report to look better for executives. What should you do?',
        options: [
          'Comply quietly to keep your job',
          'Refuse politely and explain the ethical risk',
          'Do it but tell colleagues about it',
          'Ignore the request and hope they forget'
        ],
        answer: 1
      },
      {
        q: 'A coworker confides that they are being harassed but fear retaliation. What’s the right step?',
        options: [
          'Encourage them to report and offer to support them',
          'Tell them to ignore it',
          'Spread the news to others so everyone knows',
          'Stay silent to avoid involvement'
        ],
        answer: 0
      },
      {
        q: 'You accidentally overhear confidential salary information about colleagues. What should you do?',
        options: [
          'Keep it private and not spread it',
          'Share it with teammates',
          'Post it on social media',
          'Use it to negotiate unfairly'
        ],
        answer: 0
      },
      {
        q: 'A close friend at work asks you to approve their expense report even though you know it’s incorrect. How do you respond?',
        options: [
          'Approve it as a favor',
          'Decline and explain the importance of fairness',
          'Ignore it and hope finance catches it',
          'Ask for a benefit in return'
        ],
        answer: 1
      },
      {
        q: 'You are leading a hiring panel and a strong candidate is from your own family. What is the ethical action?',
        options: [
          'Proceed without disclosure',
          'Disclose the conflict of interest and step aside',
          'Push for their selection quietly',
          'Hide the relationship and vote for them'
        ],
        answer: 1
      },
      {
        q: 'If you witness a senior leader making an offensive joke, what is the right response?',
        options: [
          'Laugh to avoid conflict',
          'Ignore it since they are senior',
          'Report it or raise concern respectfully',
          'Repeat the joke to others'
        ],
        answer: 2
      },
      {
        q: 'You find out a teammate is taking credit for your work in front of management. What should you do?',
        options: [
          'Confront them aggressively in public',
          'Calmly raise the issue with them or clarify contributions professionally',
          'Stay silent to avoid conflict',
          'Spread rumors about them'
        ],
        answer: 1
      },
      {
        q: 'If your boss pressures you to exclude certain people unfairly from a project, what should you do?',
        options: [
          'Follow orders quietly',
          'Refuse and explain why fairness matters',
          'Exclude them and gossip about it',
          'Pretend you didn’t hear'
        ],
        answer: 1
      },
      {
        q: 'You see a colleague making repeated small mistakes that could lead to bigger ethical risks. What’s the best approach?',
        options: [
          'Ignore since it’s not your responsibility',
          'Offer constructive feedback or escalate if needed',
          'Mock them for being careless',
          'Wait until they get into trouble'
        ],
        answer: 1
      }
    ],
  },
  {
    title: 'Leadership & Management',
    desc: 'Motivation, feedback, delegation and performance reviews.',
    icon: UserRoundCog,
    level: 'Advanced',
    estimated: '12–15 mins',
    gradient:
      'linear-gradient(135deg, rgba(255,0,132,1) 0%, rgba(155,89,182,1) 50%, rgba(52,152,219,1) 100%)',
    quiz: [
      {
        q: 'A team member consistently underperforms despite previous feedback. What should you do first?',
        options: [
          'Listen and understand if personal/work challenges exist',
          'Publicly criticize them in meetings',
          'Ignore the issue and hope it improves',
          'Replace them immediately without discussion'
        ],
        answer: 0
      },
      {
        q: 'Two high-performing team members are in conflict with each other. What’s the best step?',
        options: [
          'Encourage open discussion and mediate fairly',
          'Pick the side of your favorite employee',
          'Ignore it since they are both talented',
          'Reassign both to different teams immediately'
        ],
        answer: 0
      },
      {
        q: 'You need to assign a critical project with a tight deadline. What is the best approach?',
        options: [
          'Delegate clearly with defined roles and support',
          'Give vague instructions and expect results',
          'Do everything yourself to ensure quality',
          'Assign it randomly without considering skills'
        ],
        answer: 0
      },
      {
        q: 'During a performance review, an employee becomes defensive about feedback. What should you do?',
        options: [
          'Stay calm, listen, and reframe feedback constructively',
          'Raise your voice to show authority',
          'End the conversation abruptly',
          'Compare them with another colleague'
        ],
        answer: 0
      },
      {
        q: 'A new team member seems isolated and disengaged. As a leader, what action would you take?',
        options: [
          'Assign them a mentor and check in regularly',
          'Assume they will adjust on their own',
          'Criticize them for being quiet',
          'Ignore until performance drops'
        ],
        answer: 0
      },
      {
        q: 'Your team is stressed about an unrealistic deadline from upper management. How should you respond?',
        options: [
          'Communicate concerns upward and reprioritize tasks',
          'Pressure the team to work overtime without discussion',
          'Tell them to just accept it',
          'Avoid addressing stress entirely'
        ],
        answer: 0
      },
      {
        q: 'You notice your team avoids sharing honest opinions in meetings. What is the right step?',
        options: [
          'Create a safe environment by encouraging open feedback',
          'Accept silence as agreement',
          'Make all decisions without consulting them',
          'Dismiss their opinions as unimportant'
        ],
        answer: 0
      },
      {
        q: 'A top performer asks for growth opportunities, but no promotions are available. What should you do?',
        options: [
          'Provide skill development, mentorship, or new responsibilities',
          'Dismiss their request',
          'Tell them to wait without explanation',
          'Discourage them from expecting growth'
        ],
        answer: 0
      }
    ],
  },
  {
    title: 'Time Management & Productivity',
    desc: 'Prioritization, focus techniques, and smart automation.',
    icon: Timer,
    level: 'Core',
    estimated: '9–11 mins',
    gradient:
      'linear-gradient(135deg, rgba(0,210,255,1) 0%, rgba(58,123,213,1) 50%, rgba(58,96,115,1) 100%)',
    quiz: [
      {
        q: 'You have 5 tasks due today, but one urgent client request just arrived. What should you do first?',
        options: [
          'Handle the urgent client request, then return to other tasks',
          'Continue with your original plan without changes',
          'Work on the easiest task first',
          'Wait until someone else picks it up'
        ],
        answer: 0
      },
      {
        q: 'Your manager assigns you extra work close to a deadline. How do you respond?',
        options: [
          'Accept everything without explaining your workload',
          'Clarify priorities and negotiate deadlines',
          'Ignore the new work',
          'Complain to teammates instead of addressing it'
        ],
        answer: 1
      },
      {
        q: 'You notice you are spending too much time checking emails. What is the most productive step?',
        options: [
          'Check emails only at scheduled times',
          'Reply instantly to every email',
          'Ignore emails completely',
          'Forward all emails to others'
        ],
        answer: 0
      },
      {
        q: 'During meetings, discussions often drift off-topic and consume time. What should you do?',
        options: [
          'Bring the team back to the agenda respectfully',
          'Stay silent and let time be wasted',
          'Leave the meeting halfway',
          'Start unrelated conversations'
        ],
        answer: 0
      },
      {
        q: 'A teammate asks for help while you are on a tight deadline. What is the best approach?',
        options: [
          'Decline rudely since you’re busy',
          'Assess urgency and either schedule time later or provide quick guidance',
          'Stop all your work to fully help them',
          'Ignore their request'
        ],
        answer: 1
      },
      {
        q: 'You feel overwhelmed by multiple projects. What should you do?',
        options: [

          'Do tasks randomly',
          'Use prioritization tools (like to-do lists or Eisenhower matrix)',
          'Procrastinate until deadlines are near',
          'Avoid discussing workload with anyone'
        ],
        answer: 1
      },
      {
        q: 'A recurring report takes you 3 hours weekly, but you learn it can be automated. What’s the best step?',
        options: [

          'Continue manually out of habit',
          'Delegate it without reviewing',
          'Stop doing the report completely',
          'Automate the report to save time',
        ],
        answer: 3
      },
      {
        q: 'You realize you are most focused in the morning. How should you plan your work?',
        options: [
          'Schedule critical tasks during morning hours',
          'Do easy tasks in the morning and harder ones at night',
          'Ignore your energy levels and work randomly',
          'Take long breaks during your most productive time'
        ],
        answer: 0
      },
      {
        q: 'You are multitasking across calls, emails, and projects, but quality is dropping. What should you do?',
        options: [
          'Focus on one task at a time for better results',
          'Keep multitasking despite mistakes',
          'Stop working altogether',
          'Do only the easiest parts of each task'
        ],
        answer: 0
      },
      {
        q: 'You missed a deadline because you underestimated the time required. What’s the best response?',
        options: [

          'Blame teammates for the delay',
          'Stay silent and hope no one notices',
          'Acknowledge the mistake and improve future planning',
          'Avoid taking responsibility in the future'
        ],
        answer: 2
      }
    ],
  },
  {
    title: 'Industry Trends & Market Awareness',
    desc: 'Track market changes, competitor strategies, and new opportunities to stay competitive.',
    icon: ChartLine,
    level: 'Core',
    estimated: '9–11 mins',
    gradient: 'linear-gradient(135deg, (#333333, #333333 50%, #eeeeee 75%, #333333 75%)',
    quiz: [
      {
        q: 'You learn that a competitor has launched a new product with features your company lacks. What should you do first?',
        options: [
          'Research customer feedback on the competitor’s product',
          'Immediately criticize the product in public',
          'Ignore it and stick to the current plan',
          'Panic and push random changes to your product'
        ],
        answer: 0
      },
      {
        q: 'An emerging technology could disrupt your industry in the next 2–3 years. How should you respond?',
        options: [
          'Explore how it could be applied in your business strategy',
          'Ignore it until it becomes mainstream',
          'Discourage colleagues from discussing it',
          'Wait for competitors to implement it first'
        ],
        answer: 0
      },
      {
        q: 'Your client asks about a new market regulation you are not fully aware of. What is the best approach?',
        options: [
          'Admit you are unsure and commit to providing a researched response',
          'Guess an answer to appear confident',
          'Avoid the topic completely',
          'Say regulations don’t affect the company'
        ],
        answer: 0
      },
      {
        q: 'A sudden drop in customer engagement is observed in your industry. What should be your first step?',
        options: [
          'Analyze data and market reports to identify possible causes',
          'Blame customers for changing preferences',
          'Stop investing in customer engagement',
          'Ignore it as a short-term fluctuation'
        ],
        answer: 0
      },
      {
        q: 'Your team proposes experimenting with a new trend that competitors are adopting. What should you do?',
        options: [
          'Evaluate its relevance and run a small pilot project',
          'Reject it immediately to avoid risks',
          'Implement it without any testing',
          'Copy everything competitors are doing blindly'
        ],
        answer: 0
      },
      {
        q: 'You are preparing a presentation for executives on market shifts. What should you focus on?',
        options: [
          'Highlight industry trends and potential opportunities',
          'Fill slides with technical jargon only',
          'Avoid data and rely on opinions',
          'Present outdated information for convenience'
        ],
        answer: 0
      },
      {
        q: 'Your company has always targeted one market segment, but growth is slowing. What is the best step?',
        options: [
          'Explore adjacent markets and customer needs',
          'Keep focusing on the same segment despite slow growth',
          'Cut innovation budget',
          'Discourage market research'
        ],
        answer: 0
      },
      {
        q: 'You notice a rising demand for sustainable practices in your industry. How should your company respond?',
        options: [
          'Integrate sustainability into strategy and operations',
          'Ignore the trend as “temporary”',
          'Delay until competitors succeed first',
          'Only talk about sustainability without action'
        ],
        answer: 0
      },
      {
        q: 'A competitor is offering lower prices, but your product has more features. What should you highlight?',
        options: [
          'Communicate the added value and benefits of your product',
          'Start a price war immediately',
          'Downplay your strengths',
          'Avoid discussing competitors with clients'
        ],
        answer: 0
      },
      {
        q: 'Your company leadership asks you to monitor industry news weekly. What’s the most effective practice?',
        options: [
          'Use reliable sources and summarize key insights',
          'Rely on rumors from colleagues',
          'Only check news when there’s a crisis',
          'Ignore news and focus only on internal updates'
        ],
        answer: 0
      }
    ],
  },
  {
    title: 'Finance & Business Basics',
    desc: 'Understand budgets, profit, expenses, and financial decision-making at work.',
    icon: IndianRupee,
    level: 'Core',
    estimated: '9–11 mins',
    gradient: 'linear-gradient(135deg, rgba(0,128,128,1) 0%, rgba(72,209,204,1) 50%, rgba(224,255,255,1) 100%)',
    quiz: [
      {
        q: 'A department is consistently overspending its budget. What’s the most responsible first step?',
        options: [
          'Review spending patterns to find unnecessary costs',
          'Cut all employee training programs',
          'Request unlimited extra funds',
          'Ignore the overspending until year-end'
        ],
        answer: 0
      },
      {
        q: 'Your manager asks you to choose between two vendors: one cheaper but unreliable, and one costlier but consistent. What should you recommend?',
        options: [
          'Always pick the cheapest',
          'Evaluate long-term value and risks, not just cost',
          'Reject both options',
          'Delay the decision indefinitely'
        ],
        answer: 1
      },
      {
        q: 'A teammate suggests booking revenue early to make numbers look better. How should you respond?',
        options: [
          'Support them since it helps the company',
          'Remind them it violates financial integrity',
          'Ignore their suggestion',
          'Do it quietly without informing others'
        ],
        answer: 1
      },
      {
        q: 'If a project shows high expenses but no clear returns yet, what is the best step?',
        options: [
          'Evaluate ROI and adjust strategy if needed',
          'Shut down the project immediately',
          'Ignore it and hope for improvement',
          'Double the budget blindly'
        ],
        answer: 0
      },
      {
        q: 'You’re asked to approve an expense report with suspicious items. What should you do?',
        options: [
          'Approve it to avoid conflict',
          'Question and escalate if necessary',
          'Sign it because it’s your friend’s report',
          'Ignore the issue'
        ],
        answer: 1
      },
      {
        q: 'Why is it important to distinguish between fixed and variable costs?',
        options: [
          'Because it helps in planning and forecasting',
          'Because fixed costs don’t matter',
          'Only variable costs are tracked',
          'It’s irrelevant to decision-making'
        ],
        answer: 0
      },
      {
        q: 'If an employee proposes cutting safety measures to reduce costs, what is the right response?',
        options: [
          'Agree, since savings are critical',
          'Reject it and explain safety must not be compromised',
          'Consider it for short-term results',
          'Ignore their input'
        ],
        answer: 1
      },
      {
        q: 'Your team wants to spend the remaining budget quickly before year-end. What is the ethical choice?',
        options: [
          'Spend it all so next year’s budget isn’t reduced',
          'Use funds only for meaningful business needs',
          'Buy unnecessary perks',
          'Split the money among the team'
        ],
        answer: 1
      },
      {
        q: 'Which is a good example of financial responsibility at work?',
        options: [

          'Approving all requests to keep everyone happy',
          'Avoiding cost reports',
          'Spending without tracking',
          'Reviewing expenses before approving them',
        ],
        answer: 3
      },
      {
        q: 'A colleague proposes inflating a project budget to secure extra resources. How should you act?',
        options: [
          'Support it as a smart tactic',
          'Report or discourage dishonest budgeting',
          'Stay neutral and say nothing',
          'Encourage them privately'
        ],
        answer: 1
      },
      {
        q: 'Why is it important to align department budgets with company goals?',
        options: [
          'To ensure spending supports strategic priorities',
          'Because budgets should be random',
          'To compete with other departments',
          'So managers can spend freely'
        ],
        answer: 0
      },
      {
        q: 'If you’re unsure about the financial impact of a decision, what is the most responsible step?',
        options: [
          'Guess based on intuition',
          'Consult finance or data before acting',
          'Ignore financial impact',
          'Decide based only on speed'
        ],
        answer: 1
      },
      {
        q: 'A colleague offers to bypass procurement rules for faster purchases. What should you do?',
        options: [
          'Agree, since speed is more important',
          'Decline and follow official processes',
          'Ignore and hope no one notices',
          'Join them to save effort'
        ],
        answer: 1
      },
      {
        q: 'You discover a recurring small error in financial reports. What’s the best response?',
        options: [
          'Fix it quietly without telling anyone',
          'Ignore it since it’s minor',
          'Report and correct it to prevent long-term issues',
          'Blame another department'
        ],
        answer: 2
      },
      {
        q: 'If profit margins are shrinking, what should management focus on?',
        options: [
          'Lay off employees immediately',
          'Ignore it and continue spending',
          'Stop tracking profit margins',
          'Analyze costs and explore efficiency improvements',
        ],
        answer: 4
      },
      {
        q: 'Why is financial transparency important in a company?',
        options: [
          'It builds trust and accountability',
          'It wastes time',
          'It helps hide issues',
          'It’s optional for employees'
        ],
        answer: 0
      },
      {
        q: 'If you notice colleagues celebrating overspending because it “shows growth,” how should you respond?',
        options: [
          'Join them in celebrating',
          'Explain that growth must align with sustainable financial health',
          'Ignore the behavior',
          'Encourage spending more to keep the trend'
        ],
        answer: 2
      }
    ]
  },
  {
    title: 'Technology & Digital Tools',
    desc: 'Leverage software, apps, and platforms to improve efficiency and collaboration.',
    icon: Laptop,
    level: 'Core',
    estimated: '9–11 mins',
    gradient: 'linear-gradient(135deg, rgba(0,191,255,1) 0%, rgba(135,206,250,1) 50%, rgba(240,248,255,1) 100%)',
    quiz: [
      {
        q: 'A colleague struggles to adopt a new digital tool. What should you do?',
        options: [
          'Ignore them since it’s not your problem',
          'Tell them to avoid the tool',
          'Criticize them for being slow',
          'Offer to guide them or share resources'
        ],
        answer: 3
      },
      {
        q: 'You notice your team is duplicating work because they aren’t using shared digital platforms. What’s the best response?',
        options: [
          'Let duplication continue if tasks get done',
          'Only track your own work',
          'Encourage using the shared platform for visibility',
          'Complain but don’t suggest a solution'
        ],
        answer: 2
      },
      {
        q: 'When is it appropriate to adopt a new workplace technology?',
        options: [
          'Whenever it looks trendy',
          'Only if competitors are using it',
          'Never, because change is disruptive',
          'When it supports efficiency and business goals'
        ],
        answer: 3
      },
      {
        q: 'You receive constant notifications from collaboration software. What should you do?',
        options: [
          'Ignore every message',
          'Turn off all alerts permanently',
          'Adjust settings to balance focus and updates',
          'Complain about the software'
        ],
        answer: 2
      },
      {
        q: 'A project requires sharing large files securely. What’s the best option?',
        options: [
          'Upload to any free website',
          'Use approved secure company tools',
          'Send them via personal email',
          'Share through unencrypted chat'
        ],
        answer: 1
      },
      {
        q: 'You are struggling with a new analytics platform. What’s the most effective next step?',
        options: [
          'Complain that it’s too hard',
          'Request training or use help resources',
          'Stop using the tool',
          'Wait for someone else to do it for you'
        ],
        answer: 1
      },
      {
        q: 'If team members are using different apps for the same purpose, what’s the best approach?',
        options: [
          'Ignore the inconsistency',
          'Ban all apps',
          'Standardize tools to reduce confusion',
          'Allow everyone to choose their own tool'
        ],
        answer: 2
      },
      {
        q: 'A software update introduces new features. What should you do?',
        options: [
          'Explore the features and adapt your workflow',
          'Complain until IT rolls it back',
          'Avoid updating to keep things familiar',
          'Disable the tool entirely'
        ],
        answer: 0
      },
      {
        q: 'How should you share meeting notes digitally for maximum impact?',
        options: [
          'Delete them after the meeting',
          'Store them in a shared, accessible location',
          'Keep them on your desktop only',
          'Email them only to your manager'
        ],
        answer: 1
      },
      {
        q: 'If a digital tool is slowing productivity due to misuse, what is the best solution?',
        options: [
          'Provide guidance or training to the team',
          'Ignore the misuse',
          'Abandon the tool immediately',
          'Complain without suggesting fixes'
        ],
        answer: 0
      },
      {
        q: 'What is the responsible way to handle company data stored in digital platforms?',
        options: [
          'Follow security guidelines and access controls',
          'Download to personal devices',
          'Ignore access restrictions',
          'Share freely with anyone'
        ],
        answer: 0
      },
      {
        q: 'Your manager asks for a quick project status update. Which tool use is best?',
        options: [
          'Refer to the latest data in the project management platform',
          'Ignore the request',
          'Delay answering until the project ends',
          'Give an estimate without checking'
        ],
        answer: 0
      },
      {
        q: 'If you identify a more efficient digital tool than the current one, what should you do?',
        options: [
          'Ignore it to avoid change',
          'Force everyone to switch immediately',
          'Secretly use it without approval',
          'Suggest it with evidence of its benefits'
        ],
        answer: 3
      },
      {
        q: 'Why is digital literacy important in corporate settings?',
        options: [
          'It improves collaboration and competitiveness',
          'It slows down decision-making',
          'It’s irrelevant if you know your core job',
          'It only matters for the IT department'
        ],
        answer: 0
      }
    ]
  },
  {
    title: 'Cybersecurity Awareness',
    desc: 'Protect company data, systems, and accounts from digital threats and risks through ethical and responsible decision-making.',
    icon: GlobeLock,
    level: 'Core',
    estimated: '15–18 mins',
    gradient: 'linear-gradient(135deg, rgba(72,61,139,1) 0%, rgba(106,90,205,1) 50%, rgba(176,196,222,1) 100%)',
    quiz: [
      {
        q: 'A coworker asks you to quickly share your login so they can access a file. What should you do?',
        options: [
          'Politely refuse and guide them to request proper access',
          'Share your credentials since it’s urgent',
          'Let them use your account this one time',
          'Ignore company rules for the sake of speed'
        ],
        answer: 0
      },
      {
        q: 'You see a colleague leave their computer unlocked while away. What is the most responsible action?',
        options: [
          'Ignore it since it’s not your problem',
          'Use the computer to prank them',
          'Politely remind them and lock it for security',
          'Take a picture and share it on social media'
        ],
        answer: 2
      },
      {
        q: 'You are in a rush and receive a USB drive from someone outside the company. What should you do?',
        options: [
          'Plug it in to check the contents quickly',
          'Hand it to IT/security before use',
          'Keep it for later without informing anyone',
          'Throw it in the trash immediately'
        ],
        answer: 1
      },
      {
        q: 'A team member insists on using a weak password for convenience. How should you respond?',
        options: [
          'Support them because it’s faster',
          'Report the risk or encourage them to use stronger passwords',
          'Ignore it since it’s their account',
          'Share your stronger password instead'
        ],
        answer: 1
      },
      {
        q: 'If you accidentally send sensitive information to the wrong person, what is your best action?',
        options: [
          'Inform IT/security immediately and follow incident response',
          'Hope no one notices',
          'Delete the message silently',
          'Ask the recipient to ignore it without escalation'
        ],
        answer: 0
      },
      {
        q: 'You notice unusual pop-ups on your work computer. What should you do?',
        options: [
          'Click them to see what happens',
          'Report it to IT immediately',
          'Ignore them and continue working',
          'Download software to “fix it” from an unknown site'
        ],
        answer: 1
      },
      {
        q: 'Your manager asks for confidential data through a suspicious email. What is the safest action?',
        options: [
          'Verify the request through official channels before responding',
          'Send the data because it’s your manager',
          'Forward the email to your colleagues',
          'Click on the link to confirm authenticity'
        ],
        answer: 0
      },
      {
        q: 'While traveling, you need to connect to public Wi-Fi to send work files. What should you do?',
        options: [
          'Use VPN and company security guidelines',
          'Connect directly without precautions',
          'Disable security features for speed',
          'Send files later through personal apps'
        ],
        answer: 0
      },
      {
        q: 'A colleague jokes about posting screenshots of confidential systems online. What should you do?',
        options: [
          'Laugh along to avoid conflict',
          'Remind them it’s a serious violation',
          'Encourage them to do it for fun',
          'Stay silent and ignore it'
        ],
        answer: 1
      },
      {
        q: 'You find sensitive company files printed and left unattended. What’s your best action?',
        options: [
          'Secure the documents and alert the responsible team',
          'Take them home to read later',
          'Ignore them because it’s not your job',
          'Share them with colleagues who might need them'
        ],
        answer: 0
      },
      {
        q: 'You are asked to use your personal email for urgent client communication. What should you do?',
        options: [
          'Decline and insist on official company channels',
          'Agree since it’s faster',
          'Use personal email but delete after',
          'CC your friends for advice'
        ],
        answer: 0
      },
      {
        q: 'A coworker asks you to install software from an unofficial source. What is the right response?',
        options: [
          'Install it to help them',
          'Report and advise them to use approved tools',
          'Download it but only for temporary use',
          'Ignore IT policy to save time'
        ],
        answer: 1
      },
      {
        q: 'You notice someone tailgating into the office without a badge. What should you do?',
        options: [
          'Assume they belong and do nothing',
          'Politely stop them and verify access',
          'Hold the door open to be polite',
          'Escort them inside yourself'
        ],
        answer: 1
      },
      {
        q: 'If your work device is stolen, what is the FIRST step you should take?',
        options: [
          'Report it immediately to IT/security',
          'Buy a replacement quietly',
          'Ignore it since it’s insured',
          'Tell friends but not the company'
        ],
        answer: 0
      },
      {
        q: 'You are invited to join an online group that shares cracked software. What should you do?',
        options: [
          'Join for curiosity',
          'Ignore and report if related to company assets',
          'Download software for personal use',
          'Invite colleagues for fun'
        ],
        answer: 1
      },
      {
        q: 'Why is it risky to reuse the same password across multiple platforms?',
        options: [
          'Because one breach can expose all accounts',
          'It saves time but adds convenience',
          'IT won’t know anyway',
          'It has no impact on security'
        ],
        answer: 0
      },
      {
        q: 'You suspect a phishing attempt but you’re unsure. What should you do?',
        options: [
          'Delete it without reporting',
          'Reply to confirm authenticity',
          'Report it to IT/security for verification',
          'Forward it to colleagues to ask'
        ],
        answer: 2
      },
      {
        q: 'Why is cybersecurity everyone’s responsibility in a corporation?',
        options: [
          'Because threats can exploit the weakest link',
          'Because only IT should handle it',
          'Because it helps in promotions',
          'It’s optional if you’re not technical'
        ],
        answer: 0
      },
      {
        q: 'If a client insists on sending confidential data through an insecure method, what should you do?',
        options: [
          'Accept to avoid delays',
          'Offer a secure company-approved alternative',
          'Forward through your personal apps',
          'Ignore the concern to save time'
        ],
        answer: 1
      },
      {
        q: 'A colleague is about to share their screen in a meeting with sensitive tabs open. What should you do?',
        options: [
          'Let them proceed',
          'Politely warn them before they share',
          'Take screenshots for proof',
          'Share the information with others later'
        ],
        answer: 1
      }
    ]
  },
  {
    title: 'Compliance & Regulations',
    desc: 'Follow workplace laws, policies, and rules to ensure ethical and legal operations.',
    icon: Gavel,
    level: 'Core',
    estimated: '9–11 mins',
    gradient: 'linear-gradient(135deg, rgba(46,139,87,1) 0%, rgba(60,179,113,1) 50%, rgba(152,251,152,1) 100%)',
    quiz: [
      {
        q: 'Your team is unsure about a new industry regulation. What should you do first?',
        options: [
          'Consult official documentation or compliance team',
          'Guess and continue operations',
          'Ignore the regulation',
          'Wait until penalties occur'
        ],
        answer: 0
      },
      {
        q: 'Why is compliance training important in corporations?',
        options: [
          'It wastes company time',
          'It only benefits managers',
          'It reduces employee growth',
          'It ensures employees follow laws and company policies'
        ],
        answer: 3
      },
      {
        q: 'If you discover a colleague is bypassing compliance procedures to save time, what is the best action?',
        options: [
          'Ignore it since it doesn’t affect you directly',
          'Report the issue to your compliance officer or manager',
          'Join them to work faster',
          'Wait until someone else notices'
        ],
        answer: 1
      },
      {
        q: 'A vendor offers you a personal gift to influence your decision. What should you do?',
        options: [
          'Hide it from your manager',
          'Accept it since it’s a small token',
          'Thank them and promise to prioritize their work',
          'Decline the gift and report it as per company policy'
        ],
        answer: 3
      },
      {
        q: 'You are pressured by leadership to skip a compliance step to meet a deadline. What should you do?',
        options: [
          'Explain the risks and insist on following proper procedure',
          'Do as told without question',
          'Complain to your peers but stay silent in action',
          'Ignore the process since speed is more important'
        ],
        answer: 0
      },
      {
        q: 'If you receive confidential client data by mistake, what should you do?',
        options: [
          'Forward it to colleagues out of curiosity',
          'Ignore and delete it without informing anyone',
          'Report it immediately and ensure it is secured',
          'Save it for future use'
        ],
        answer: 2
      },
      {
        q: 'Why is documenting compliance processes essential?',
        options: [
          'It helps only auditors, not employees',
          'It slows down workflows unnecessarily',
          'It provides evidence of following regulations',
          'It is just extra paperwork'
        ],
        answer: 2
      },
      {
        q: 'What is the ethical way to handle a conflict of interest?',
        options: [
          'Disclose it openly to management or compliance',
          'Hide it to protect your image',
          'Ignore it if no one knows',
          'Use it to your advantage quietly'
        ],
        answer: 0
      },
      {
        q: 'A co-worker shares insider information about a company merger. What is the correct response?',
        options: [
          'Ignore it and pretend you didn’t hear',
          'Tell your friends and family quickly',
          'Do not trade or share the information and report the issue',
          'Use it for personal stock market gains'
        ],
        answer: 2
      },
      {
        q: 'Why should employees report compliance concerns early?',
        options: [
          'Because it shows you are loyal to your boss',
          'It doesn’t matter, reporting is optional',
          'Only to get promoted faster',
          'To prevent risks, penalties, and reputational damage'
        ],
        answer: 3
      },
      {
        q: 'You notice a team member falsifying data in a report. What should you do?',
        options: [
          'Help them so the project finishes faster',
          'Destroy the report without telling anyone',
          'Escalate the issue immediately to compliance or leadership',
          'Stay silent to avoid conflict'
        ],
        answer: 2
      },
      {
        q: 'How does a strong compliance culture benefit corporations?',
        options: [
          'It builds trust, reduces risk, and ensures long-term success',
          'It wastes resources and slows innovation',
          'It discourages employee initiative',
          'It only protects top management'
        ],
        answer: 0
      }
    ]
  },
  {
    title: 'Diversity, Equity & Inclusion (DEI)',
    desc: 'Promote respect, fairness, and equal opportunities in the workplace.',
    icon: Users,
    level: 'Core',
    estimated: '9–11 mins',
    gradient: 'linear-gradient(135deg, rgba(186,85,211,1) 0%, rgba(221,160,221,1) 50%, rgba(245,222,179,1) 100%)',
    quiz: [
      {
        q: 'A colleague from a different background shares a perspective you’re unfamiliar with. How should you respond?',
        options: [
          'Listen respectfully and consider their perspective',
          'Dismiss it as irrelevant',
          'Make jokes about it',
          'Ignore them completely'
        ],
        answer: 0
      },
      {
        q: 'Why is diversity important in teams?',
        options: [
          'It brings innovation and a variety of perspectives',
          'It slows decision-making',
          'It creates unnecessary conflict',
          'It reduces creativity'
        ],
        answer: 0
      },
      {
        q: "If you notice a colleague being consistently interrupted during meetings, what should you do?",
        options: [
          "Step in politely and ensure their voice is heard",
          "Ignore it since it doesn’t involve you",
          "Join in interrupting them",
          "Tell them to speak louder next time"
        ],
        answer: 0
      },
      {
        q: "A team member prefers to observe cultural or religious practices during work. What is the best approach?",
        options: [
          "Respect their needs and adjust if possible",
          "Mock them for being different",
          "Force them to follow the majority",
          "Complain that it’s inconvenient"
        ],
        answer: 0
      },
      {
        q: "What is an example of inclusive language in the workplace?",
        options: [
          "Using terms that avoid assumptions about gender, culture, or background",
          "Using slang that only certain groups understand",
          "Referring to everyone as 'guys' regardless of gender",
          "Ignoring how your words might affect others"
        ],
        answer: 0
      },
      {
        q: "You overhear a joke that stereotypes a particular group. What should you do?",
        options: [
          "Address it respectfully and explain why it’s inappropriate",
          "Laugh along to fit in",
          "Stay silent so you don’t cause conflict",
          "Repeat the joke to others later"
        ],
        answer: 0
      },
      {
        q: "Why is equity different from equality?",
        options: [
          "Equity means providing resources based on individual needs, not treating everyone exactly the same",
          "They mean the same thing",
          "Equality is about fairness while equity is about favoritism",
          "Equity means everyone gets less"
        ],
        answer: 0
      },
      {
        q: "How can leaders promote inclusion in their teams?",
        options: [
          "Encourage participation from all voices and perspectives",
          "Only listen to the most senior people",
          "Schedule meetings that exclude remote workers",
          "Favor team members they personally like"
        ],
        answer: 0
      },
      {
        q: "If a new employee with a disability joins your team, what should you do first?",
        options: [
          "Ask if they need any accommodations to work effectively",
          "Treat them differently and avoid involving them",
          "Assume they can’t handle their tasks",
          "Make jokes to ‘lighten the mood’"
        ],
        answer: 0
      },
      {
        q: "What is a benefit of having diverse teams?",
        options: [
          "They improve problem-solving by bringing multiple viewpoints",
          "They create confusion due to different ideas",
          "They slow progress because of disagreements",
          "They require more management and aren’t worth the effort"
        ],
        answer: 0
      },
      {
        q: "If someone accidentally uses the wrong pronoun for a colleague, what is the best action?",
        options: [
          "Apologize, correct yourself, and move on respectfully",
          "Ignore it, it’s not important",
          "Make a joke about pronouns",
          "Refuse to use their correct pronouns"
        ],
        answer: 0
      },
      {
        q: "How can you personally contribute to a more inclusive workplace?",
        options: [
          "Challenge biases and treat colleagues with respect",
          "Exclude people who are different from you",
          "Only collaborate with those who share your background",
          "Avoid giving feedback to people you don’t understand"
        ],
        answer: 0
      }

    ]
  },

])

const search = ref("");
const selectedTopic = ref(null);

const filteredTopics = computed(() =>
  topics.value.filter((t) =>
    [t.title, t.desc, t.level].some((v) =>
      v.toLowerCase().includes(search.value.toLowerCase())
    )
  )
);

function startQuiz(topic) {
  selectedTopic.value = topic;
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
  height: 100%;
  /* ensures equal height */
  display: flex;
  flex-direction: column;
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
  flex-grow: 1;
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
