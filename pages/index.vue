<template>
  <div class="container">
    <div class="home-nav-list">
      <HomeItem
        v-for="item in items"
        :key="item.title"
        :item="item"
      />
    </div>
  </div>
</template>

<script>
  import HomeItem from '@/components/HomeItem.vue'

  export default {
    data() {
      return {
        items: [
          { id: 1, title: "Marketplace", route: '/marketplace', imageName: 'shop.svg' },
          { id: 2, title: "New product", route: '/product/create', imageName: 'add.svg' },
          { id: 3, title: "Profile", route: '/profile', imageName: 'man.svg' }
        ]
      }
    },
    components: {
      HomeItem
    }
  }
</script>

<style scoped>
  .home-nav-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
    min-height: 80vh;
  }
</style>
