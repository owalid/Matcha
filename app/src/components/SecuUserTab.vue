<template>
  <section>
    <div class="field is-horizontal">
      <div class="field-body">
        <div class="field">
          <label class="label is-small">Ancien mot de passe</label>
          <input
            class="input is-small"
            type="password"
            name="oldpasswd"
            id="oldpass"
            v-model="old_passwd"
          />
        </div>
        <div class="field">
          <div class="control">
            <label class="label is-small">Nouveau mot de passe</label>
            <input
              class="input is-small"
              type="password"
              name="newpasswd"
              id="newpass"
              v-model="new_passwd"
            />
            <div v-if="errorMdp">
              <p
                class="help is-primary"
              >Le mot de passe dois posseder 8 caractere minimum, au moins un nombre et au moins une majuscule</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-grouped is-grouped-centered">
      <p class="control">
        <button class="button is-primary" @click="changePasswdUser">Changer</button>
      </p>
    </div>
    <label class="label is-small">Double authentification</label>
    <div class="field is-grouped is-grouped-centered">
      <div v-if="qrcode">
        <figure class="image">
          <img class="image is-128x128" :src="qrcode" />
        </figure>
      </div>
    </div>
    <div class="field is-grouped is-grouped-centered">
      <div class="control">
        <button class="button is-primary" @click="doubleAuth">Régénérer une clef de double authentification</button>
      </div>
    </div>
  </section>
</template>
<script>
import { validPasswd } from "../checker";
import Swal from "sweetalert2";

export default {
  name: "SecuUserTab",
  data() {
    return {
      old_passwd: "",
      new_passwd: "",
      errorMdp: false,
      user: "",
      qrcode: ""
    };
  },
  methods: {
    async changePasswdUser(event) {
      event.preventDefault();
      if (validPasswd(this.new_passwd)) {
        this.errorMdp = false;
        const data = {
          oldpasswd: this.old_passwd,
          newpasswd: this.new_passwd,
          idUsr: this.user.id_users
        };
        const headers = { headers: { token: this.$store.getters.token } };
        try {
          const response = await axios.post(
            `http://localhost:3000/update/password`,
            data,
            headers
          );

          if (response.data.message === "passwd") {
            Swal.fire({
              type: "error",
              title: "",
              text: "Mauvais mot de passe"
            });
          } else if (response.data.message === "Passwd format") {
            this.errorMdp = false;
          } else {
            Swal.fire({
              type: "success",
              title: "",
              text: "Votre mot de passe à été changé avec succès"
            });
          }
        } catch (e) {
          console.log(e);
        }
      } else {
        this.errorMdp = true;
      }
    },
    async doubleAuth(event) {
      event.preventDefault();
      const headers = { headers: { token: this.$store.getters.token } };
      const vm = this;
      try {
        const response = await axios.get(
          `http://localhost:3000/user/getqrcodefa/${this.user.id_users}`,
          headers
        );
        let qrcode = response.data.data_img;
        if (response.data.data_img) {
          Swal.mixin({
            input: "text",
            imageUrl: qrcode,
            confirmButtonText: "Next &rarr;",
            showCancelButton: true,
            progressSteps: []
          })
            .queue([
              {
                title:
                  "Entrez votre code pour verifiez votre double authentification"
              }
            ])
            .then(async result => {
              if (result.value) {
                const res = await axios.get(
                  `http://localhost:3000/verif/fa/${vm.user.id_users}/${result.value}`,
                  headers
                );
                if (res.data.msg == "OK") {
                  Swal.fire({
                    title: "Cool !",
                    html:
                      "Votre double authentification à bien ete pris en compte",
                    confirmButtonText: "Cool !"
                  });
                  this.$store.commit("SET_USER_QRCODE", qrcode);
                  this.qrcode = qrcode;
                } else {
                  Swal.fire({
                    title: "Erreur",
                    html: "Le code ne correspond pas",
                    confirmButtonText: "Appuyer ici pour en envoyer un nouveau"
                  });
                }
              }
            });
        }
        this.$store.commit("SET_USER_BIO", this.bio);
      } catch (e) {
        console.log(e);
      }
    }
  },
  created() {
    this.user = this.$store.getters.user;
    this.qrcode = this.user.qrcode;
  }
};
</script>