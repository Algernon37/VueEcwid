import './assets/main.css'
import { createRouter, createWebHistory } from 'vue-router'
import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'
import Home from "./pages/Home.vue";
import Favorites from "./pages/Favorites.vue";

const routes = [
  { path: '/', name:'Home', component: Home},
  { path: '/favorites', name:'Favorites', component: Favorites },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)

app.use(autoAnimatePlugin)
app.use(router)

app.mount('#app')
