import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Hello from './components/HelloWorld.vue'
import myabout from './components/myabout.vue'
import login from './components/login.vue'
import register from './components/register.vue'
import profile from './components/profile.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/myabout',
      name: 'myabout',
      component: myabout,
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        requiresVisitor: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: register,
      meta: {
        requiresVisitor: true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile,
      meta: {
        requiresAuth: true
      }
    },
  ]
})
