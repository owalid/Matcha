<template>
  <section>
    <div class="container">
      <div v-for="(usr, idk) in match" :key="idk">
        <article class="media" @click="gotoMessage(usr.id_match, usr.id_users_liked)">
          <div class="media-left">
            <figure class="image is-64x64">
              <img class="is-rounded" :src="usr.picture" alt="Image" />
            </figure>
            <div v-if="(!usr.isLogged)">
              <p class="subtitle is-7">{{usr.lastLog}}</p>
            </div>
          </div>
          <div>
            <span
              :class="(usr.isLogged) ? 'has-badge-rounded has-badge-success' : 'has-badge-rounded has-badge-danger'"
              data-badge
            ></span>
          </div>
          <div class="media-content">
            <div class="content has-text-centered">
              <p>
                <strong>{{ usr.first_name }}</strong>
                <br />
              </p>
              <div v-if="usr.lastMsg">
                <p class="subtitle is-7">{{usr.lastMsg}}</p>
              </div>
              <div v-else>
                <p class="subtitle is-7">Nouveau match</p>
              </div>
            </div>
          </div>
        </article>
        <hr />
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "MatchTabList",
  props: {
    user: Object,
    match: Array
  },
  methods: {
    gotoMessage(idMatch, idUsers) {
      this.$store.commit("SET_PARAMSMSG", {
        idMatch: idMatch,
        idUsersMatch: idUsers
      });
      this.$router.push({
        name: "message"
      });
    }
  },
  mounted() {
  }
};
</script>