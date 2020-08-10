import Vue from 'vue'
import VueRouter from 'vue-router'
import filmsRouter from './films'
import cinemaRouter from './cinema'
import mineRouter from './mine'

Vue.use(VueRouter)

const routes = [
  filmsRouter,
  cinemaRouter,
  mineRouter,
  {
    path:'/*',
    redirect:'/films'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
