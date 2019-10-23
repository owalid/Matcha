<template>
  <section class="hero is-fullheight">
    <div v-if="errorMail">
      <div class="notification is-danger">
        <button @click="delNotifMail" class="delete"></button> L'email renseigné n'est pas au bon format
      </div>
    </div>
    <div v-if="errorParams">
      <div class="notification is-danger">
        <button @click="delNotifParams" class="delete"></button> Veuillez remplir tout les champs !
      </div>
    </div>
    <div v-if="errorDate">
      <div class="notification is-danger">
        <button @click="delNotifMail" class="delete"></button> Vous devez avoir au minimum 18ans pour vous inscrire
      </div>
    </div>
    <div v-if="errorPassword">
      <div class="notification is-danger">
        <button @click="delNotifPassword" class="delete"></button> Mauvais format du mot de passe
      </div>
    </div>
    <div v-if="errorPhone">
      <div class="notification is-danger">
        <button @click="delNotifPhone" class="delete"></button> Le numero de telephone renseigné n'est pas au bon format
      </div>
    </div>
    <div class="hero-body padding-150-bottom-top">
      <div class="container">
        <form action class="box">
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Informations</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control is-expanded has-icons-left">
                  <input class="input" type="text" v-model="lastName" placeholder="Nom" />
                </p>
              </div>
              <div class="field">
                <p class="control is-expanded has-icons-left">
                  <input class="input" type="text" v-model="firstName" placeholder="Prenom" />
                </p>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Adresse mail</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control is-expanded has-icons-left">
                  <input class="input" type="text" v-model="email" placeholder="Email" />
                </p>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Date de naissance</label>
            </div>
            <div class="field-body">
              <div class="control">
                <datepicker v-model="date" format="dd MMM yyyy"></datepicker>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Sexe</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <div class="control">
                    <div class="select">
                      <select v-model="gender">
                        <option>Homme</option>
                        <option>Femme</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label is-small">Bio</label>
            <div class="control">
              <textarea class="textarea is-small" v-model="bio"></textarea>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Mot de passe</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control is-expanded has-icons-left">
                  <input class="input" v-model="password" type="password" placeholder />
                </p>
              </div>
            </div>
          </div>
          <div class="field is-grouped is-grouped-centered has-text-centered">
            <p class="control">
              <button class="button text-centered" @click="register">Créer mon compte</button>
            </p>
            <p class="control">
              <router-link to="/login">
                <a class="button text-centered is-success">J'ai dejà un compte</a>
              </router-link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
// /* eslint-disable */
// import { FontAwesomeIcon } from '../../node_modules/@fortawesome/vue-fontawesome'

// import VFacebookLogin from 'vue-facebook-login-component'
// import { VFBLogin as VFacebookLogin } from 'vue-facebook-login-component'
import { validEmail, validPhone, validPasswd, validDate } from "../checker";
import Datepicker from "vuejs-datepicker";

export default {
  name: "RegisterForm",
  components: {
    Datepicker
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      password: "",
      date: new Date('1998-03-25'),
      email: "",
      gender: "",
      latitude: "",
      longitude: "",
      bio: "",
      errorMail: false,
      errorPhone: false,
      errorPassword: false,
      errorParams: false,
      errorDate: false
    };
  },
  methods: {
    async register(event) {
      event.preventDefault();
      if (
        this.email &&
        this.firstName &&
        this.lastName &&
        this.password &&
        this.bio &&
        this.date &&
        this.email &&
        this.gender
      ) {
        if (!validEmail(this.email)) {
          return (this.errorMail = true);
        }
        if (!validPasswd(this.password)) {
          return (this.errorPassword = true);
        }
        if (!validDate(this.date)) {
          return (this.errorDate = true);
        }
        try {
          const coordinate = await axios.get(
            `http://localhost:3000/get/location`
          );
          const data = {
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            password: this.password,
            dateOfBirth: this.date,
            latitude: coordinate.data.lat,
            longitude: coordinate.data.long,
            bio: this.bio,
            gender: this.gender === "Homme" ? "M" : "F"
          };
          const response = await axios.post(
            `http://localhost:3000/user/register`,
            data
          );
          this.$router.push({
          name: "home",
          params: { msg: "Veuillez valider votre adresse mail" }
        });
        } catch (error) {
          console.error(error);
        }
      } else {
        return (this.errorParams = true);
      }
    },
    delNotifMail(event) {
      event.preventDefault();
      this.errorMail = false;
    },
    delNotifPassword(event) {
      event.preventDefault();
      this.errorPassword = false;
    },
    delNotifPhone(event) {
      event.preventDefault();
      this.errorPhone = false;
    },
    delNotifParams(event) {
      event.preventDefault();
      this.errorParams = false;
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
