<template>
  <div class="padding-50-bottom-top">
    <nav class="navbar is-light is-fixed-bottom" role="navigation">
      <div class="navbar-brand" style="flex-grow: 1; justify-content: center;">
        <router-link class="navbar-item is-expanded is-block has-text-centered" to="/home">
          <font-awesome-icon id="home" icon="home" />
          <br />Home
        </router-link>
        <!-- feed -->
        <router-link class="navbar-item is-expanded is-block has-text-centered" to="/match">
          <font-awesome-icon id="heart" icon="heart" />
          <br />Match
        </router-link>
        <!-- Parametres -->
        <router-link class="navbar-item is-expanded is-block has-text-centered" to="/params">
          <font-awesome-icon id="heart" icon="sliders-h" />
          <br />Parametres
        </router-link>
        <router-link class="navbar-item is-expanded is-block has-text-centered" to="/notif">
          <font-awesome-icon id="heart" icon="bell" />
          <br />Notifications
        </router-link>
        <a class="navbar-item is-expanded is-block has-text-centered" @click="logout">
          <font-awesome-icon id="heart" icon="sign-out-alt" />
          <br />Logout
        </a>
      </div>
    </nav>
  </div>
</template>
<script>
import router from "../router";
import { socket } from "../main";
import { FontAwesomeIcon } from "../../node_modules/@fortawesome/vue-fontawesome";
import moment from "moment-timezone";

export default {
  name: "NavBar",
  components: {
    FontAwesomeIcon
  },
  methods: {
    async logout() {
      let defaultUser = {
        id_users: "",
        first_name: "",
        last_name: "",
        email: "",
        gender: "",
        date_of_birth: "",
        sexual_or: "",
        bio: "",
        latitude: "",
        longitude: "",
        popular_score: "",
        phone_number: "",
        is_verified: false,
        is_verified_phone: false,
        age_min: "",
        age_max: "",
        max_distance: "",
        sementics_bio: 0,
        picture: [],
        fa: false
      };
      let date = moment.tz(moment(), "Europe/Paris").format();
      this.user = this.$store.getters.user;
      const data = { date: date, idUsr: this.user.id_users };
      const headers = { headers: { token: this.$store.getters.token } };
      const response = await axios.post(
        `http://localhost:3000/auth/logout`,
        data,
        headers
      );
      socket.emit("leaveUid", { uid: this.$store.getters.user.uid });
      this.$store.commit("SET_USER", defaultUser);
      this.$store.commit("SET_TOKEN", "");
      this.$store.commit("SET_ISLOG", false);
      this.$store.commit("SET_ROUTERLISTPARAMSUSER", "");
      this.$router.push({ path: "/" });
    }
  }
};
</script>