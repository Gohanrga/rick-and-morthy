import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Inicio from '../views/Inicio.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Inicio
  },
  {
    path: '/personajes',
    name: 'personajes',
    component: () => import(/* webpackChunkName: "carrera" */ '../views/Personajes.vue')
  },
  {
    path: '/detallePersonaje/:id/:personaje1/:personaje2',
    name: 'detallePersonaje',
    component: () => import(/* webpackChunkName: "carrera" */ '../views/DetallePersonaje.vue')
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
