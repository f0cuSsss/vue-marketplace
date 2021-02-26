<template>
  <div class="app">
    <Navbar />
    <main>
      <nuxt />
    </main>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  import Navbar from '@/components/Navbar.vue'

  export default {
    mounted() {
      this.initCart();
    },
    methods: {
        ...mapActions({
            initCart: 'cart/initCart'
        }),
    },
    components: {
      Navbar
    }
  }
</script>

<style>
  /* @import url("@/assets/styles/variables.scss"); */

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .app {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  main {
    /*    background: linear-gradient($bgimage_color, $bgimage_color),
      url("@/assets/images/main-bg.jpg") fixed; */
    background: linear-gradient(rgb(109, 109, 109, 0.6), rgb(109, 109, 109, 0.6)),
      url("@/assets/images/main-bg.jpg") fixed;
    background-size: cover;
    flex: 1 1 auto;
  }
</style>