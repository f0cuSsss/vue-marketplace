<template>
    <div class="container">
        <div class="product-detail">

            <div class="back-btn" @click="handleBackBtn" >
                <img alt="Back" src="@/assets/images/back.svg" />
            </div>

            <div class="product-detail__top-info">
                <div class="image-slider">
                    <img v-if="product.image" :alt="product.title" :src="product.image" />
                    <img v-else :alt="product.title" src="@/assets/images/no-image.png" />
                </div>
                <div class="product-detail__owner-info">
                    <div class="owner-info__top">
                        <div class="profile_image">
                            <img v-if="owner.image" alt="Profile image" :src="owner.image" />
                            <img v-else alt="Profile image" src="@/assets/images/profile_no-image.svg" />
                        </div>
                        <h5>{{ owner.name }}</h5>
                    </div>
                    <div class="owner-info__content">
                        <p>Username: {{ owner.username }}</p>
                        <p>Email: {{ owner.email }}</p>
                        <p>Phone: {{ owner.phone }}</p>
                    </div>
                </div>
            </div>
            <div class="product-detail__content">
               <div class="product-detail__top">
                   <i>23 February 2020</i>
                   <div v-if="userIsLoggedIn" class="product__actions">
                        <div class="action__item">
                            <button @click="addToCart" class="button-cart">
                                <img v-if="isProductInCart(product.id)" alt="Remove from cart" :src="getImage('InCart.svg')"/>
                                <img v-else alt="Add to card" :src="getImage('cartAdd.svg')"/>
                            </button>
                        </div>
                        <div class="action__item">
                            <button @click="buyProduct" class="button-buy">BUY</button>
                        </div>
                    </div>
                    <div v-else>
                        <h3><nuxt-link :to="`/login?frompage=product-${product.id}`">Log in</nuxt-link> for all access</h3>
                    </div>
                   <h4 class="product__price">{{ product.price ? product.price + ' UAH' : 'NaN :(' }}</h4>
               </div>
               <div class="product-detail__bottom">
                   <div class="product__description">
                       <div class="product__description-text">
                           <h3 class="content__title">Description</h3>
                           <p>{{ product.body }}</p>
                       </div>
                        <div class="product__description-characteristics">
                            <h3 class="content__title">Characteristics</h3>
                            <div class="characteristics-table-block">
                                <table class="characteristics-table">
                                    <tbody>
                                        <tr>
                                            <td>Name</td>
                                            <td>Value</td>
                                        </tr>
                                            <tr>
                                            <td>Name</td>
                                            <td>Value</td>
                                        </tr>
                                            <tr>
                                            <td>Name</td>
                                            <td>Value</td>
                                        </tr>
                                        <tr>
                                            <td>Name</td>
                                            <td>Value</td>
                                        </tr>
                                        <tr>
                                            <td>Name</td>
                                            <td>Value</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                   </div>
                   <div class="recommend-product-list">
                       <h3 class="content__title">Recommends for you</h3>
                       <div class="product-list">
                            <Product 
                                v-for="(p) in getRecommendedProducts"
                                :key="p.id"
                                :product="p"
                            />
                        </div>
                   </div>
               </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
    data() {
        return {
            product: Object,
            owner: Object,
            recommendedProducts: [Object]
        }
    },
    validate({ params }){
        return /^\d+$/.test(params.id);
    },
    methods: {
        ...mapMutations({ setIsRedirectBack: 'product/setIsRedirectBack' }),
        ...mapGetters({ 
            getProductById: 'product/getProductById'
        }),
        ...mapActions({ 
            fetchRecommendedProducts: 'product/fetchRecommendedProducts',
            addProductToCart: 'cart/addToCart'
        }),
        addToCart() {
            // Use middleware 
            this.addProductToCart(this.product);
        },
        buyProduct() {
            alert("Вы купили данный товар! :))");
        },
        getImage(path) {
            return require('@/assets/images/' + path);
        },
        handleBackBtn() {
            this.setIsRedirectBack(true);
            this.$router.push('/marketplace');
        }
    },
    computed: {
        ...mapGetters({ 
            getRecommendedProducts: 'product/getRecommendedProducts',
            isProductInCart: 'cart/isProductInCart',
            userIsLoggedIn: 'user/userIsLoggedIn'
        })
    },
    async mounted() {
        let existProduct = this.getProductById()(this.$route.params.id);

        if(!existProduct) {
            const responseProduct = await this.$axios.get(`https://jsonplaceholder.typicode.com/posts?id=${this.$route.params.id}`);
            existProduct = responseProduct.data[0];
        }
        this.product = existProduct;
        
        const responseOwner = await this.$axios.get(`https://jsonplaceholder.typicode.com/users?id=${this.product.userId}`);
        this.owner = responseOwner.data[0];

        await this.fetchRecommendedProducts();
    }
}
</script>

<style>
    .content__title {
        color: rgb(77, 71, 71);
        margin-left: 10px;
        font-size: 24px;
        align-self: left;
    }
</style>


<style lang="scss" scoped>

    .back-btn {
        position: fixed;
        top: 100px;
        left: 20px;
        cursor: pointer;

        img {
            width: 100px;
            height: 100px;
        }
    }

    .product-detail {
        background-color: rgb(238, 238, 238);
        border-radius: 4px;
        box-shadow: 1px 0 6px 1px rgb(153, 153, 153);
        margin: 15px 0;
        height: auto;

        position: relative;
    }

    .product-detail__top-info {
        display: flex;
        height: 500px;
        border-bottom: 1px solid rgb(211, 211, 211);
    }

    .image-slider {
        background-color: rgb(54, 54, 54);
        border-radius: 2px;
        width: 70%;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;

        img {
            max-height: 90%;
            max-width: 90%;
            border-radius: 4px;
        }
    }

    .product-detail__owner-info {
        border-left: 1px solid rgb(211, 211, 211);
        width: 30%;
        padding: 20px 10px 0;
        overflow: hidden;
    }

    .owner-info__top {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .product-detail__content {
        padding: 10px;
    }

    .profile_image {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 1px solid rgb(139, 139, 139);
    }

    .profile_image img {
        width: 100%;
    }

    .product__actions {
        display: flex;
        margin: 5px 0;
    }

    .action__item {

        button {
            border: none;
            font-weight: bold;
            font-size: 18px;
            transition: all .3s ease-in-out;

            :hover {
                transform: scale(1.05);
                transition: all .3s ease-in-out;
            }
        }

        & + & {
            margin-left: 50px;
        }
    }

    .button-cart {
        color: rgb(141, 141, 13);
        img {
            width: 40px;
        }
    }


    .button-buy {
        color: rgb(0, 56, 129);
        padding: 5px 15px;
        background-color: rgb(218, 185, 0);
        border-radius: 5px;
    }

    .product-detail__top {
        display: flex;
        justify-content: space-between;
        padding: 0px 10px;
        border-bottom: 1px solid rgb(211, 211, 211);

        i {
            font-size: 14px;
        }
    }

    .product__price {
        font-size: 20px;
        color: #32383d;
    }

    .product__description {
        
    }

    .product__description-text {
        padding-top: 15px;
    }

    .product__description-characteristics {

    }

    .characteristics-table-block {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .characteristics-table {
        width: 90%;
        margin-bottom: 15px;

        tr {
            border-bottom: 1px solid rgb(211, 211, 211);
            td {
                padding: 4px;
                &:first-child {
                    border-right: 1px dashed rgb(211, 211, 211);
                }
            }
        }
    }

    .product-list {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-column-gap: 15px;
        margin-top: 15px;
    }

</style>