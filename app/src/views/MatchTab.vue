<template>
  <section>
    <div class="container is-center">
      <div v-if="match.length > 0">
        <div class="is-center padding-20-bottom">
          <button class="button is-primary" @click="toList">
            <span class="icon">
              <i class="fa fa-bars"></i>
            </span>
          </button>
          <button class="button is-primary" @click="toColumn">
            <span class="icon">
              <i class="fa fa-th"></i>
            </span>
          </button>
        </div>
        <div v-if="browseList">
          <MatchTabList :user="user" :match="match"></MatchTabList>
        </div>
        <div v-else>
          <MatchTabColumn :user="user" :match="match"></MatchTabColumn>
        </div>
      </div>
      <div v-else class="has-text-centered">
        <p class="title is-6">Aucun match pour le moment</p>
      </div>
    </div>
  </section>
</template>
<script>
// @ is an alias to /src
import moment from "moment-timezone";
import MatchTabColumn from "@/components/MatchTabColumn.vue";
import MatchTabList from "@/components/MatchTabList.vue";

export default {
  name: "MatchTab",

  data() {
    return {
      match: {},
      user: {},
      browseList: false
    };
  },
  components: {
    MatchTabColumn,
    MatchTabList
  },
  methods: {
    toList(e) {
      e.preventDefault();
      this.browseList = true;
    },
    toColumn(e) {
      e.preventDefault();
      this.browseList = false;
    },
    gotoMessage(idMatch, idUsers) {
      this.$store.commit("SET_PARAMSMSG", {
        idMatch: idMatch,
        idUsersMatch: idUsers
      });
      this.$router.push({
        name: "message"
      });
    },
    async getLastMessage(idMsg) {
      const params = {
        headers: { token: this.$store.getters.token }
      };
      try {
        let result = await axios.get(
          `http://localhost:3000/get/oneMessage/${idMsg}`,
          params
        );

        moment.tz.setDefault("Europe/Paris");
        moment.locale("fr");
        result = result.data.result[0];
        let res = `${result.content} . ${moment
          .tz(result.date_message, "YYYY-MM-DD HH:mm:ss", "Europe/Paris")
          .fromNow()}`;
        return res;
        return `${result.data.content} . ${moment
          .tz(result.data.date_message, "YYYY-MM-DD HH:mm:ss", "Europe/Paris")
          .fromNow()}`;
      } catch (error) {
        console.error(error);
      }
    }
  },
  async created() {
    try {
      moment.tz.setDefault("Europe/Paris");
      moment.locale("fr");
      this.user = this.$store.getters.user;
      const params = {
        headers: { token: this.$store.getters.token }
      };
      let response = await axios.get(
        `http://localhost:3000/get/allMatch/${this.user.id_users}`,
        params
      );
      this.match = await Promise.all(
        response.data.res.map(async r => {
          let last = r.id_message
            ? await this.getLastMessage(r.id_message)
            : "Nouveau match";
          return {
            isLogged: r.is_logged,
            lastLog: moment
              .tz(r.last_log, "YYYY-MM-DD HH:mm:ss", "Europe/Paris")
              .fromNow(),
            id_match: r.id_match,
            id_users_liked: r.id_users_liked,
            picture: r.picture[0],
            first_name: r.first_name,
            lastMsg: last
          };
        })
      );
    } catch (e) {
      console.error(e);
    }
  }
};
</script>
