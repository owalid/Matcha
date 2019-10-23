<template>
  <section>
    <div class="container padding-50">
      <div class="columns is-multiline is-centered">
        <div class="column is-6">
          <div class="card is-clearfix is-2-touch">
            <div class="card-image">
              <div v-if="userVisited.picture">
                <carousel :perPage="1" paginationColor="#fd746c" paginationActiveColor="#000000">
                  <slide v-for="(pic, idx) in userVisited.picture" :key="idx">
                    <div class="card-image">
                      <figure class="image is-4by3">
                        <img :src="pic" alt="Placeholder image" />
                      </figure>
                    </div>
                  </slide>
                </carousel>
              </div>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-5">
                    {{userVisited.first_name}}
                    <span
                      :class="(userVisited.is_logged) ? 'has-badge-rounded has-badge-success' : 'has-badge-rounded has-badge-danger'"
                      data-badge
                    ></span>
                  </p>
                  <div v-if="(!userVisited.is_logged)">
                    <p class="subtitle is-7">{{lastLog}}</p>
                  </div>
                </div>
              </div>
              <div class="content is-7">
                {{userVisited.bio}}
                <br />
                Popularité: {{userVisited.popular_score}}
                <br />
                <span class="has-text-weight-bold">À {{distance}} km</span>
              </div>
            </div>
            <div class="field is-grouped is-grouped-centered">
              <p class="control">
                <button class="button is-primary" @click="signaler">Signaler</button>
              </p>
              <p class="control">
                <button class="button is-primary" @click="bloquer">Bloquer</button>
              </p>
            </div>
            <div class="buttons has-text-centered"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// /* eslint-disable */
import { getDistance } from "@/distanceCalculator.js";
import { socket } from "../main";
import { Carousel, Slide } from "vue-carousel";
import moment from "moment-timezone";

export default {
  name: "Profil",
  props: ["idUsers"],
  data() {
    return {
      userVisited: "",
      user: "",
      distance: "",
      lastLog: ""
    };
  },
  components: {
    Carousel,
    Slide
  },
  async created() {
    const headers = {
      headers: { token: this.$store.getters.token }
    };
    try {
      let response = await axios.get(
        `http://localhost:3000/get/${this.idUsers}`,
        headers
      );
      this.userVisited = response.data.result;
      if (
        this.userVisited === null ||
        this.userVisited === "" ||
        !this.userVisited
      )
        this.$router.push({
          name: "home"
        });
      this.user = this.$store.getters.user;
      let data = {
        idUsrVisited: this.userVisited.id_users,
        idUsrVisit: this.user.id_users
      };
      let visit = await axios.post(
        `http://localhost:3000/user/visit`,
        data,
        headers
      );
      data = {
        idUsr: this.userVisited.id_users,
        notification: `Nouvelle visite de la pars de ${this.user.first_name}`
      };
      let notif = await axios.post(
        `http://localhost:3000/user/notif`,
        data,
        headers
      );
      this.distance = getDistance(this.userVisited, this.user);
      socket.emit("visit", {
        uid: this.userVisited.uid,
        message: `${this.user.first_name} a visiter votre profil`
      });
      this.lastLog = moment
        .tz(this.userVisited.last_log, "YYYY-MM-DD HH:mm:ss", "Europe/Paris")
        .fromNow();
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    async signaler() {
      let data = {
        idUsrReported: this.userVisited.id_users,
        idUsrReport: this.user.id_users
      };
      const headers = {
        headers: { token: this.$store.getters.token }
      };
      let response = await axios.post(
        `http://localhost:3000/user/report`,
        data,
        headers
      );
      data = {
        idUsr: this.userVisited.id_users,
        notification: `${this.user.first_name} vous à signaler`
      };
      let notif = await axios.post(
        `http://localhost:3000/user/notif`,
        data,
        headers
      );
      socket.emit("report", {
        uid: this.userVisited.uid,
        message: `${this.user.first_name} vous à signaler`
      });
      if (response.data.message === "OK") {
        this.$router.push({
          name: "homeAuth",
          params: {
            msg:
              "Vous avez signalé se compte nous allons traité votre demande dans les plus bref delais"
          }
        });
      }
    },
    async bloquer() {
      let data = {
        idUsrBlock: this.$store.getters.user.id_users,
        idUsrBlocked: this.userVisited.id_users
      };
      const headers = {
        headers: { token: this.$store.getters.token }
      };
      let response = await axios.post(
        `http://localhost:3000/user/block`,
        data,
        headers
      );
      data = {
        idUsr: this.userVisited.id_users,
        notification: `${this.user.first_name} vous à bloquer`
      };
      let notif = await axios.post(
        `http://localhost:3000/user/notif`,
        data,
        headers
      );
      socket.emit("block", {
        uid: this.userVisited.uid,
        message: `${this.user.first_name} vous à bloquer`
      });
      if (response.data.message === "OK !") {
        this.$router.push({
          name: "homeAuth",
          params: { msg: "Vous avez bloquez cet utilisateur" }
        });
      }
    }
  }
};
</script>
