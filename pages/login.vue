<template>
    <section>
        <h4 
            class="redirect-message" 
            v-if="$route.query.frompage"
        >
            You need to log in!
        </h4>
        <h2 v-else>Log in</h2>
        <form class="form-group">
            <input type="text" placeholder="Login" class="form-control" v-model="loginValue" />
            <button class="btn btn-primary" @click.prevent="onLogin">Enter</button>
        </form>
        <nuxt-link to="/">Go to menu</nuxt-link>
    </section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    layout: 'empty',
    data() {
        return {
            loginValue: ''
        }
    },
    methods: {
         ...mapActions({ 
            login: 'user/login',
            logout: 'user/logout'
         }),
        onLogin() {
            if(this.loginValue === '') return;

            this.login(this.loginValue);
            let path = this.$route.query.frompage.replace('-', '/');
            this.$router.push(`/${path}`);
        }
    }
}
</script>

<style scoped>
    h2 {
        margin-bottom: 40px;
    }
    section {
        width: 500px;
        text-align: center;
    }

    input {
        width: 100%;
    }
    button {
        margin: 15px 0;
        width: 150px;
    }
    .redirect-message {
        padding: 10px;
        color: rgb(255, 70, 70);
        font-weight: bold;
    }
</style>