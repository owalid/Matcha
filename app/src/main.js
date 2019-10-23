import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowRight, faHeart, faTimes, faRandom, faHome, faSlidersH, faChevronLeft, faChevronRight, faBell, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import VueSocketIOExt from 'vue-socket.io-extended'
import io from 'socket.io-client'
import Grid from 'vue-js-grid'
import VueAxios from 'vue-axios'
import axios from 'axios'
import VueAuthenticate from 'vue-authenticate'
import * as VueGoogleMaps from 'vue2-google-maps'
export const socket = io('http://localhost:3000')

library.add(faArrowRight, faHeart, faTimes, faSlidersH, faRandom, faHome, faChevronLeft, faChevronRight, faBell, faSignOutAlt)
Vue.config.productionTip = false
window.axios = require('axios')
Vue.use(VueAxios, axios)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBCuNezBz0ymWSFHlcz0MqCSPMGWuQAL_o',
    libraries: 'places'
  }
})
Vue.use(VueAuthenticate, {
  baseUrl: 'http://localhost:3000',
  providers: {
    facebook: {
      clientId: '368212477184099',
      redirectUri: 'http://localhost:8080/auth/callback'
    }
  }
})
Vue.use(Grid)
Vue.use(FontAwesomeIcon, VueSocketIOExt, socket)
new Vue({
  router,
  store,
  render: h => h(App),
  created: async function () {
    window.fbAsyncInit = function () {
      FB.init({
        appId: '368212477184099',
        xfbml: true,
        version: 'v2.7'
      })
    };
    (function (d, s, id) {
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }
}).$mount('#app')
