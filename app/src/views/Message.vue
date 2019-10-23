<template>
  <section class="section">
    <div class="container">
      <article class="media">
        <div class="media-left">
          <figure class="image is-64x64" v-if="userMatched.picture != null">
            <img class="is-rounded" :src="userMatched.picture[0]" alt="Image" />
          </figure>
          <span
            :class="(userMatched.is_logged) ? 'has-badge-rounded has-badge-success' : 'has-badge-rounded has-badge-danger'"
            data-badge
          ></span>
        </div>
        <div class="media-content">
          <div class="content has-text-centered">
            <p class="title" @click="gotoProfil(userMatched.id_users)">{{ userMatched.first_name }}</p>
            <p class="subtitle">à {{distance}} kilomètres</p>
          </div>
          <div class="has-text-centered">
            <button class="button is-danger" @click="deleteMatch">Supprimer le match</button>
          </div>
        </div>
      </article>

      <div class="container">
        <div class="columns">
          <div class="column">
            <div v-if="messages">
              <div v-for="(msg, index) in messages" v-bind:key="index" class="padding-20">
                <p style="textAlign: right">
                  <span
                    v-bind:class="[msg.id_users == idUsr ? 'is-danger is-pulled-right' : 'is-light is-pulled-left', 'tag', 'is-medium']"
                  >{{msg.content}}</span>
                </p>
              </div>
            </div>
            <div v-else>
              <p>Aucun messages pour le moment. Faites le premier pas 😉</p>
            </div>
            <div></div>
            <div class="padding-50-bottom-top">
              <div v-if="typing">
                <p class="is-7">ecrit...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <form>
        <div class="field has-addons">
          <div class="control is-expanded">
            <input
              class="input"
              v-model="message"
              name="userInput"
              type="text"
              placeholder="Redigez un message"
              @keyup="isTyping"
              @keyup.enter="finishTyping"
              @change="finishTyping"
            />
          </div>
          <div class="control">
            <button class="button" @click="sendMessage">Envoyer</button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import { getDistance } from "@/distanceCalculator.js";
import { socket } from "../main";
import moment from "moment-timezone";

export default {
  name: "Message",
  components: {},
  computed: {},
  data() {
    return {
      idUsr: "",
      userMatched: {},
      messages: {},
      message: "",
      distance: "",
      channel: "",
      idMatch: "",
      idUsersMatch: "",
      typing: false
    };
  },
  destroyed() {
    socket.emit("leaveChannel", { channel: this.channel });
    socket.emit("typingStop", {
      id_users: this.idUsr.id_users,
      channel: this.channel
    });
  },
  async created() {
    try {
      let prop = this.$store.getters.paramsMsg;
      this.idMatch = prop.idMatch;
      this.idUsersMatch = prop.idUsersMatch;
      this.idUsr = this.$store.getters.user.id_users;
      const params = {
        headers: { token: this.$store.getters.token }
      };
      let response = await axios.get(
        `http://localhost:3000/get/${this.idUsersMatch}`,
        params
      );
      if (
        !response.data.result ||
        response.data.result === null ||
        response.data.result === ""
      ) {
        this.$router.push({
          name: "home"
        });
      }
      let mes = await axios.get(
        `http://localhost:3000/get/allMessages/${this.idMatch}`,
        params
      );
      let mid = await axios.get(
        `http://localhost:3000/get/mid/${this.idMatch}`,
        params
      );
      if (
        mid === undefined ||
        !mid.data ||
        mid.data === null ||
        mid.data === ""
      ) {
        this.$router.push({
          name: "home"
        });
      }
      this.channel = mid.data.mid[0].mid;
      this.userMatched = response.data.result;
      this.messages = mes.data.result;
      this.distance = getDistance(this.userMatched, this.$store.getters.user);
      socket.emit("joinChannel", { channel: this.channel });
      socket.on("newMessage", data => {
        let newValue = {
          content: data.message,
          id_users: data.id_users,
          id_message: data.id_message
        };
        this.$set(this.messages, this.messages.length, newValue);
      });
      socket.on("typingStart", data => {
        this.typing = true;
      });
      socket.on("typingStop", data => {
        this.typing = false;
      });
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    isTyping() {
      if (this.message == "") {
        this.finishTyping();
      } else {
        socket.emit("typingStart", {
          id_users: this.idUsr.id_users,
          channel: this.channel
        });
      }
    },
    finishTyping() {
      socket.emit("typingStop", {
        id_users: this.idUsr.id_users,
        channel: this.channel
      });
    },
    async sendMessage(event) {
      event.preventDefault();
      moment.locale("fr");
      const headers = {
        headers: { token: this.$store.getters.token }
      };
      const data = {
        idUsr: this.idUsr,
        idMatch: this.idMatch,
        content: this.message,
        date: moment.tz(moment(), "Europe/Paris").format()
      };
      let sendMsg = await axios.post(
        `http://localhost:3000/user/newMessage`,
        data,
        headers
      );
      if (sendMsg.data.msg === "NO MATCH") {
        this.$router.push({
          name: "homeAuth",
          params: { msg: "L'utilisateur vous à bloquer 😓" }
        });
      } else {
        let newValue = {
          content: this.message,
          id_users: this.idUsr,
          id_message: sendMsg.data.id.id_message
        };
        this.$set(this.messages, this.messages.length, newValue);
        socket.emit("newMessage", {
          id_users: newValue.id_users,
          message: newValue.content,
          id_message: newValue.id_message,
          channel: this.channel
        });
        socket.emit("message", {
          uid: this.userMatched.uid,
          message: `${this.$store.getters.user.first_name} vous à envoyer un message`
        });
        this.message = "";
      }
    },
    gotoProfil(idUsers) {
      this.$router.push({
        name: "profil",
        params: { idUsers: idUsers }
      });
    },
    async deleteMatch(event) {
      event.preventDefault(event);
      try {
        const headers = {
          headers: { token: this.$store.getters.token }
        };
        let data = { idMatch: this.idMatch };
        let delMatch = await axios.post(
          `http://localhost:3000/delete/match`,
          data,
          headers
        );
        if (delMatch.data.msg === "NO MATCH") {
          this.$router.push({
            name: "homeAuth",
            params: { msg: "L'utilisateur vous à bloquer 😓" }
          });
        }
        socket.emit("unlike", {
          uid: this.userMatched.uid,
          message: `Mauvaise nouvelle ${this.$store.getters.user.first_name} vous à unliker 😭`
        });
        data = {
          idUsr: this.userMatched.id_users,
          notification: `${this.$store.getters.user.first_name} vous à unliker`
        };
        let notif = await axios.post(
          `http://localhost:3000/user/notif`,
          data,
          headers
        );
        this.$router.push({ name: "match" });
      } catch (error) {
        console.log(error);
      }
    }
  },
  watch: {}
};
</script>
