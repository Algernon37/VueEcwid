/* eslint-disable */
<script setup>
    import Card from "./Card.vue";

    
</script>
<template>
        <div class="p-10">
        <h2 class="text-3xl font-bold mb-8">All items</h2>
        <div class="grid grid-cols-4 gap-5">
            <Card 
                title="Кроссы" 
                image-url=""
                :price="12900"
                :isAdded="true"
                :isFavorite="false"
                :onClickAdd=""
                :onClickFavorite=""
            />
        </div>
    </div>
</template>