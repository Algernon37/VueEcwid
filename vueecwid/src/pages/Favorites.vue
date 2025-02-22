<script setup>
    import Card from '../components/Card.vue';
    import InfoBlock from '../components/InfoBlock.vue';
    import { inject,computed } from 'vue';

    const { onClickFavorite, onClickCart, favoriteItems, cartItems } = inject('favoriteAndCart');
    const favoritesIsEmpty = computed(() => favoriteItems.value.length === 0);

</script>

<template>
    <div class="flex flex-col gap-10">
        <h1 class="text-3xl font-bold mb-8">My favorite</h1>
        <div v-if="favoritesIsEmpty">
            <InfoBlock 
                title="You don't have any favorite items"
                description="Add products to your favorite list to see them here"
                imageUrl="/emoji-1.png"
            />
            </div>
        <div v-if="favoriteItems" class="grid grid-cols-4 gap-5" v-auto-animate>
            <Card 
                v-for="item in favoriteItems"
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
    </div>
</template>
    
