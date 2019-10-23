import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id_users: '',
      first_name: '',
      last_name: '',
      email: '',
      gender: '',
      date_of_birth: '',
      sexual_or: '',
      bio: '',
      latitude: '',
      longitude: '',
      popular_score: '',
      phone_number: '',
      is_verified: false,
      is_verified_phone: false,
      age_min: '',
      age_max: '',
      max_distance: '',
      qrcode: '',
      uid: '',
      sementics_bio: 0,
      picture: [],
      tag_common: '',
      fa: false
    },
    isLog: false,
    routerListParamsUser: '',
    interest: [],
    token: '',
    paramsMsg: {},
    connect: false
  },
  mutations: {
    SET_PARAMSMSG: (state, val) => {
      state.paramsMsg = val
    },
    SET_USER_TAGCOMMON: (state, val) => {
      state.user.tag_common = val
    },
    SET_ROUTERLISTPARAMSUSER: (state, val) => {
      state.routerListParamsUser = val
    },
    SET_USER: (state, val) => {
      state.user = val
    },
    SET_USER_FIRSTNAME: (state, val) => {
      state.user.first_name = val
    },
    SET_USER_UID: (state, val) => {
      state.user.uid = val
    },
    SET_USER_IDUSR: (state, val) => {
      state.user.id_users = val
    },
    SET_USER_LASTNAME: (state, val) => {
      state.user.last_name = val
    },
    SET_USER_EMAIL: (state, val) => {
      state.user.email = val
    },
    SET_USER_GENDER: (state, val) => {
      state.user.gender = val
    },
    SET_USER_DATEOFBIRTH: (state, val) => {
      state.user.date_of_birth = val
    },
    SET_USER_SEXUALOR: (state, val) => {
      state.user.sexual_or = val
    },
    SET_USER_BIO: (state, val) => {
      state.user.bio = val
    },
    SET_USER_LATITUDE: (state, val) => {
      state.user.latitude = val
    },
    SET_USER_LONGITUDE: (state, val) => {
      state.user.longitude = val
    },
    SET_USER_POPULARSCORE: (state, val) => {
      state.user.popular_score = val
    },
    SET_USER_PHONENUMBER: (state, val) => {
      state.user.phone_number = val
    },
    SET_USER_ISVERIFIED: (state, val) => {
      state.user.is_verified = val
    },
    SET_USER_ISVERIFIEDPHONE: (state, val) => {
      state.user.is_verified_phone = val
    },
    SET_USER_MAXDISTANCE: (state, val) => {
      state.user.max_distance = val
    },
    SET_USER_AGEMIN: (state, val) => {
      state.user.age_min = val
    },
    SET_USER_AGEMAX: (state, val) => {
      state.user.age_max = val
    },
    SET_ISLOG: (state, val) => {
      state.isLog = val
    },
    SET_USER_SEMENTICBIO: (state, val) => {
      state.user.sementics_bio = val
    },
    SET_USER_PICTURE: (state, val) => {
      state.user.picture = val
    },
    SET_USER_FA: (state, val) => {
      state.user.fa = val
    },
    SET_USER_QRCODE: (state, val) => {
      state.user.qrcode = val
    },
    SET_TOKEN: (state, val) => {
      state.token = val
    },
    SET_INTERESTS: (state, val) => {
      state.interest = val
    }
  },
  action: {
    SET_HANDLE: (context, payload) => {
      context.commit('SET_HANDLE', payload)
    }
  },
  getters: {
    user: state => state.user,
    token: state => state.token,
    interest: state => state.interest,
    isLog: state => state.isLog,
    paramsMsg: state => state.paramsMsg,
    routerListParamsUser: state => state.routerListParamsUser
  },
  plugins: [createPersistedState()]
})
