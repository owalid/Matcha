<template>
  <div class="container">
    <p class="is-4">Like</p>
    <hr />
    <div class="columns is-3 is-multiline is-centered">
      <div class="column" v-if="achvLike[0]">
        <div class="card-image">
          <p>Avoir liker 50 profils</p>
          <figure class="image is-4by3">
            <img src="/img/achievement/like1.png" alt="Placeholder image" />
          </figure>
        </div>
      </div>
      <div class="column" v-else>
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="/img/achievement/default.jpg" alt="Placeholder image" />
          </figure>
        </div>
      </div>
      <div class="column" v-if="achvLike[1]">
        <div class="card-image">
          <p>Avoir liker 150 profils</p>
          <figure class="image is-4by3">
            <img src="/img/achievement/like2.png" alt="Placeholder image" />
          </figure>
        </div>
      </div>
      <div class="column" v-else>
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="/img/achievement/default.jpg" alt="Placeholder image" />
          </figure>
        </div>
      </div>
      <div class="column" v-if="achvLike[2]">
        <div class="card-image">
          <p>Avoir liker 1000 profils</p>

          <figure class="image is-4by3">
            <img src="/img/achievement/like3.png" alt="Placeholder image" />
          </figure>
        </div>
      </div>
      <div class="column" v-else>
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="/img/achievement/default.jpg" alt="Placeholder image" />
          </figure>
        </div>
      </div>
    </div>
     <p class="is-4">Match</p>
    <hr />
    <div class="columns is-3 is-multiline is-centered">
      <div class="column" v-if="achvMatch[0]">
        <div class="card-image">
          <p>Avoir 50 matchs</p>

          <figure class="image is-4by3">
            <img src="/img/achievement/match1.png" alt="Placeholder image" />
          </figure>
        </div>
      </div>
      <div class="column" v-else>
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="/img/achievement/default.jpg" alt="Placeholder image" />
          </figure>
        </div>
      </div>
      <div class="column" v-if="achvMatch[1]">
        <div class="card-image">
          <p>Avoir 150 matchs</p>

          <figure class="image is-4by3">
            <img src="/img/achievement/match2.png" alt="Placeholder image" />
          </figure>
        </div>
      </div>
      <div class="column" v-else>
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="/img/achievement/default.jpg" alt="Placeholder image" />
          </figure>
        </div>
      </div>
      <div class="column" v-if="achvMatch[2]">
        <div class="card-image">
          <p>Avoir 1000 matchs</p>
          <figure class="image is-4by3">
            <img src="/img/achievement/match3.png" alt="Placeholder image" />
          </figure>
        </div>
      </div>
      <div class="column" v-else>
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="/img/achievement/default.jpg" alt="Placeholder image" />
          </figure>
        </div>
      </div>
    </div>
     <p class="is-5">Messages</p>
    <hr />
    <div class="columns is-3 is-multiline is-centered">
      <div class="column" v-if="achvMessage[0]">
        <div class="card-image">
          <p>Avoir envoyer 500 messages</p>
          <figure class="image is-4by3">
            <img src="/img/achievement/message1.png" alt="Placeholder image" />
          </figure>
        </div>
      </div>
      <div class="column" v-else>
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="/img/achievement/default.jpg" alt="Placeholder image" />
          </figure>
        </div>
      </div>
      <div class="column" v-if="achvMessage[1]">
        <div class="card-image">
          <p>Avoir envoyer 1000 messages</p>
          <figure class="image is-4by3">
            <img src="/img/achievement/message2.png" alt="Placeholder image" />
          </figure>
        </div>
      </div>
      <div class="column" v-else>
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="/img/achievement/default.jpg" alt="Placeholder image" />
          </figure>
        </div>
      </div>
      <div class="column" v-if="achvMessage[2]">
        <div class="card-image">
          <p>Avoir envoyer 10000 messages</p>
          <figure class="image is-4by3">
            <img src="/img/achievement/message3.png" alt="Placeholder image" />
          </figure>
        </div>
      </div>
      <div class="column" v-else>
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="/img/achievement/default.jpg" alt="Placeholder image" />
          </figure>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AchievementUserTab",
  data() {
    return {
      achvLike: "",
      achvMatch: "",
      achvMessage: "",
      user: ""
    };
  },
  async created() {
    this.user = this.$store.getters.user;
    const params = {
      headers: { token: this.$store.getters.token }
    };
    try {
      let result = await axios.get(
        `http://localhost:3000/get/getUserAchievement/${this.user.id_users}`,
        params
      );
      this.achvLike = [];
      this.achvMatch = [];
      this.achvMessage = [];
      let vm = this;
      result.data.achievement.map((k, v) => {
        if (k.id_achievement === 1) {
          vm.achvLike[0] = k.path;
        }
        if (k.id_achievement === 2) {
          vm.achvLike[1] = k.path;
        }
        if (k.id_achievement === 3) {
          vm.achvLike[2] = k.path;
        }
        if (k.id_achievement === 4) {
          vm.achvMatch[0] = k.path;
        }
        if (k.id_achievement === 5) {
          vm.achvMatch[1] = k.path;
        }
        if (k.id_achievement === 6) {
          vm.achvMatch[2] = k.path;
        }
        if (k.id_achievement === 7) {
          vm.achvMessage[0] = k.path;
        }
        if (k.id_achievement === 8) {
          vm.achvMessage[1] = k.path;
        }
        if (k.id_achievement === 9) {
          vm.achvMessage[2] = k.path;
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
};
</script>