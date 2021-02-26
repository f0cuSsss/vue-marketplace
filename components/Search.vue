<template>
  <form class="search-form">
    <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Product name" aria-label="Product name" aria-describedby="basic-addon2" v-model="searchValue">
        <div class="input-group-append">
            <button class="btn btn-primary" @click.prevent="onSearchSubmit">Search</button>
        </div>
    </div>
  </form>
</template>

<script>
import _ from 'lodash'

export default {
    data() {
        return {
            searchValue: ''
        }
    },
    methods: {
        onSearchSubmit() {
            this.$emit('handleSearchSubmit', this.searchValue)
        }
    },
    watch: {
        searchValue() {
            // USE LODASH DEBOUNCE
            this.$emit('handleSearchSubmit', this.searchValue)
        }
    }
}
</script>

<style scoped>
    .search-form {
        padding: 25px 0 !important;
        width: 100%;
        padding: 5px;
    }



</style>