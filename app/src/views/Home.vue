<template>

        
  <section class="hero is-fullheight">
<div v-if="msg" class="notification is-success">
        <button @click="delNotif" class="delete"></button>
        {{msg}}
    </div>
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">Bienvenu sur Matcha</h1>
        <h2 class="subtitle">Un site de rencontre incontournable</h2>
      </div>

    </div>
    <div class="hero-foot">
      <div class="container has-text-centered is-size-2 padding-150-bottom">
        <router-link to="/login">
            <font-awesome-icon id="arrow_icon" icon="arrow-right" rotation='90'/>
        </router-link>
      </div>
    </div>
  </section>
</template>
<script>
// @ is an alias to /src
import { FontAwesomeIcon } from '../../node_modules/@fortawesome/vue-fontawesome'

export default {
  name: 'home',
  props: ["msg"],
  components: {
    FontAwesomeIcon
  },
  methods: {
      redirect() {
          this.$router.push({ path: 'home' })
      },
      delNotif(e) {
        e.preventDefault();
        this.msg = '';
      }
    },
    computed: {
        user() {
            return this.$store.getters.user;
        }
    }
}
</script>
