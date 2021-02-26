<template>
    <div class="home-item" @click="itemClick">
        <img 
            :alt="item.title"
            :src="getImage(item.imageName)"
        />
        <div class="home-item__title">{{ item.title }}</div>
    </div>
</template>

<script>
    export default {
        props: {
            item: Object
        },
        methods: {
            itemClick() {
                this.$router.push(this.item.route);
            },
            getImage(name) {
                return require('../assets/images/' + name);
            }
        }
    }
</script>

<style scoped>
    .home-item {
        background-color: rgb(52, 58, 64);;
        border: 1px solid rgb(0, 103, 110);
        box-shadow: 0px 0 15px 1px rgb(206, 206, 206);
        border-radius: 4px;
        cursor: pointer;
        width: 250px;
        height: 250px;
        flex: 0 0 auto;
        transition: all 0.3s ease;
        margin: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        overflow: hidden;
    }
    
    .home-item:hover {
        transform: scale(1.05);
        transition: all 0.3s ease;
        box-shadow: 3px 7px 10px 3px rgb(206, 206, 206);
    }

    .home-item__title {
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
        font-size: 24px;
        color: rgb(235, 235, 235);
        letter-spacing: 1px;
    }

    img {
        width: 150px;
        height: 150px;
        z-index: 99;
    }
</style>