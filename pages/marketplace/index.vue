<template>
    <div class="container">
        <div class="marketplace-layout" >
            <Search @handleSearchSubmit="handleSearchSubmit" />
            <div v-if="searchedProducts" class="product-list">
                <Product 
                    v-for="p in searchedProducts"
                    :key="p.id"
                    :product="p"
                />
            </div>
            <div v-else>
                <h1>No products</h1>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions, mapMutations } from 'vuex'

    import Product from '@/components/Product.vue'
    import Search from '@/components/Search.vue'

    export default {
        async fetch() {
            if(!this.isRedirectBack) {
                await this.fetchProducts();
            }
        },
        data() {
            return {
                searchValue: '',
                searchedProducts: [],
                 headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
          { text: 'sdasgjhd', value: 'emaill' },
        ],
        desserts: [
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
            emaill: 'myemail.com'
          },
        ],
            }
        },
        mounted() {
            // gsap.to(window, {duration: 2, scrollTo: 400});
            this.searchedProducts = this.getProductsByName();

            if(this.isRedirectBack) {
                let offset = localStorage.getItem('marketplace-offset');
                setTimeout(() => {
                     window.scrollTo(0, offset)
                }, 0)
                this.setIsRedirectBack(false);
            }
        },
        computed: {
            ...mapGetters({
                // getProducts: 'product/getProducts',
                isRedirectBack: 'product/isRedirectBack',
                getProductsByName: 'product/getProductsByName'
            })
        },
        components: {
            Product, Search
        },
        methods: {
            ...mapMutations({ setIsRedirectBack: 'product/setIsRedirectBack' }),
            ...mapActions({
                fetchProducts: 'product/fetchProducts',
                fetchTest: 'product/fetchTest'
            }),
            handleSearchSubmit(value) {
                this.searchValue = value;
            }
        },
        watch: {
            searchValue() {
                this.searchedProducts = this.getProductsByName(this.searchValue);
            }
        }
    }
</script>

<style scoped>
    .marketplace-layout {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .product-list {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 20px;
        padding-bottom: 30px;

        /* display: flex;
        flex-wrap: wrap;
        margin-left: -30px;
        margin-right: -30px; */
    }

    .title {
        font-family:
            'Quicksand',
            'Source Sans Pro',
            -apple-system,
            BlinkMacSystemFont,
            'Segoe UI',
            Roboto,
            'Helvetica Neue',
            Arial,
            sans-serif;
        display: block;
        font-weight: 300;
        font-size: 65px;
        color: #35495e;
        letter-spacing: 1px;
    }
</style>