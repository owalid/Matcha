<template>
  <div v-if="error">
    <p>Une erreur c'est produite :(</p>
  </div>
</template>
<script>
export default {
  name: "VerifMail",
  props: ["idUsr", "hash"],
  data() {
    return {
      error: false
    };
  },
  async created() {
    try {
      const res = await axios.get(
        `http://localhost:3000/verif/mail/${this.idUsr}/${this.hash}`
      );
      if (res.data.message === "OK") {
        this.$router.push({
          name: "home",
          params: { msg: "Votre email à bien été verifier 👍" }
        });
      } else {
        this.error = true;
      }
    } catch (error) {}
  }
};
</script>