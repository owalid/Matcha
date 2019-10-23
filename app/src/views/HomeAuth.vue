<template>
  <section>
    <div v-if="msg" class="notification is-success">
      <button @click="delNotif" class="delete"></button>
      {{msg}}
    </div>
    <div v-if="!noPicture">
      <div class="container padding-50-bottom-top">
        <div class="columns is-multiline is-centered">
          <div class="column is-6">
            <div v-if="feedUser.length > 0">
              <div class="box is-clearfix is-2-touch">
                <carousel :perPage="1" paginationColor="#fd746c" paginationActiveColor="#000000">
                  <slide v-for="(pic, idx) in feedUser[0].user.picture" :key="idx">
                    <div class="box-image">
                      <figure class="image is-4by3">
                        <img :src="pic" alt="Placeholder image" />
                      </figure>
                    </div>
                  </slide>
                </carousel>
                <div class="box-content">
                  <div class="media">
                    <div class="media-content" @click="gotoProfil">
                      <p class="title is-5">
                        {{feedUser[0].user.first_name}}
                        {{dateAge(feedUser[0].user.date_of_birth)}} ans
                      </p>
                      <p class="subtitle is-6">à {{distance}} kilomètres</p>
                    </div>
                  </div>
                  <div class="content is-7">
                    {{feedUser[0].user.bio}}
                    <br />
                  </div>
                  <div class="content is-6">
                    Popularité: {{feedUser[0].user.popular_score}}
                    <br />
                  </div>
                  <div v-if="feedUser[0].interest.length">
                    Interet:
                    <div
                      v-for="(int, idint) in feedUser[0].interest"
                      :key="idint"
                    >{{int.name_interest}}</div>
                  </div>
                </div>
                <hr />
                <div class="field is-grouped is-fullwidth is-grouped-centered columns">
                  <div class="column">
                    <button class="button is-rounded is-fullwidth is-primary" @click="dislike">
                      <font-awesome-icon id="heart" icon="times" />
                    </button>
                  </div>
                  <div class="is-divider-vertical"></div>
                  <div class="column">
                    <button class="button is-rounded is-fullwidth is-success" @click="like">
                      <font-awesome-icon id="heart" icon="heart" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else-if="noFeed">
              <p class="is-7">Plus aucun profil à liker, changer vos preferences 😉</p>
            </div>
            <div v-else>
              <!-- <div class="pageloader is-danger is-active"><span class="title">Recherche des utilisateurs</span></div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>{{redirectUserTab()}}</div>
  </section>
</template>

<script>
// @ is an alias to /src
// import { FontAwesomeIcon } from '../../node_modules/@fortawesome/vue-fontawesome'
import { dateToAge } from "../dateToAge";
import { FontAwesomeIcon } from "../../node_modules/@fortawesome/vue-fontawesome";
import { getDistance } from "@/distanceCalculator.js";
import Swal from "sweetalert2";
import { Carousel, Slide } from "vue-carousel";
import { socket } from "../main";

export default {
  name: "HomeAuth",
  props: ["msg"],
  components: {
    FontAwesomeIcon,
    Carousel,
    Slide
  },
  data() {
    return {
      user: "",
      feedUser: [],
      distance: "",
      noFeed: false,
      noPicture: false
    };
  },
  watch: {
    feedUser: []
  },
  methods: {
    dateAge(date) {
      return dateToAge(date);
    },
    redirectUserTab() {
      this.$router.push({
        name: "params",
        params: { msg: "Vous devez upload des photos avant de pouvoir swiper" }
      });
    },
    gotoProfil() {
      this.$router.push({
        name: "profil",
        params: { idUsers: this.feedUser[0].user.id_users }
      });
    },
    delNotif(e) {
      e.preventDefault();
      this.msg = "";
    },
    async like(event) {
      event.preventDefault();
      const headers = {
        headers: { token: this.$store.getters.token }
      };
      let data = {
        idUsrLike: this.user.id_users,
        idUsrLiked: this.feedUser[0].user.id_users
      };
      try {
        let response = await axios.post(
          `http://localhost:3000/user/like`,
          data,
          headers
        );
        data = {
          idUsr: this.feedUser[0].user.id_users,
          notification: `Nouveaux like de la part de ${this.user.first_name}`
        };
        let notif = await axios.post(
          `http://localhost:3000/user/notif`,
          data,
          headers
        );
        if (response.data.message === "New match") {
          socket.emit("match", {
            uid: this.feedUser[0].user.uid,
            message: `Vous avez un nouveau match avec ${this.user.first_name}`
          });
          Swal.fire({
            title: "Yesssss!",
            text: "Nouveau match 😍",
            imageUrl: "https://media.giphy.com/media/8g63zqQ5RPt60/giphy.gif",
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "gif match",
            animation: true
          });
          data = {
            idUsr: this.feedUser[0].user.id_users,
            notification: `Nouveau match avec ${this.user.first_name}`
          };
          let notif = await axios.post(
            `http://localhost:3000/user/notif`,
            data,
            headers
          );
        } else {
          socket.emit("like", {
            uid: this.feedUser[0].user.uid,
            message: `${this.user.first_name} vous à liker`
          });
        }
        if (this.feedUser.length === 1) {
          this.noFeed = true;
          this.feedUser.shift();
        } else {
          this.feedUser.shift();
          this.distance = 0;
          this.distance = getDistance(
            this.feedUser[0].user,
            this.$store.getters.user
          );
        }
      } catch (e) {
        console.error(e);
      }
    },
    async dislike() {
      event.preventDefault();
      const headers = {
        headers: { token: this.$store.getters.token }
      };
      const data = {
        idUsrLike: this.user.id_users,
        idUsrLiked: this.feedUser[0].user.id_users
      };
      try {
        let response = await axios.post(
          `http://localhost:3000/user/dislike`,
          data,
          headers
        );
        if (this.feedUser.length === 1) {
          this.noFeed = true;
        } else {
          this.feedUser.shift();
          this.distance = getDistance(
            this.feedUser[0].user,
            this.$store.getters.user
          );
        }
      } catch (e) {
        console.error(e);
      }
      this.feedUser.shift();
    }
  },
  computed: {
    interest() {
      return this.$store.getters.interest;
    }
  },

  async beforeMount() {
    this.user = this.$store.getters.user;
    if (this.user.picture && this.$store.getters.user.picture[0]) {
      try {
        const params = {
          headers: { token: this.$store.getters.token }
        };
        let interestTabUser = [];
        let response = await axios.get(
          `http://localhost:3000/get/allUsers/${this.user.id_users}`,
          params
        );
        let numberMatchTag = parseInt(this.user.tag_common);
        this.interest.map((key, value) => {
          interestTabUser.push(key.id_interest);
        });
        let number;
        let matches = 0;
        let newRes = [];
        //filter by distance
        newRes = response.data.filter((k, v) => k.user.picture);
        newRes = newRes.filter((k, v) => {
          if (
            parseInt(getDistance(k.user, this.$store.getters.user)) <=
            parseInt(this.$store.getters.user.max_distance)
          ) {
            return true;
          } else {
            return false;
          }
        });
        if (newRes.length > 0) {
          //sort with number tag common
          this.feedUser = newRes.sort((a, b) => {
            let numberMatchTagA = 0;
            let aInterestTab = [];
            let numberMatchTagB = 0;
            let bInterestTab = [];
            a.interest.map((key, value) => {
              aInterestTab.push(key.id_interest);
            });
            b.interest.map((key, value) => {
              bInterestTab.push(key.id_interest);
            });
            aInterestTab.forEach(element => {
              if (interestTabUser.indexOf(element)) {
                numberMatchTagA++;
              }
            });
            bInterestTab.forEach(element => {
              if (interestTabUser.indexOf(element)) {
                numberMatchTagB++;
              }
            });
            if (numberMatchTagA < numberMatchTagB) {
              return -1;
            } else if (numberMatchTagA > numberMatchTagB) {
              return 1;
            } else {
              return 0;
            }
          });
          this.distance = getDistance(
            this.feedUser[0].user,
            this.$store.getters.user
          );
        } else {
          this.noFeed = true;
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      this.noPicture = true;
    }
  },
  async created() {
  }
};
</script>
<style lang="css">
.box {
  border-radius: 25px;
}
</style>