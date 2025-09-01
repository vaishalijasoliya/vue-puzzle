// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/components/HomePage/indexPage.vue";
import optionsPage from "@/components/HomePage/optionsPage.vue";
import indexCorporate from "@/components/corporate/indexCorporate.vue";


const routes = [
  { path: "/", component: HomePage },
  { path: "/optionsPage", component: optionsPage },
   { path: "/corporate", component: indexCorporate }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
