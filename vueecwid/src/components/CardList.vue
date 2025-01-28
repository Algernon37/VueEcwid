<script setup>
    import Card from "./Card.vue";

    import axios from "axios";
    import { ref } from "vue";
    
    defineProps({
        items: Array
    })
    const favoriteItems = ref(JSON.parse(localStorage.getItem('favoriteItems')) || []);
    
    const cartItems = ref(JSON.parse(localStorage.getItem('CartItems')) || []);
    const handleItemAction = (item, listType) => {
        let itemsList;
        if (listType === 'favorite') {
            itemsList = favoriteItems;
        } else if (listType === 'cart') {
            itemsList = cartItems;
        }
        const index = itemsList.value.findIndex(product => product === item.id);
        if (index === -1) {
            itemsList.value.push(item.id);
        } else {
            itemsList.value.splice(index, 1);
        }
        localStorage.setItem(listType === 'favorite' ? 'favoriteItems' : 'cartItems', JSON.stringify(itemsList.value));
    };

    const onClickFavorite = (item) => handleItemAction(item, 'favorite');
    const onClickAdd = (item) => handleItemAction(item, 'cart');

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
            :onClickAdd="() => onClickAdd(item)"
            :onClickFavorite="() => onClickFavorite(item)"
        />
    </div>
</template>

