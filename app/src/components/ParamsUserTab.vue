<template>
  <form>
    <div class="field is-horizontal">
      <div class="field-body">
        <div class="field">
          <label class="label is-small">Nom</label>
          <div class="control">
            <input class="input is-small" type="text" v-model="first_name" @change="changeFName" />
          </div>
        </div>
        <div class="field">
          <label class="label is-small">Prenom</label>
          <div class="control">
            <input class="input is-small" type="text" v-model="last_name" @change="changeLName" />
          </div>
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label is-small">Email</label>
      <div class="control is-expanded">
        <input
          type="email"
          name="email"
          id="email"
          class="input is-small"
          v-model="email"
          @change="changeMail"
        />
        <div v-if="errorMail">
          <p class="help is-primary">L'email n'est pas au bon format</p>
        </div>
      </div>
    </div>
    <label class="label is-small">Telephone</label>
    <div class="field has-addons is-grouped-centered">
      <p class="control is-small">
        <a class="button is-static is-small">+33</a>
      </p>
      <div class="control is-expanded">
        <input
          class="input is-small"
          type="text"
          placeholder="Telephone"
          @change="changePhone"
          v-model="phone"
        />
      </div>
      <div v-if="errorPhone">
        <p class="help is-primary">Le numero de telephone n'est pas au format</p>
      </div>
    </div>
    <label class="label is-small text-center">Date de naissance</label>
    <div class="field is-grouped is-grouped-centered">
      <div class="control">
        <datepicker v-model="date" @selected="changeDate" format="dd MMM yyyy"></datepicker>
      </div>
    </div>
    <label class="label is-small text-center">Changer de localisation</label>
    <div class="field is-grouped is-grouped-centered">
      <div class="control">
        <input
          class="input is-small"
          type="text"
          placeholder="Localisation"
          @change="changeLocalisation"
          v-model="adresse"
        />
        <GmapMap
          :center="{lat: parseFloat(lat), lng: parseFloat(long)}"
          :zoom="13"
          map-type-id="terrain"
          style="width: 500px; height: 300px"
        >
          <GmapMarker :position="google && new google.maps.LatLng(lat, long)" />
        </GmapMap>
      </div>
    </div>

    <label class="label is-small text-center"></label>
    <div class="field is-grouped is-grouped-centered">
      <p class="control">
        <button
          class="button is-primary"
          @click="updateLocation"
        >Mettre a jour ma postition actuelle</button>
      </p>
    </div>
    <div class="field is-grouped is-grouped-centered">
      <p class="control"></p>
    </div>
    <div class="field">
      <label class="label is-small">Bio</label>
      <div class="control">
        <textarea class="textarea is-small" v-model="bio" @change="changeBio"></textarea>
      </div>
    </div>
    <div class="field">
      <label class="label is-small">Vos centre d'interet</label>
      <div class="control">
        <multiselect
          v-model="value"
          tag-placeholder="Add this as new tag"
          placeholder="Search or add a tag"
          label="name_interest"
          :hide-selected="false"
          track-by="id_interest"
          :options="options"
          :max-height="500"
          :multiple="true"
          :taggable="true"
          @tag="addTag"
        ></multiselect>
      </div>
    </div>
    <div class="field is-grouped is-grouped-centered">
      <p class="control">
        <button class="button is-primary" @click="updateTags">Mettre a jour mes tags</button>
      </p>
    </div>
  </form>
</template>
<script>
import Multiselect from "vue-multiselect";
import VueGoogleAutocomplete from "vue-google-autocomplete";
import bulmaCalendar from "../../node_modules/bulma-calendar/dist/js/bulma-calendar.min.js";
import { validEmail, validPhone } from "../checker";
import Datepicker from "vuejs-datepicker";
import Swal from "sweetalert2";
import { gmapApi } from "vue2-google-maps";

export default {
  name: "ParamsUserTab",
  data() {
    return {
      user: "",
      name: "",
      first_name: "",
      last_name: "",
      date: "",
      old_passwd: "",
      new_passwd: "",
      bio: "",
      email: "",
      ville: "",
      phone: "",
      errorMdp: "",
      value: "",
      options: "",
      lat: "",
      long: "",
      adresse: "",
      options: [
        { id_interest: 1, name_interest: "memes" },
        { id_interest: 2, name_interest: "photography" },
        { id_interest: 3, name_interest: "javascript" },
        { id_interest: 4, name_interest: "helicopter dattaque" },
        { id_interest: 5, name_interest: "geek" },
        { id_interest: 6, name_interest: "travel" }
      ],
      errorMail: false,
      errorPhone: false,
      getFromAddress: ""
    };
  },
  components: {
    Datepicker,
    VueGoogleAutocomplete,
    Multiselect
  },
  methods: {
    async updateTags(e) {
      e.preventDefault();
      let vm = this;
      let newInterest = [];
      let data = { idUsr: vm.user.id_users };
      const headers = { headers: { token: vm.$store.getters.token } };
      const deleteAll = await axios.post(
        `http://localhost:3000/delete/allInterest`,
        data,
        headers
      );
      for (let i = 0; i < this.value.length; i++) {
        let id =
          this.value[i].id_interest || this.value[i].id_interest || false;
        //  console.log(id);
        try {
          if (id != false) {
            data = { idInterest: id, idUsr: vm.user.id_users };
            // console.log(data);
            const response = await axios.post(
              `http://localhost:3000/update/interest`,
              data,
              headers
            );
          }
        } catch (error) {
          console.error(error);
        }
      }
      try {
        const interestUser = await axios.get(
          `http://localhost:3000/get/interestUser/${this.user.id_users}`,
          headers
        );
        vm.$store.commit("SET_INTERESTS", interestUser.data.interest);
      } catch (err) {
        console.error(err);
      }
    },
    addTag(newTag) {
      const tag = {
        name_interest: newTag,
        id_interest:
          newTag.substring(0, 2) + Math.floor(Math.random() * 10000000)
      };
      this.options.push(tag);
      this.value.push(tag);
    },
    async changeLName(event) {
      event.preventDefault();
      const data = { maxDistance: this.last_name, idUsr: this.user.id_users };
      const headers = { headers: { token: this.$store.getters.token } };
      try {
        const response = await axios.post(
          `http://localhost:3000/update/lastname`,
          data,
          headers
        );
        this.$store.commit("SET_USER_LASTNAME", this.last_name);
      } catch (e) {
        console.log(e);
      }
    },
    async changeFName(event) {
      event.preventDefault();
      const data = { maxDistance: this.first_name, idUsr: this.user.id_users };
      const headers = { headers: { token: this.$store.getters.token } };
      try {
        const response = await axios.post(
          `http://localhost:3000/update/firstname`,
          data,
          headers
        );
        console.log(response.data);
        this.$store.commit("SET_USER_FIRSTNAME", this.first_name);
      } catch (e) {
        console.log(e);
      }
    },

    async changeMail(event) {
      event.preventDefault();
      if (validEmail(this.email)) {
        this.errorMail = false;
        const data = {
          email: this.email,
          idUsr: this.user.id_users,
          firstName: this.user.first_name
        };
        const headers = { headers: { token: this.$store.getters.token } };
        try {
          const response = await axios.post(
            `http://localhost:3000/update/mail`,
            data,
            headers
          );
          this.$store.commit("SET_USER_EMAIL", this.email);
        } catch (e) {
          console.log(e);
        }
      } else {
        this.errorMail = true;
      }
    },

    async changePhone(event) {
      event.preventDefault();
      const prefix = "+33";
      const vm = this;
      if (validPhone(`${prefix}${this.phone}`)) {
        this.errorPhone = false;
        const data = {
          number: `${prefix}${this.phone}`,
          idUsr: this.user.id_users
        };
        const headers = { headers: { token: this.$store.getters.token } };
        try {
          const response = await axios.post(
            `http://localhost:3000/verif/sms`,
            data,
            headers
          );
          let code = response.data.code;
          console.log(response);
          if (response.data.message === "Error sms") {
            Swal.fire({
              title: "Erreur",
              html: "Erreur lors de l'envois du sms",
              confirmButtonText: "OK"
            });
          } else {
            Swal.mixin({
              input: "text",
              confirmButtonText: "Next &rarr;",
              showCancelButton: true,
              progressSteps: ["1"]
            })
              .queue([
                {
                  title: "Code de verification"
                }
              ])
              .then(async result => {
                const res = await axios.get(
                  `http://localhost:3000/verif/sms/${vm.user.id_users}/${result.value}`,
                  headers
                );
                if (res.data.message === "Verified") {
                  console.log(res.data.message);
                  Swal.fire({
                    title: "Cool !",
                    html: "Votre numero de telephone à été verifier",
                    confirmButtonText: "Cool !"
                  });
                  this.$store.commit("SET_USER_PHONENUMBER", this.phone);
                } else {
                  Swal.fire({
                    title: "Erreur",
                    html: "Le code ne correspond pas",
                    confirmButtonText: "Appuyer ici pour en envoyer un nouveau"
                  });
                }
              });
          }
        } catch (e) {
          console.log(e);
        }
      } else {
        this.errorPhone = true;
      }
    },
    async changeBio(event) {
      event.preventDefault();
      const data = { bio: this.bio, idUsr: this.user.id_users };
      const headers = { headers: { token: this.$store.getters.token } };
      try {
        const response = await axios.post(
          `http://localhost:3000/update/bio`,
          data,
          headers
        );
        this.$store.commit("SET_USER_BIO", this.bio);
      } catch (e) {
        console.log(e);
      }
    },
    async changeDate(event) {
      let dd =
        this.date.getDate() < 10
          ? `0${this.date.getDate()}`
          : this.date.getDate();
      let mm =
        this.date.getMonth() + 1 < 10
          ? `0${this.date.getMonth() + 1}`
          : this.date.getMonth() + 1;
      let yyyy = this.date.getFullYear();
      this.date = `${yyyy}-${mm}-${dd}`;
      const data = { date: this.date, idUsr: this.user.id_users };
      const headers = { headers: { token: this.$store.getters.token } };
      try {
        const response = await axios.post(
          `http://localhost:3000/update/dateOfBirth`,
          data,
          headers
        );
        this.$store.commit("SET_USER_DATEOFBIRTH", this.date);
      } catch (e) {
        console.log(e);
      }
    },

    async updateLocation(event) {
      event.preventDefault();
      try {
        navigator.geolocation.getCurrentPosition(
          pos => {
            this.$store.commit("SET_USER_LATITUDE", pos.coords.latitude);
            this.$store.commit("SET_USER_LONGITUDE", pos.coords.longitude);
            this.lat = this.user.latitude;
            this.long = this.user.longitude;
          },
          async err => {
            const response = await axios.get(
              `http://localhost:3000/get/location`
            );
            this.$store.commit("SET_USER_LATITUDE", response.data.lat);
            this.$store.commit("SET_USER_LONGITUDE", response.data.long);
            this.lat = this.user.latitude;
            this.long = this.user.longitude;
          }
        );
        const headers = { headers: { token: this.$store.getters.token } };
        const data = {
          lat: this.user.latitude,
          lgn: this.user.longitude,
          idUsr: this.user.id_users
        };
        const res = await axios.post(
          `http://localhost:3000/update/coordinate`,
          data,
          headers
        );
      } catch (e) {
        console.log(e);
      }
    },
    async changeLocalisation(event) {
      try {
        const headers = { headers: { token: this.$store.getters.token } };
        const response = await axios.get(
          `http://localhost:3000/get/coordinate/${this.adresse}`
        );
        const lat = response.data.res.latitude;
        const lgn = response.data.res.longitude;
        this.adresse = "";
        const data = { lgn: lgn, lat: lat, idUsr: this.user.id_users };
        const res = await axios.post(
          `http://localhost:3000/update/coordinate`,
          data,
          headers
        );
        this.$store.commit("SET_USER_LATITUDE", lat);
        this.$store.commit("SET_USER_LONGITUDE", lgn);
        this.lat = this.$store.getters.user.latitude;
        this.long = this.$store.getters.user.longitude;
      } catch (e) {
        console.log(e);
      }
    },
    success(pos) {
      console.log(pos);
    }
  },
  created() {
    let vm = this;
    this.user = this.$store.getters.user;
    this.first_name = this.user.first_name;
    this.last_name = this.user.last_name;
    this.bio = this.user.bio;
    this.email = this.user.email;
    this.phone = this.user.phone_number;
    this.value = this.$store.getters.interest;
    this.date = new Date(this.user.date_of_birth);
    this.lat = this.$store.getters.user.latitude;
    this.long = this.$store.getters.user.longitude;
  },
  computed: {
    google: gmapApi
  }
};
</script>
<style>
@import "../../node_modules/vue-multiselect/dist/vue-multiselect.min.css";
</style>