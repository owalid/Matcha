<template>
  <div>
      <div v-if="notifs.length > 0">
    <div v-for="(notif, idx) in notifs" :key="idx">
      <div class="notification">
        <button @click="delNotif(idx, notif.id_notif)" class="delete"></button>
        {{notif.notification}}
        <br />
      </div>
    </div>
      </div>
       <div v-else class="has-text-centered">
         <div class="container is-vcentered is-center">
           <p class="title is-6">Aucune notification pour le moment</p>
         </div>
       </div>
  </div>
</template>
<script>
export default {
  name: "Notification",
  data() {
    return {
      user: "",
      notifs: ""
    };
  },
  async created() {
    const headers = {
      headers: { token: this.$store.getters.token }
    };
    this.user = this.$store.getters.user;
    try {
      let response = await axios.get(
        `http://localhost:3000/get/notif/${this.user.id_users}`,
        headers
      );
      this.notifs = response.data.notif;
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    async delNotif(idx, idNotif) {
      const headers = {
        headers: { token: this.$store.getters.token }
      };
      const data = { idNotif: idNotif };
      try {
        let response = await axios.post(
          `http://localhost:3000/delete/notification/`,
          data,
          headers
        );
        this.notifs.splice(idx, 1);
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>