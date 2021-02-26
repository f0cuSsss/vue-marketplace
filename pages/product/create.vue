<template>
    <div class="bg-container">
        <div class="container">
            <div class="product-create">
                <div class="product-create__info">
                    <h1>Create a product</h1>
                    <h4>with detailed properties</h4>
                </div>
                <div class="product-create__main">
                    <v-form class="product-create__form">
                        <v-text-field
                            dark
                            clearable
                            v-model="title"
                            :error-messages="titleErrors"
                            :counter="10"
                            label="Title"
                            required
                            inverted
                            @input="$v.title.$touch()"
                        ></v-text-field>
                        
                        <v-textarea
                            dark
                            clearable
                            :counter="500"
                            required
                            label="Description"
                            :rules="rules"
                            :value="value"
                        ></v-textarea>


                        <v-text-field
                            dark
                            type="number"
                            default="0"
                        >
                            <v-icon
                                slot="prepend"
                                color="green"
                            >mdi-minus</v-icon>
                        </v-text-field>


                        <div 
                            class="characteristics-list"
                        >
                            <CharacteristicItem />
                        </div>


<!-- prepend-icon="mdi-camera" -->
                        <v-file-input
                            dark
                            show-size
                            counter
                            multiple
                            accept="image/png, image/jpeg, image/bmp"
                            label="Images"
                        ></v-file-input>

                        <v-btn
                            class="mr-4"
                            @click.prevent="cancel"
                        >
                            Cancel
                        </v-btn>

                        <v-btn
                            class="mr-4"
                            @click="submit"
                        >
                            Create a product
                        </v-btn>
                    </v-form>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'

export default {
    mixins: [validationMixin],
    validations: {
      title: { required },
      description: { required }
    },
    layout: 'create',
    middleware: ['auth'],
    data() {
        return {
            fields: [
                { name: 'text', disabled: true},
                { name: 'text' },
                { name: 'numb' }
            ],
            title: '',
            description: '',
            characteristics: [],
            price: 0,
            imageUrl: '',
            created: Date.now()
        }
    },
    computed: {
        titleErrors () {
            const errors = []
            fields.push({ name: 'kakoito',disabled })
            if (!this.$v.title.$dirty) return errors
            !this.$v.title.required && errors.push('Title is required.')
            return errors
        }
    },
    methods: {
        onCreateProductSubmit() {
            console.log("Product is creating...");
            this.$v.$touch();
        },
        submit () {
            // default image path: @/assets/images/no-image.png

            this.$v.$touch()
        },
        cancel() {
            this.$router.push('/');
        }
    }
}
</script>

<style lang="scss" scoped>
    .bg-container {
        // background: linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ), url('@/assets/images/create-fon.png');
        background: url('@/assets/images/bg-create.png');
        
    }

    .product-create {
        // background-color: rgb(238, 238, 238);
        color: white;
        margin: 15px 0;
        min-height: 90vh;
        height: auto;
        padding: 15px;
    }

    .product-create__info {
        text-align: center;
        h1 {
            letter-spacing: 2px;
            font-weight: bold;
        }
    }

    .product-create__main {
        padding-top: 25px;
        max-width: 800px;
        margin: 0 auto;
    }
</style>