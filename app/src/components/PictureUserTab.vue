<template>
  <section class="container">
    <div class="columns is-multiline is-centered">
      <div v-for="n in 5" :key="n">
        <div class="column">
          <div v-if="user.picture">
            <div v-if="user.picture[n - 1]">
              <figure class="image" @click="changeFPicture(n)">
                <button @click="delImage(n)" class="delete"></button>
                <img class="image is-128x128" :src="user.picture[n - 1]" alt="Image" />
              </figure>
            </div>
          </div>
          <div v-else>
            <figure class="image">
              <img class="image is-128x128" src="https://bulma.io/images/placeholders/128x128.png" />
            </figure>
          </div>
        </div>
      </div>
    </div>
    <button class="button is-primary" @click="uploadImage">Upload une image</button>
  </section>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "PictureUserTab",
  data() {
    return {
      user: {}
    };
  },
  components: {},
  methods: {
    async changeFPicture(index) {
      if (this.user.picture.length > 2 && index - 1 > 0) {
        const data = {
          idUsr: this.user.id_users,
          newIndex: 1,
          oldIndex: index
        };
        const headers = { headers: { token: this.$store.getters.token } };
        try {
          const response = await axios.post(
            `http://localhost:3000/update/placePicture`,
            data,
            headers
          );
          let a = this.user.picture[0],
            b = this.user.picture[index - 1];
          this.$set(this.user.picture, 0, b);
          this.$set(this.user.picture, index - 1, a);
          this.$store.commit("SET_USER_PICTURE", this.user.picture);
        } catch (e) {
          console.log(e);
        }
      }
    },
    async delImage(index) {
      const data = {
        idUsr: this.user.id_users,
        index: index
      };
      const headers = { headers: { token: this.$store.getters.token } };
      try {
        const response = await axios.post(
          `http://localhost:3000/delete/picture`,
          data,
          headers
        );
        this.user.picture = this.user.picture.filter(
          (item, value) => value !== index - 1
        );
        this.$store.commit("SET_USER_PICTURE", this.user.picture);
      } catch (e) {
        console.log(e);
      }
    },
    async uploadImage() {
      let vm = this;
      const { value: file } = await Swal.fire({
        title: "Select image",
        input: "file",
        inputAttributes: {
          accept: "image/*",
          "aria-label": "Upload your profile picture"
        }
      });

      if (file) {
        const reader = new FileReader();
        reader.onload = async e => {
          Swal.fire({
            title: "Your uploaded picture",
            imageUrl: e.target.result,
            imageAlt: "The uploaded picture"
          });
          const data = {
            idUsr: vm.user.id_users,
            index: !vm.user.picture
              ? 0
              : vm.user.picture.length > 5
              ? 4
              : vm.user.picture.length,
            picture: e.target.result
          };
          const headers = { headers: { token: vm.$store.getters.token } };
          try {
            const response = await axios.post(
              `http://localhost:3000/update/picture`,
              data,
              headers
            );
            if (vm.user.picture) {
              if (vm.user.picture.length >= 5) {
                vm.user.picture.splice(4);
              }
            }
            vm.user.picture.push(e.target.result);
            vm.$store.commit("SET_USER_PICTURE", vm.user.picture);
          } catch (e) {
            console.log(e);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  },
  created() {
    this.user = this.$store.getters.user;
    if (!this.user.picture) {
      this.user.picture = [];
    }
  }
};
</script>
<style>
#picture {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>