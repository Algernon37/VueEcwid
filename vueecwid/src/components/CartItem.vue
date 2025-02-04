<script setup>
import { ref, computed } from 'vue';


    const props = defineProps({
        imageURL: String,
        title: String,
        price: Number,
        quantity: Number,
        changeQuantity: Function, 
        removeFromCart: Function,
    });

    const price = ref(props.price);
    const finalPrice = computed(() => parseFloat((price.value * props.quantity).toFixed(2)));
    
    const addNewQuantity = (e) => {
        if (e.target.value === '0') {
            alert('Quantity must be at least 1');
            e.target.value = 1;
        }
        props.changeQuantity(Math.max(1, Number(e.target.value)));
    };

</script>


<template>
    <div class="flex items-center border border-slate-200 p-4 rounded-xl gap-4">
        <img class="w-16 h-16" :src="imageURL" :alt="title" />
        <div class="flex flex-col">
            <p>{{ title }}</p>
            <div class="flex justify-between mt-2">
                <b>€ {{ finalPrice }}</b>
                <input
                    type="number"
                    :value="quantity"
                    @input="addNewQuantity"
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
