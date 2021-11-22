import Vue from 'vue'
import VueRouter from 'vue-router'
import Community from '../views/community/Community.vue'
import Movies from '../views/movie/Movies.vue'
import PostForm from '../views/community/PostForm.vue'
import PostDetail from '../views/community/PostDetail.vue'
import Login from '../views/accounts/Login.vue'
import Signup from '../views/accounts/Signup.vue'
import Intro from '../views/community/Intro.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/movies',
    name: 'Movies',
    component: Movies
  },
  {
    path: '/community',
    name: 'Community',
    component: Community,
  },
  {
    path: '/postForm',
    name: 'PostForm',
    component: PostForm,
  },
  {
    path: '/postDetail',
    name: 'PostDetail',
    component: PostDetail,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/intro',
    name: 'Intro',
    component: Intro,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
