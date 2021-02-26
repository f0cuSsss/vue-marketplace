<template>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container">
                <div class="container-fluid">
                    <nuxt-link class="navbar-brand" to="/">Marketplace</nuxt-link>

                    <div class="collapse navbar-collapse">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <nuxt-link exact no-prefetch active-class="active" class="nav-link" aria-current="page" to="/product/create">Add product</nuxt-link>
                            </li>
                            <li class="nav-item">
                                <nuxt-link active-class="active" class="nav-link" to="/profile">Profile</nuxt-link>
                            </li>
                        </ul>
                    </div>
                </div>
        </div>
    </nav>
</template>