<script setup>
    import { inject } from 'vue';
    import Card from "./Card.vue";
    
    const props = defineProps({
        items: Array
    })
    const { onClickFavorite, onClickCart, favoriteItems, cartItems } = inject('favoriteAndCart');


</script>
<template>
    <div class="grid grid-cols-4 gap-5" v-auto-animate>
        <Card 
            v-for="item in items"
            :key="item.id"
            :title="item.name" 
            :imageURL="item.imageUrl"
            :price="item.price"
            :isAdded="cartItems.some(cartItem => cartItem.id === item.id)"
            :isFavorite="favoriteItems.some(favItem => favItem.id === item.id)"
            :onClickFavorite="() => onClickFavorite(item)"
            :onClickAddInCart="() => onClickCart(item)"
        />
    </div>
</template>

