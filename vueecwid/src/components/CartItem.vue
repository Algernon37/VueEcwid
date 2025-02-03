<script setup>
    const props = defineProps({
        imageURL: String,
        title: String,
        price: Number,
        removeFromCart: Function,
        quantity: Number
    });
    

</script>


<template>
    <div class="flex items-center border border-slate-200 p-4 rounded-xl gap-4">
        <img class="w-16 h-16" :src="imageURL" :alt="title">
        <div class="flex flex-col">
            <p>{{ title }}</p>
            <div class="flex justify-between mt-2">
                <b>€ {{ price }}</b>
                <input
                    type="number"
                    min="0" 
                    step="1"
                    class="border border-slate-200 rounded-md py-2 pl-3 w-12 h-5 outline-none focus:border-gray-400"
                    placeholder="1"
                >
                <img class="opacity-40 hover:opacity-100 cursor-pointer transition" @click="removeFromCart" src="/close.svg" />
            </div>
        </div>
    </div>
</template>
