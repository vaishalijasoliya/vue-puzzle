<template>
  <div class="bg">
    <v-row
      class="d-flex justify-center align-center"
      style="min-height: 100vh; margin: 0"
    >
      <!-- Left Column -->
      <v-col sm="6" md="6" class="flex flex-col content-box">
        <h2 class="title">What is your status?</h2>
        <v-row class="d-flex align-center" style="row-gap: 20px;">
          <v-col sm="6" md="4.5" class="flex flex-col">
            <TextButton
              color="#fff"
              @click="() => router.push('/corporate')"
              class="btn-animated"
            >
              Corporate
            </TextButton>
          </v-col>
          <v-col sm="6" md="4.5" class="flex flex-col">
            <TextButton color="#fff" @click="goNext" class="btn-animated">
              Business
            </TextButton>
          </v-col>
          <v-col sm="6" md="4.5" class="flex flex-col">
            <TextButton color="#fff" @click="goNext" class="btn-animated">
              Economics
            </TextButton>
          </v-col>
        </v-row>
      </v-col>

      <!-- Right Column -->
      <v-col sm="6" md="6" class="gif-col">
        <img
          alt="Options"
          src="../../assets/option.png"
          class="gif-full floating"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { VRow, VCol } from "vuetify/components";
import { useRouter } from "vue-router";
import { TextButton } from "@/components/ui/baseButton";

const router = useRouter();
const goNext = () => {
  router.push("/");
};
</script>

<style scoped>
/* Background */
.bg {
  background: linear-gradient(135deg, #0f0f0f, #1a1a1a 40%, #2c0a00 100%);
  color: white;
}

/* Glass effect box */
.content-box {
  padding: 40px;
  border-radius: 20px;
  /* background: rgba(255, 255, 255, 0.05); */
  backdrop-filter: blur(10px);
  /* box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4); */
}

/* Gradient heading */
.title {
  font-size: 36px;
  font-weight: 800;
  background: linear-gradient(90deg, #ff5900, #ff8e42, #ffd194);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 30px;
}

/* Button hover effects */
/* .btn-animated {
  font-size: 18px;
  font-weight: 600;
  padding: 12px 20px !important;
  border-radius: 12px;
  transition: all 0.3s ease-in-out;
} */
.btn-animated:hover {
  background: linear-gradient(90deg, #ff5900, #ff8e42);
  color: #fff !important;
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(255, 100, 0, 0.2);
}

/* Image column */
.gif-col {
  height: 100vh;
  display: flex;
  padding: 0;
  justify-content: center;
  align-items: center;
}
.gif-full {
  width: 100%;
  height: 100%;
  object-fit: contain;
  max-width: 550px;
}

/* Floating animation */
.floating {
  animation: float 4s ease-in-out infinite;
}
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
}
</style>
