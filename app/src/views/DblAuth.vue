<template>
  <section class="hero is-fullheight">
          <div v-if="error">

              <div class="notification is-danger">
            <button @click="delNotif" class="delete"></button> Mauvais code
        </div>
          </div>
    <div class="hero-body">
      <div class="container">
        <form action class="box">
          <div class="field">
            <label for class="label">Code</label>
            <div class="control has-icons-left">
              <input type="text" placeholder class="input" required v-model="code" />
              <span class="icon is-small is-left">
                <i class="fa fa-lock"></i>
              </span>
            </div>
          </div>
          <div class="field is-grouped is-grouped-centered has-text-centered">
            <p class="control">
              <button class="button text-centered" @click="verifCode">Connexion</button>
            </p>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
<script>
import { socket } from '../main'

export default {
  name: "dblAuth",
  data() {
    return {
      code: "",
      id_usr: "",
      error: false
    };
  },
  methods: {
    async verifCode(event) {
      event.preventDefault();
      const res = await axios.get(
        `http://localhost:3000/verif/fa/${this.id_usr}/${this.code}`
      );
      if (res.data.msg == "OK") {
                    this.error = false;
      const params = {  headers: {token: this.$store.state.token}};
        let response = await axios.get(
          `http://localhost:3000/get/${this.id_usr}`,
          params
        );
        this.$store.commit("SET_USER", response.data.result);
        this.$store.commit("SET_ISLOG", true)
        socket.emit("joinUid", { uid: response.data.result.uid });
        this.$router.push({ path: "home" });
      } else {
          this.error = true;
      }
    },
    delNotif(event) {
        event.preventDefault();
        this.error = false;
    }
  },
  created() {
    if (
      this.$store.state.user.id_users === null ||
      this.$store.state.user.id_users === "" ||
      this.$store.state.user.id_users === undefined
    )
      this.$router.push({ path: "login" });
    this.id_usr = this.$store.state.user.id_users;
  }
};
</script>