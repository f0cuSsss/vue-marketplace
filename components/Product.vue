

<template>
    <div @click="handleProductClick(product.id)" class="product">
        <img class="product__image" :src="product.image" :alt="product.title" />
        <div class="product__body">
            <h5 class="product__title">{{ product.title }}</h5>
            <div class="product__characteristics">
                <table>
                    <tbody>
                        <tr 
                            v-for="ch of product.characteristics"
                            :key="ch.id"
                        >
                            <td>{{ ch.name }}</td>
                            <td>{{ ch.value }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p class="product__price">{{ product.price }} UAH</p>
        </div>
    </div>
</template>


<script>
export default {
    props: {
        product: Object
    },
    methods: {
        handleProductClick(productId) {
            localStorage.setItem('marketplace-offset', window.pageYOffset);
            // console.log(window.pageYOffset);
            this.$router.push(`/product/${productId}`);
        }
    }
    
}
</script>

<style scoped>
    .product {
        height: 400px;
        /** background-color: rgb(241, 241, 241); */
        text-decoration: none;
        background-color: rgb(33, 37, 41);
        color: white;
        
        /* margin-left: 15px;
        margin-right: 15px;
        margin-bottom: 16px;
        width: calc(25% - 30px); */
        
        border: 1px solid rgb(105, 105, 105);
        box-shadow: 0 1px 8px 2px #6b6b6b;
        border-radius: 5px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        position: relative;
        transition: transform 0.3s ease;
        cursor: pointer;
    }

    .product:hover {
        transform: translateY(-5px);
        transition: transform 0.3s ease;
        
    }

    @media (max-width: 1200px) {
        .product {
            flex: 0 1 32.333%;
        }
    }

    .product__image {
        text-align: center;
        height: 50%;
        width: 100%;
        object-fit: cover;
    }

    .product__body {
        padding: 15px 5px 0;
        height: 50%;
        display: flex;
        flex-direction: column;
    }

    .product__title {
        white-space: pre;
        text-overflow: ellipsis;
        font-weight: bold;
        overflow: hidden;
        padding: 0 5px;
        font-size: 18px; 
    }

    .product__title::first-letter {
        text-transform: uppercase;
    }

    .product__price {
        position: absolute;
        bottom: -7px;
        right: 12px;
        font-weight: bold;
        color: rgb(43, 189, 43);
    }

    .product__characteristics {
        margin-top: 5px;
    }

    .product__characteristics table {
        table-layout: fixed;
        width: 100%;
    }

    .product__characteristics table tr {
        border-bottom: 1px solid rgb(180, 180, 180);

    }

    .product__characteristics table tr td {
        white-space: nowrap;
        text-align: center;
        padding: 0 3px;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .product__characteristics table tr td:first-child {
        width: 30%;
        border-right: 1px dashed rgb(160, 160, 160);;
    }

</style>