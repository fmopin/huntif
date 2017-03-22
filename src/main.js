// On importe Vue
import Vue from 'vue'

// On importe Vue Router
import VueRouter from 'vue-router'

// On importe axios
import axios from 'axios'

// On importe le composant Vue
import App from './components/App.vue'
import Home from './components/Home/Home.vue'
import Post from './components/Post/Post.vue'

//On utilise Vue Router
Vue.use(VueRouter)

//configure nos routes
const routes = [
  {
    path: '/',
    component: Home,
    name: 'home_component'
  },
  {
    path: '/posts/:postId',
    component: Post,
    name: 'post_component',
  }
]

//On initialise le Router
const router = new VueRouter({
  routes
})

// On configure axios
const token = '85fccd443a294683602e4a73b308078b7ebd760e0847e01e8c4a73e3c111bc88'

axios.defaults.baseURL = 'https://api.producthunt.com'
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
window.axios = axios //à eviter

// On initialise l'application
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
})
