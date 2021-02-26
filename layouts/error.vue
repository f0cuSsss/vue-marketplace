<template>
    <section>
        <h1>Page not found</h1>

        <nuxt-link class="link" to="/">Go to menu</nuxt-link>
    </section>
</template>

<style scoped>
    section {
        width: 100vw;
        height: 100vh;
        background-color: rgb(233, 233, 233);
        padding: 7rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    h1 {
        color: rgb(231, 0, 0);
        font-size: 5rem;
        letter-spacing: 3px;

    }
    .link  {
        font-size: 25px;
        margin-top: 30px;
    }
</style>