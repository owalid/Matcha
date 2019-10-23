<template>
  <section>
    <div class="columns is-multiline is-mobile">
      <div
        class="column is-grouped is-fullwidth is-grouped-centered has-text-centered is-one-quarter"
        v-for="(usr, idk) in match"
        :key="idk"
      >
        <div class="box">
          <figure class="image is-128x128">
            <img class="is-rounded" :src="usr.picture" alt="Image" />
          </figure>
          <div class="box-content">
            <div class="media">
              <div class="media-content">
                <p class="text-center">
                  {{ usr.first_name}}
                  <span
                    :class="(usr.isLogged) ? 'has-badge-rounded has-badge-success' : 'has-badge-rounded has-badge-danger'"
                    data-badge
                  ></span>
                  <br />
                </p>
                <div v-if="(!usr.isLogged)">
                  <p class="subtitle is-7">{{usr.lastLog}}</p>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div class="field is-grouped is-fullwidth is-grouped-centered columns">
            <div class="column">
              <button class="button is-primary is-outlined" @click="gotoProfil(usr.id_users_liked)">
                <span class="icon">
                  <i class="fa fa-user"></i>
                </span>
              </button>
            </div>
            <div class="column">
              <button
                class="button is-primary is-outlined"
                @click="gotoMessage(usr.id_match, usr.id_users_liked)"
              >
                <span class="icon">
                  <i class="fa fa-comments"></i>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import moment from "moment-timezone";

export default {
  name: "MatchTabColumn",
  props: {
    user: Object,
    match: Array
  },
  methods: {
    gotoProfil(idUsr) {
      this.$router.push({
        name: "profil",
        params: { idUsers: idUsr }
      });
    },
    gotoMessage(idMatch, idUsers) {
      this.$store.commit("SET_PARAMSMSG", {
        idMatch: idMatch,
        idUsersMatch: idUsers
      });
      this.$router.push({
        name: "message"
      });
    }
  }
};
</script>