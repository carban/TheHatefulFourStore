import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Hello from './components/HelloWorld.vue'
import myabout from './components/myabout.vue'
import login from './components/login.vue'
import register from './components/register.vue'
import profile from './components/profile.vue'
import logoutmsg from './components/logoutmsg.vue'
import profileAdmin from './components/profileAdmin.vue'
import support from './components/support.vue'
import addcaridk from './components/addcaridk.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/addcaridk',
      name: 'addcaridk',
      component: addcaridk,
    },
    {
      path: '/',
      name: 'Hello',
      component: Hello,
      meta: {
        requiresNoAdmin: true
      }
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
    {
      path: '/logoutmsg',
      name: 'logoutmsg',
      component: logoutmsg,
      meta: {
        requiresVisitor: true
      }
    },
    {
      path: '/profileAdmin',
      name: 'profileAdmin',
      component: profileAdmin,
      meta: {
        requiresAdmin: true
      }
    },
    {
      path: '/support',
      name: 'support',
      component: support,
      meta: {
        // requiresSupport: true
      }
    },
  ]
})
