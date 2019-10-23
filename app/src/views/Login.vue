<template>
<section>
    <div v-if="user.first_name">
        {{ redirect() }}
    </div>
    <div v-else>
        <LoginForm />
    </div>
</section>
</template>

<script>
// @ is an alias to /src
import LoginForm from "@/components/LoginForm.vue";

export default {
    name: "Login",
    components: {
        LoginForm
    },
    methods: {
      redirect() {
          this.$router.push({ path: 'home'})
      }
    },
    computed: {
        user() {
            return this.$store.getters.user;
        }
    }
};
</script>
