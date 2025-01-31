<script setup>
    import { inject } from 'vue';
    import Card from "./Card.vue";
    
    const props = defineProps({
        items: Array
    })
    const { onClickFavorite, onClickAdd, favoriteItems, cartItems } = inject('favoriteAndCartActions');

</script>
<template>
    <div class="grid grid-cols-4 gap-5">
        <Card 
            v-for="item in items"
            :key="item.id"
            :title="item.name" 
            :imageURL="item.imageUrl"
            :price="item.price"
            :isAdded="cartItems.includes(item.id)"
            :isFavorite="favoriteItems.includes(item.id)"
            :onClickFavorite="() => onClickFavorite(item.id)"
            :onClickAddInCart="() => onClickAdd(item.id)"
        />
    </div>
</template>

