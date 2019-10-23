<template>
  <div id="app">
      <div v-for="(notif, idx) in notifications" :key="idx" class="padding-10-bottom">
    <div class="notification">
            <button @click="delNotif(idx)" class="delete"></button> {{notif.message}}
        </div>
    </div>
        <div class="container">
    <section class="hero is-fullheight">  
      <div class="hero-header">
          <transition :name="transitionName" mode="out-in">
            <router-view />
          </transition>
        </div>
    </section>
      </div>
    <div v-if="isLog">
      <NavBar/>
    </div>
  </div>
</template>

<script>
import router from "./router";
import NavBar from "@/components/NavBar.vue";
import { FontAwesomeIcon } from "../node_modules/@fortawesome/vue-fontawesome";
import { socket } from './main'

export default {
  components: {
    FontAwesomeIcon,
    NavBar
  },
  data() {
    return {
      transitionName: "",
      route: false,
      notfound: false,
      notifications: []
    };
  },
  computed: {
    isLog() {
      return this.$store.getters.isLog;
    }
  },
  watch: {
    $route(to, from) {
      let routeFrom = router.resolve(from).route.meta;
      let routeTo = router.resolve(to).route.meta.route;
      this.route = routeTo === null || routeTo === "home";
      this.transitionName = routeFrom.transition_route;
    }
  },
  mounted() {
          //  this.$socket.emit("join", { channel: this.channel });

  },
  created() { 
    let vm = this;
      socket.on("visit", data => {
        let newValue = {
          message: data.message
        };
        vm.$set(vm.notifications, vm.notifications.length, newValue);
          setTimeout(() => vm.delNotif(vm.notifications.length - 1), 2500);
      });
      socket.on("match", data => {
        let newValue = {
          message: data.message
        };
        vm.$set(vm.notifications, vm.notifications.length, newValue);
          setTimeout(() => vm.delNotif(vm.notifications.length - 1), 2500);
      });
      socket.on("like", data => {
        let newValue = {
          message: data.message
        };
        vm.$set(vm.notifications, vm.notifications.length, newValue);
          setTimeout(() => vm.delNotif(vm.notifications.length - 1), 2500);
      });
      socket.on("unlike", data => {
        let newValue = {
          message: data.message
        };
        vm.$set(vm.notifications, vm.notifications.length, newValue);
          setTimeout(() => vm.delNotif(vm.notifications.length - 1), 2500);
      });
      socket.on("message", data => {
        let newValue = {
          message: data.message
        };
        vm.$set(vm.notifications, vm.notifications.length, newValue);
          setTimeout(() => {vm.delNotif(vm.notifications.length - 1)}, 2500);
      });
      socket.on("block", data => {
        let newValue = {
          message: data.message
        };
        vm.$set(vm.notifications, vm.notifications.length, newValue);
          setTimeout(() => {vm.delNotif(vm.notifications.length - 1)}, 2500);
      });
      socket.on("report", data => {
        let newValue = {
          message: data.message
        };
        vm.$set(vm.notifications, vm.notifications.length, newValue);
          setTimeout(() => {vm.delNotif(vm.notifications.length - 1)}, 2500);
      });
  },
  methods: {
    delNotif(idx) {
        this.notifications.splice(idx, 1);
    }
  },

};
</script>

<style lang="css">
@import "./style/css/style.css";
</style>

<style lang='sass'>
  @import "./style/scss/style.scss"
  @import "./style/scss/app.scss"
</style>
