import Vue from 'vue'
import VueRouter from  'vue-router'
import HomePage from '@/pages/Index.vue'
Vue.use(VueRouter);
const routes = [
  {
    path: '/',
    component: () => import('./layouts/Index.vue'), // use default layout
    children: [
      { 
        path: '/', 
        name: 'home',
        component: HomePage
      },
      { path: '/zing-chart', 
        component: () => import('./pages/zing-chart/Index.vue') 
      },
      { path: '/new-music', 
        component: () => import('./pages/new-music/Index.vue') 
      },
      {
        path: '/:path(.*)*',
        component: () => import('./pages/404.vue'),
      },
    ],
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router