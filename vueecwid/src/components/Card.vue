<script setup>

    const props = defineProps({
        imageURL: String,
        title: String,
        price: Number,
        isFavorite: Boolean,
        isAdded: Boolean,
        onClickFavorite: Function,
        onClickAddInCart: Function,
    })

</script>
<template>
    <div class="relative bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer hover:-translate-y-2 hover:shadow-xl transition">
        <img @click="onClickFavorite" :src="isFavorite ? '/like-1.svg' : '/like-2.svg'" class="absolute top-0 left-0" alt="like" />
        <img :src="imageURL" alt="item" />
        <p class="mt-2">{{ title }}</p>
        <div class="flex justify-between mt-5">
            <div class="flex flex-col">
                <span class="text-slate-400">Price:</span>
                <b>€ {{ price }}</b>
            </div>
            <img @click="onClickAddInCart" :src="isAdded ? '/checked.svg' : '/plus.svg'" alt="plus" />
        </div>
    </div>
</template>