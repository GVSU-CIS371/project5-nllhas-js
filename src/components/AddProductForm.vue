<template>
    <v-form ref="form" @submit.prevent="submitForm">
        <v-text-field v-model="newProduct.name" label="Product Name" required></v-text-field>
        <v-textarea v-model="newProduct.description" label="Description" required></v-textarea>
        <v-text-field v-model="newProduct.image" label="Image URL" required></v-text-field>
        <v-text-field v-model.number="newProduct.price" label="Price" type="number" required></v-text-field>
        <v-slider v-model="newProduct.rating" :max="5" :min="0" step="0.1" label="Rating"></v-slider>
        <v-text-field v-model.number="newProduct.stock" label="Stock" type="number" required></v-text-field>
        <v-select v-model="newProduct.category" :items="categories" label="Category" required></v-select>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="submitForm">
                Submit new product
            </v-btn>
            <v-btn color="red darken-1" text @click="close">
                Exit
            </v-btn>
        </v-card-actions>
    </v-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useProductStore } from '../stores/ProductStore';
import type { Product } from '../types/product';

const productStore = useProductStore();
const form = ref();

const newProduct = ref<Product>({
    name: '',
    description: '',
    price: 0,
    rating: 0,
    stock: 0,
    image: '',
    category: '',
});

const categories = ['Electronics', 'Clothing', 'Groceries',];

const submitForm = async () => {
    if (form.value && form.value.validate()) {
        await productStore.createProduct(newProduct.value);
        close();
    }
};

const close = () => {
    newProduct.value = {
        name: '',
        description: '',
        price: 0,
        rating: 0,
        stock: 0,
        image: '',
        category: '',
    };
    emit('close');
};

const emit = defineEmits(['close']);
</script>
