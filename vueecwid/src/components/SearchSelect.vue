<script setup>
import { reactive, watch } from "vue";
import axios from "axios";

defineProps({
    items: Array
});

const emit = defineEmits(['update:items']);

const filters = reactive({
    sortBy: '',
    searchQuery: ''
});

watch(filters, async (newFilters) => {
    const options = {
        method: 'GET',
        url: 'https://app.ecwid.com/api/v3/108362264/products', 
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer public_RiNvjTVVzKLhFNWyzR5fNY68u1GMHLEs',
            'Content-Type': 'application/json'
        },
        params: {
            sortBy: newFilters.sortBy,          
            keywords: newFilters.searchQuery.trim().toLowerCase(),   
            enabled: true,  
            limit: 100                           
        }
    };
    try {
        const response = await axios(options);
        const filteredItems = response.data.items.filter(item => 
            item.name.toLowerCase().includes(newFilters.searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(newFilters.searchQuery.toLowerCase())
        );
        emit('update:items', filteredItems);
    } catch (error) {
        console.error('Error:', error.response?.data || error.message); 
    }
});

const onChangeSelect = event => {
    filters.sortBy = event.target.value; 
};

</script>

<template>
    <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold mb-8">All items</h2>
        <div class="flex gap-4">
            <select @change="onChangeSelect" class="py-2 px-3 border rounded-md outline-none">
                <option value="NAME_ASC">By name (A-Z)</option>
                <option value="NAME_DESC">By name (Z-A)</option>
                <option value="PRICE_ASC">By price (low to high)</option>
                <option value="PRICE_DESC">By price (high to low)</option>
            </select>
            <div class="relative">
                <img class="absolute left-4 top-3" src="/search.svg">
                <input
                    v-model="filters.searchQuery"
                    class="border border-slate-200 rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
                    placeholder="Search..."
                >
            </div>
        </div>
    </div>
</template>