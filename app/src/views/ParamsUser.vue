<template>
  <div>
    <div v-if="msg" class="notification is-success">
      <button @click="delNotif" class="delete"></button>
      {{msg}}
    </div>
    <section class="hero is-light">
      <div class="hero-foot is-centered ">
        <div class="tabs is-boxed is-fullwidth is-small is-fullwidth has-background-light">
          <div class="container">
          <ul>
            <li class="tab" @click="gotoInfo">
              <a>Mes informations</a>
            </li>
            <li class="tab" @click="gotoFilter">
              <a>Mes filtres de recherche</a>
            </li>
            <li class="tab" @click="gotoPicture">
              <a>Mes photos</a>
            </li>
            <li class="tab" @click="gotoSecu">
              <a>Securité</a>
            </li>
            <li class="tab" @click="gotoAchievement">
              <a>Mes achievement</a>
            </li>
          </ul>
          </div>
        </div>
      </div>
    </section>
          <div class="container section">
        <div class="box">
            <div class="content-tab" v-if="routerList === 'PARAMS'">
              <ParamsUserTab />
            </div>
            <div class="content-tab" v-if="routerList === 'SECU'">
              <SecuUserTab />
            </div>
            <div class="content-tab" v-if="routerList === 'FILTER'">
              <FilterSearchUserTab />
            </div>
            <div class="content-tab" v-if="routerList === 'PICTURE'">
              <PictureUserTab />
            </div>
            <div class="content-tab" v-if="routerList === 'ACH'">
              <AchievementUserTab />
            </div>
          </div>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ParamsUserTab from "@/components/ParamsUserTab.vue";
import PictureUserTab from "@/components/PictureUserTab.vue";
import SecuUserTab from "@/components/SecuUserTab.vue";
import FilterSearchUserTab from "@/components/FilterSearchUserTab.vue";
import AchievementUserTab from "@/components/AchievementUserTab.vue";

export default {
  name: "ParamsUser",
  props: ["msg"],

  data() {
    return {
      routerList: ""
    };
  },
  components: {
    ParamsUserTab,
    PictureUserTab,
    SecuUserTab,
    FilterSearchUserTab,
    AchievementUserTab
  },
  methods: {
    delNotif(e) {
      e.preventDefault();
      this.msg = "";
    },
    gotoInfo(event) {
      event.preventDefault();
      this.routerList = "PARAMS";
      this.$store.commit("SET_ROUTERLISTPARAMSUSER", this.routerList);
    },
    gotoPicture(event) {
      event.preventDefault();
      this.routerList = "PICTURE";
      this.$store.commit("SET_ROUTERLISTPARAMSUSER", this.routerList);
    },
    gotoFilter(event) {
      event.preventDefault();
      this.routerList = "FILTER";
      this.$store.commit("SET_ROUTERLISTPARAMSUSER", this.routerList);
    },
    gotoSecu(event) {
      event.preventDefault();
      this.routerList = "SECU";
      this.$store.commit("SET_ROUTERLISTPARAMSUSER", this.routerList);
    },
    gotoAchievement(event) {
      event.preventDefault();
      this.routerList = "ACH";
      this.$store.commit("SET_ROUTERLISTPARAMSUSER", this.routerList);
    }
  },
  created() {
    this.routerList = this.$store.getters.routerListParamsUser || "PARAMS";
  }
};
</script>
