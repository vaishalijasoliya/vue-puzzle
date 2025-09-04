<template>
    <div class="bg">
        <v-row class="d-flex justify-center align-center " style="min-height: 100vh;margin: 0px;">


            <v-col sm="6" md="7" class="gif-col">
                <img alt="Vue logo" src="../../assets/homes.gif" class="gif-full" />
            </v-col>


            <v-col sm="6" md="5" class="flex flex-col" style="padding: 0px 40px;">
                <h2 class="title text-left">Get Detailed Analytics</h2>
                <p class="text-white mb-6 text-left">
                    Complete the quiz to get a detailed report of your performance and challenge
                    yourself to achieve more.
                </p>
                <BaseButton style="display: block;" @click="goNext">Next →</BaseButton>

            </v-col>
        </v-row>
    </div>
</template>

<script setup>
import { VRow, VCol, } from "vuetify/components";
import { useRouter } from "vue-router";
import { BaseButton } from "@/components/ui/baseButton";

const router = useRouter();
const goNext = () => {
    router.push("/optionsPage");
};
</script>

<style scoped>
.title {
    font-size: 35px;
    font-weight: 700;
   background: linear-gradient(90deg, #ff5900, #ff8e42, #ffd194);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 25px;
}

.bg {
    background-color: #000;
}


.gif-col {
    height: 100vh;
    display: flex;
    padding: 0;
}

.gif-full {
    width: 100%;
    height: 100%;
}
</style>
