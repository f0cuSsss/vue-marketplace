<template>
    <div class="container">
        <div class="profile">
            <div class="profile__detail">
                <h2>You are logged in as <b>{{ getUserData }}</b></h2>
                <button class="logout-btn" @click="onLogout">Logout</button>
            </div>
            <div class="cart">
                <div class="cart__image">
                    <img alt="Your cart" :src="getImage('cart.svg')" />
                </div>
                <div v-if="getProducts.length" class="product-list">
                    <div 
                        class="product" 
                        v-for="(p, index) in getProducts"
                        :key="p.id"
                    >
                        <div class="product-info">
                            <div>
                                <b class="product-info__id">{{ index + 1 }}</b>
                                <span class="product-info__title">{{ p.title }}</span>
                            </div>
                            <span class="product-info__price">{{ p.price ? p.price + ' UAH' : 'NaN' }}</span>
                        </div>
                        <div class="product-action">
                            <!-- @mouseenter="handleMouseOver" 
                                @mouseout="handleMouseOut"  -->
                            <button 
                                @click="onProductDelete(p.id)"
                            >DELETE</button>
                        </div>
                    </div>
                    <div class="cart-total">
                        <div class="cart-total__price">
                            <div>Total price: <span>{{ getTotalPrice + '   ' }}</span>UAH</div>
                        </div>
                        <div class="cart-total__order">
                            <button @click="handleOrderNow">Order now</button>
                        </div>
                    </div>
                </div>
                <div class="cart__empty" v-else>
                    <i>Empty</i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    middleware: ['auth'],
    methods: {
        // handleMouseOver({ relatedTarget }) {
        //     relatedTarget.classList.add('shadow-hover')
        // },
        //  handleMouseOut({ relatedTarget }) {
        //     let cl = relatedTarget.classList; 
        //     if(cl) {
        //         cl.remove('shadow-hover');
        //     }
        // },
        handleOrderNow() {
            alert(`To pay ${this.getTotalPrice} uah.`);
        },
        getImage(name) {
            return require('@/assets/images/' + name);
        },
        onLogout() {
            this.doLogout();
            this.$router.push('/');
        },
        ...mapActions({
            doLogout: 'user/logout',
            removeFromCart: 'cart/removeFromCart'
        }),
        onProductDelete(id) {
            if(confirm("Are you sure you want to delete this product from cart?")) {
                this.removeFromCart(id);
            }
        },
    },
    computed: {
        ...mapGetters({ 
            getProducts: 'cart/getCartProducts',
            getUserData: 'user/getUserData',
        }),
        getTotalPrice() {
            let total = 0;
            this.getProducts.forEach(p => total += parseFloat(p.price));
            return Math.round(total, 2);
        }
    }
}
</script>

<style lang="scss" scoped>
    .profile {
        background-color: rgb(238, 238, 238);
        border-radius: 4px;
        min-height: 100vh;
        margin: 15px 0;
        padding: 5px;
        position: relative;
    }

    .profile__detail {
        padding: 10px 10px 20px;
    }

    .product-list {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 15px 10px 0;
    }

    .product {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgb(189, 189, 189);
        border-radius: 5px;
        // padding: 0.5rem 10px;
        transition: all 0.2s ease-in-out;
        &.shadow-hover {
            box-shadow: 1px 0 10px 6px white;
        }
        &-info, &-action > button {
            padding: 20px;
        }

        & + & {
            margin-top: 7px;
        }
    }


    .product-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding-right: 10px;
        border-right: 1px dashed rgb(189, 189, 189);

        div {
            display: flex;
            /* justify-content: center; */
            align-items: center;
        }
    }


    .product-info__id {
        border-radius: 50%;
        background-color: rgb(12, 143, 0);
        color: #fff;
        font-size: 19px;
        width: 35px;
        height: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .product-info__title {
        font-size: 18px;
        letter-spacing: 0.5px;
        padding: 0 10px;

    }

    .product-info__price {
        color: rgb(97, 105, 20);
        font-weight: bold;
        font-size: 18px;
    }

    .product-action {
         transition: all 0.3s ease-in;
         &:hover {
            transform: rotate(-25deg);
            transition: all 0.3s ease-in;
        }    

        button {
            border: none;
            background-color: transparent;
            font-weight: bold;
            color: rgb(165, 19, 0);
            letter-spacing: 1px;
            font-size: 18px;  
        }
    }

    .cart {
        padding-top: 30px;
        border-top: 1px solid rgb(189, 189, 189);
    }

    .cart__empty {
        text-align: center;
        margin-top: 10%;

        i {
            font-size: 32px;
        }
    }

    .cart__image {
        text-align: center;
        img {
            width: 100px;
            height: 100px;
        }
    }

    .logout-btn {
        position: absolute;
        top: 7px;
        right: 7px;
        padding: 7px;
        border: none;
        border-radius: 4px;
        color: white;
        font-size: 20px;
        background-color: rgb(0, 30, 94);
        transition: box-shadow 0.15s ease-in;

        &:hover {
            box-shadow: 1px 3px 10px 2px rgb(81, 92, 255);
            transition: box-shadow 0.15s ease-in;
        }
    }
    
    .cart-total {
        display: flex;
        align-items: flex-end;
        flex-direction: column;
        padding: 20px 10px;
    }

    .cart-total__price div {
        font-size: 24px;
    }

    .cart-total__price span {
        font-size: 30px;
        color: rgb(116, 116, 16);
    }

    .cart-total__order button {
        padding: 4px;
        border: none;
        font-size: 24px;
        font-weight: bold;
        color: rgb(0, 116, 6);
        background-color: transparent;
        transition: all 0.1s ease-in;

        &:hover {
            transform: scale(1.05);
            transition: all 0.1s ease-in;
        }
    }
</style>

