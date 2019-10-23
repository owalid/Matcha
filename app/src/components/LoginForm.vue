<template>
  <section class="hero is-fullheight">
    <div v-if="error">
      <div class="notification is-danger">
        <button @click="delNotif" class="delete"></button>
        {{error}}
      </div>
    </div>
    <div class="hero-header">
      <div class="container has-text-centered is-size-2 padding-150-bottom-top">
        <router-link to="/">
          <font-awesome-icon id="arrow_icon" icon="arrow-right" rotation="270" />
        </router-link>
      </div>
    </div>
    <div class="hero-body">
      <div class="container">
        <form action class="box">
          <div class="field">
            <label for class="label">Identifiant</label>
            <div class="control has-icons-left">
              <input placeholder v-model="identifiant" class="input" required />
              <span class="icon is-small is-left">
                <i class="fa fa-envelope"></i>
              </span>
            </div>
          </div>
          <div class="field">
            <label for class="label">Password</label>
            <div class="control has-icons-left">
              <input
                type="password"
                id="passwd"
                v-model="password"
                placeholder
                class="input"
                required
              />
              <span class="icon is-small is-left">
                <i class="fa fa-lock"></i>
              </span>
            </div>
          </div>
          <div class="field">
            <router-link to="/resetMdp">
              <a for>Mot de passe oublié ?</a>
            </router-link>
          </div>
          <div class="field is-grouped is-grouped-centered has-text-centered">
            <p class="control">
              <button class="button text-centered" @click="login">Connexion</button>
            </p>
            <p class="control">
              <router-link to="/register">
                <a class="button text-centered is-success">Créer un compte</a>
              </router-link>
            </p>
          </div>
          <hr />
          <div class="field is-grouped is-grouped-centered has-text-centered">
            <p class="control">
              <button
                class="button is-rounded is-link text-centered"
                @click="loginFb"
              >Connexion avec facebook</button>
            </p>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { FontAwesomeIcon } from "../../node_modules/@fortawesome/vue-fontawesome";
import { validEmail, validPhone, validPassword } from "../checker";
import { socket } from "../main";

export default {
  name: "LoginForm",
  data() {
    return {
      error: "",
      identifiant: "",
      password: ""
    };
  },
  components: {
    FontAwesomeIcon
  },
  methods: {
    async loginFb(event) {
      event.preventDefault();
      FB.login(async response => {
        // handle the response
        if (response.authResponse) {
          FB.api(
            "/me",
            { fields: "id,name,birthday,first_name,last_name,email,gender" },
            async response => {
              const data = {
                id: response.id,
                first_name: response.first_name,
                last_name: response.last_name,
                email: response.email,
                birthday: response.birthday,
                gender: response.gender
              };
              const res = await axios.post(
                "http://localhost:3000/auth/fb",
                data
              );
              this.$store.commit("SET_TOKEN", res.data.token);
              this.$store.commit("SET_USER", res.data.user);
              this.$store.commit("SET_INTERESTS", res.data.interest);
              this.$store.commit("SET_ISLOG", true);
              socket.emit("joinUid", { uid: res.data.user.uid });
              this.$router.push({ path: "home" });
            }
          );
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      });
    },
    async login(event) {
      event.preventDefault();
      let result = [];
      if (this.password == null || this.password == '' || this.password == undefined)
         this.error = "Veuillez remplir tout les champs";
      else if (validEmail(this.identifiant)) {
        try {
          const response = await axios.post(
            `http://localhost:3000/auth/loginMail`,
            {
              email: this.identifiant,
              password: this.password
            }
          );
          if (response.data.error === "user") {
            this.error = "Identifiant incorrect";
          } else if (response.data.error === "password") {
            this.error = "Mot de passe incorect";
          } else if (response.data.user.is_verified === false) {
            this.error = "Veuillez verifiez votre adresse mail";
          } else {
            // change state
            this.$store.commit("SET_TOKEN", response.data.token);
            if (response.data.user.fa == false) {
              this.$store.commit("SET_USER", response.data.user);
              this.$store.commit("SET_INTERESTS", response.data.interest);
              this.$store.commit("SET_ISLOG", true);
              socket.emit("joinUid", { uid: response.data.user.uid });
              this.$router.push({ path: "home" });
            } else {
              this.$store.commit("SET_USER_IDUSR", response.data.user.id_users);
              this.$router.push({ path: "dblAuth" });
            }
          }
        } catch (e) {
          console.log(e);
        }
      } else if (validPhone(this.identifiant)  && this.password != null && this.password != '') {
        try {
          const response = await axios.post(
            `http://localhost:3000/auth/loginSms`,
            {
              phone: this.identifiant,
              password: this.password
            }
          );
          if (response.data.error === "phone") {
            this.error = "Identifiant incorrect";
          } else if (response.data.error === "password") {
            this.error = "Mot de passe incorect";
          } else if (response.data.user.is_verified_phone === false) {
            this.error = "Veuillez verifiez votre numero de telephone";
          } else {
            this.$store.commit("SET_TOKEN", response.data.token);
            if (response.data.user.fa == false) {
              this.$store.commit("SET_USER", response.data.user);
              this.$store.commit("SET_INTERESTS", response.data.interest);
              this.$store.commit("SET_ISLOG", true);
              socket.emit("joinUid", { uid: response.data.user.uid });
              this.$router.push({ path: "home" });
            } else {
              this.$store.commit("SET_USER_IDUSR", response.data.user.id_users);
              this.$router.push({ path: "dblAuth" });
            }
          }
        } catch (e) {
          console.log(e);
        }
      } else {
        this.error = "Mauvais format pour l'identifiant";
      }
    },
    delNotif() {
      this.error = "";
    },
    loginFacebook() {
      axios.post(`localhost:3000/auth/loginSms`, {});
    },
    loginMail() {
      axios.post(`localhost:3000/auth/loginSms`, {});
    }
  }
};
</script>
