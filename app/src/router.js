import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Home from './views/Home.vue'
import HomeAuth from './views/HomeAuth.vue'
import Message from './views/Message.vue'
import NotFound from './views/NotFound.vue'
import ParamsUser from './views/ParamsUser.vue'
import Profil from './views/Profil.vue'
import PictureUser from './views/PictureUser.vue'
import MatchTab from './views/MatchTab.vue'
import Notification from './views/Notification.vue'
import DblAuth from './views/DblAuth.vue'
import resetMdp from './views/resetMdp.vue'
import VerifMail from './views/VerifMail'
import { veriftoken } from './verifToken'
import store from './store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { route: '', transition_route: 'fade-down' },
      props: true
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { route: 'login', transition_route: 'fade-up' }
    },
    {
      path: '/verif/mail/:idUsr/:hash',
      name: 'verifMail',
      component: VerifMail,
      props: true
    },
    {
      path: '/dblAuth',
      name: 'dblAuth',
      component: DblAuth,
      meta: { route: 'dblAuth', transition_route: 'fade-right' }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { route: 'register', transition_route: 'fade-up' }
    },
    {
      path: '/resetMdp',
      name: 'resetMdp',
      component: resetMdp
    },
    {
      path: '/home',
      name: 'homeAuth',
      component: HomeAuth,
      props: true,
      meta: { auth: true }
    },
    {
      path: '/match',
      name: 'match',
      component: MatchTab,
      meta: { auth: true }
    },
    {
      path: '/params',
      name: 'params',
      component: ParamsUser,
      props: true,
      meta: { auth: true }
    },
    {
      path: '/msg',
      name: 'message',
      component: Message,
      meta: { auth: true }
    },
    {
      path: '/notif',
      name: 'notification',
      component: Notification,
      meta: { auth: true }
    },
    {
      path: '/profil/:idUsers',
      name: 'profil',
      component: Profil,
      props: true,
      meta: { auth: true }
    },
    {
      path: '/picture',
      name: 'picture',
      component: PictureUser,
      meta: { auth: true }
    },
    { path: '*', name: 'notfound', component: NotFound, meta: { route: '404' } }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.name
  if (to.meta.auth === true) {
    if (store.state.isLog !== true && !veriftoken(router.app.$store.getters.token)) {
      next('/login')
    } else {
      next()
    }
  } else {
    if (store.state.isLog === true && veriftoken(router.app.$store.getters.token)) {
      next('/home')
    } else {
      next()
    }
  }
})

export default router
