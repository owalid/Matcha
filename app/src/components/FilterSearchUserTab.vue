<template>
  <section>
    <div class="field">
      <label class="label is-small">Distance maximum</label>
      <p class="control is-expanded has-icons-left">
        {{distance}} km
        <input
          id="distance"
          class="slider is-fullwidth is-large is-danger is-circle is-small"
          step="1"
          min="18"
          max="100"
          v-model="distance"
          type="range"
          @change="changeMaxDistance"
        />
      </p>
    </div>
    <div class="field is-horizontal">
      <div class="field-body is-grouped is-grouped-centered">
        <div class="field">
          <label class="label is-small">Age Minimum</label>
          <p class="control is-expanded has-icons-left">
            {{ageMin}} ans
            <input
              id="distance"
              class="slider is-fullwidth is-large is-danger is-circle is-small"
              step="1"
              min="18"
              :max="ageMax - 1"
              v-model="ageMin"
              type="range"
              @change="changeMinAge"
            />
          </p>
        </div>
         <div class="field">
          <label class="label is-small">Age Maximum</label>
          <p class="control is-expanded has-icons-left">
            {{ageMax}} ans
            <input
              id="distance"
              class="slider is-fullwidth is-large is-danger is-circle is-small"
              step="1"
              :min="ageMin - 1"
              max="100"
              v-model="ageMax"
              type="range"
              @change="changeMaxAge"
            />
          </p>
        </div>
      </div>
    </div>
     <div class="field">
          <label class="label is-small">Nombre de tags en commun</label>
          <p class="control is-expanded has-icons-left">
            {{commonTags}} tags en commun
            <input
              id="tag"
              class="slider is-fullwidth is-large is-danger is-circle is-small"
              step="1"
              min="0"
              :max="5"
              v-model="commonTags"
              type="range"
              @change="changeCommonTag"
            />
          </p>
          <p class="subtitle is-size-7">Le nombres de tag en commun minimum</p>
        </div>
    <div class="field is-grouped is-grouped-centered">
      <div class="control">
        <label class="label">Je recherche</label>
        <div class="control">
          <div class="select is-primary">
            <select v-model="selectedSearch" @change="changeSexualOr">
              <option>Homme</option>
              <option>Femme</option>
              <option>Les deux</option>
            </select>
          </div>
        </div>
      </div>
      <div class="control">
        <label class="label">Sexe</label>
        <div class="control">
          <div class="select is-primary">
            <select v-model="selectedGender" @change="changeGender">
              <option>Homme</option>
              <option>Femme</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "FilterSearchUserTab",
  data() {
    return {
      distance: "",
      ageMax: "",
      ageMin: "",
      selectedGender: "",
      selectedSearch: "",
      optionGenderRev: {
        Homme: "M",
        Femme: "F"
      },
      optionGender: {
        M: "Homme",
        F: "Femme"
      },
      optionSearch: {
        M: "Homme",
        F: "Femme",
        B: "Les deux"
      },
      commonTags: ""
    };
  },
  methods: {
    async changeMaxDistance(event) {
      event.preventDefault();
      const data = { maxDistance: this.distance, idUsr: this.user.id_users };
      const headers = { headers: { token: this.$store.getters.token } };
      try {
        const response = await axios.post(
          `http://localhost:3000/update/distance`,
          data,
          headers
        );
        this.$store.commit("SET_USER_MAXDISTANCE", this.distance);
      } catch (e) {
        console.log(e);
      }
    },
    async changeCommonTag(event) {
        event.preventDefault();
        const headers = { headers: { token: this.$store.getters.token } };
        const data = { tagCommon: this.commonTags, idUsr: this.user.id_users };
        try {
            const response = await axios.post('http://localhost:3000/update/tagCommon',
            data,
            headers)
            this.$store.commit("SET_USER_TAGCOMMON", this.commonTags);
        } catch (error) {
            console.error(error);
        }
    },
    async changeMaxAge(event) {
      event.preventDefault();
      this.errorMail = false;
      const data = {
        ageMax: this.ageMax,
        idUsr: this.user.id_users
      };
      const headers = { headers: { token: this.$store.getters.token } };
      try {
        const response = await axios.post(
          `http://localhost:3000/update/maxAge`,
          data,
          headers
        );
        this.$store.commit("SET_USER_AGEMAX", this.ageMax);
      } catch (e) {
        console.log(e);
      }
    },
        async changeGender(event) {
      event.preventDefault();
      const data = {
        gender: this.optionGenderRev[this.selectedGender],
        idUsr: this.user.id_users
      };
      const headers = { headers: { token: this.$store.getters.token } };
      try {
        const response = await axios.post(
          `http://localhost:3000/update/gender`,
          data,
          headers
        );
        this.$store.commit(
          "SET_USER_GENDER",
          this.optionGenderRev[this.selectedGender]
        );
        this.selectedSearch = this.updateSexualOr();
      } catch (e) {
        console.log(e);
      }
    },
    async changeMinAge(event) {
      event.preventDefault();
      this.errorMail = false;
      const data = {
        ageMax: this.ageMin,
        idUsr: this.user.id_users
      };
      const headers = { headers: { token: this.$store.getters.token } };
      try {
        const response = await axios.post(
          `http://localhost:3000/update/minAge`,
          data,
          headers
        );
        this.$store.commit("SET_USER_AGEMIN", this.ageMin);
      } catch (e) {
        console.log(e);
      }
    },
    async changeSexualOr(event) {
      event.preventDefault();
      let sexualOr =
        this.selectedSearch === this.optionSearch[this.user.gender]
          ? "G"
          : this.selectedSearch === "Les deux"
          ? "B"
          : "H";
      const data = { sexualOr: sexualOr, idUsr: this.user.id_users };
      const headers = { headers: { token: this.$store.getters.token } };
      try {
        const response = await axios.post(
          `http://localhost:3000/update/sexualOr`,
          data,
          headers
        );
        this.$store.commit("SET_USER_SEXUALOR", sexualOr);
      } catch (e) {
        console.log(e);
      }
    },
    updateSexualOr() {
      return (this.selectedSearch =
        this.user.sexual_or === "G"
          ? this.selectedGender
          : this.user.sexual_or === "B"
          ? this.optionSearch["B"]
          : this.optionGender[this.user.gender === "M" ? "F" : "M"]);
    }
  },
  created() {
    this.user = this.$store.getters.user;
    this.distance = this.user.max_distance;
    this.commonTags = this.user.tag_common;
    this.selectedGender = this.optionGender[this.user.gender];
    this.selectedSearch = this.updateSexualOr();
    this.ageMax = this.user.age_max;
    this.ageMin = this.user.age_min;
  }
};
</script>