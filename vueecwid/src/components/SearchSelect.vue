<script setup>
    import { reactive, watch } from "vue";

    const props = defineProps({
        fetchProducts: Function
    });
    
    const emit = defineEmits(['updateItems']);

    const filters = reactive({
        sortBy: '',
        searchQuery: ''
    });

    watch(filters, async (newFilters) => {
        const filteredItems = await props.fetchProducts(newFilters);
        emit('updateItems', filteredItems);
    });
        
    const onChangeSelect = event => {
        filters.sortBy = event.target.value; 
    };

    const onChangeSearchInput = event => {
        let debounceTimeout;
        clearTimeout(debounceTimeout); 
        if (event.target.value.length < 4) return; 
        debounceTimeout = setTimeout(() => {
            filters.searchQuery = event.target.value;
        }, 1000);
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
                    @input="onChangeSearchInput"
                    class="border border-slate-200 rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
                    placeholder="Search..."
                >
            </div>
        </div>
    </div>
</template>