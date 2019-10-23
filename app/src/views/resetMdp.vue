<template>
  <section class="hero is-fullheight">
    <div v-if="error">
      <div class="notification is-danger">
        <button @click="delNotif" class="delete"></button>
        {{error}}
      </div>
    </div>
    <div class="hero-body">
      <div class="container">
        <form class="box">
          <div class="field">
            <label for class="label">Identifiant</label>
            <div class="control has-icons-left">
              <input placeholder v-model="formValue" class="input" @change="sendCode" />
              <span class="icon is-small is-left">
                <i class="fa fa-envelope"></i>
              </span>
            </div>
          </div>
          <div v-if="codeForm && !changeMdp">
            <div class="field">
              <label class="label is-small">Code</label>
              <input class="input is-small" type="text" v-model="code" @change="verifCode" />
            </div>
          </div>
          <div v-if="!codeForm && changeMdp">
            <div class="field">
              <label class="label is-small">Nouveau mot de passe</label>
              <input
                class="input is-small"
                type="password"
                v-model="newPassword"
                @change="changePasswd"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
<script>
import { validEmail, validPhone, validPasswd } from "../checker";
import Swal from "sweetalert2";

export default {
  name: "resetMdp",
  data() {
    return {
      phone: false,
      mail: false,
      codeForm: false,
      changeMdp: false,
      formValue: "",
      newPassword: "",
      code: "",
      error: "",
      idUsr: ""
    };
  },
  methods: {
    async sendCode(event) {
      event.preventDefault();
      if (validEmail(this.formValue)) {
        this.codeForm = true;
        const response = await axios.post(
          `http://localhost:3000/reset/passwordEmail`,
          {
            email: this.formValue
          }
        );
        if (response.data.message === "Unknown user") {
          this.error = "Identifiant inconnu";
        } else if (response.data.message === "Error sendMail") {
          this.error = "L'envois du sms à echoué";
        } else if (response.data.message === "Email send") {
          this.error = "";
          this.idUsr = response.data.idUsr;
        }
      } else if (validPhone(this.formValue)) {
        this.codeForm = true;
        try {
          const response = await axios.post(
            `http://localhost:3000/reset/passwordSms`,
            {
              number: this.formValue
            }
          );
          if (response.data.message === "Unknown phone") {
            this.error = "Identifiant inconnu";
          } else if (response.data.message === "Error sms") {
            this.error = "L'envois du sms à echoué";
          } else if (response.data.message === "Sms send") {
            this.error = "";
            this.idUsr = response.data.id_usr;
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        this.error = "Mauvais format";
      }
    },
    delNotif(event) {
      event.preventDefault();
      this.error = "";
    },
    async verifCode(event) {
      event.preventDefault();
      this.error = "";
      try {
        const response = await axios.get(
          `http://localhost:3000/reset/verifCode/${this.code}/${this.idUsr}`
        );
        if (response.data.message === "Error") {
          this.error = "Mauvais code";
        } else if (response.data.message === "OK") {
          this.codeForm = false;
          this.changeMdp = true;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async changePasswd(event) {
      event.preventDefault();
      this.error = "";
      try {
        if (validPasswd(this.newPassword)) {
          const response = await axios.post(
            `http://localhost:3000/reset/passwd`,
            { idUsr: this.idUsr, passwd: this.newPassword }
          );
          Swal.fire({
            type: "success",
            title: "",
            text: "Votre mot de passe à été changé avec succès"
          });
          this.$router.push({ path: "login" });
        } else {
          this.error = "Mauvais format de mot de passe";
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>