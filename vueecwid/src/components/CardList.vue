<script setup>
    import Card from "./Card.vue";
    defineProps({
        items: Array
    })
</script>
<template>
    <div class="grid grid-cols-4 gap-5">
        <Card 
            v-for="item in items"
            :key="item.id"
            :title="item.name" 
            :imageURL="item.imageUrl"
            :price="item.price"
            :isAdded="false"
            :isFavorite="false"
            :onClickAdd="onClickAdd"
        />
    </div>
</template>

