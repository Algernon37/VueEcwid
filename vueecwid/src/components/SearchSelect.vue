<script setup>
    import { ref, watch } from "vue";
    import axios from "axios";

    defineProps({
        items: Array
    })

    const emit = defineEmits(['update:items']);

    const sortBy = ref('');
    const searchQuery = ref('');

    watch(sortBy,async() => {
        try{
            const {data} = await axios.post('https://app.ecwid.com/api/v3/108362264/products', 
            {headers: {
                'Authorization': 'Bearer public_RiNvjTVVzKLhFNWyzR5fNY68u1GMHLEs',
                'Content-Type': 'application/json;charset=utf-8',
            },
            params:{
                'enabled':'true',
                'filterFacetLimit':'200',
                'sortBy': sortBy.value,
                'includeProductsFromSubcategories':'true',
                'lang':'en'
                }
            })
            emit('update:items', data.items);
        } catch (error) {
            console.error(error);
        }  
    });

    const onChangeSelect = event => {
        sortBy.value = event.target.value;
    } 

</script>

<template>
    <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold mb-8">All items</h2>
        <div class="flex gap-4">
            <select @change="onChangeSelect" class=" py-2 px-3 border rounded-md outline-none">
                <option value="name">By name</option>
                <option value="price">By price (low)</option>
                <option value="-price">By price (high)</option>
            </select>
            <div class="relative">
                <img class="absolute left-4 top-3" src="/search.svg">
                <input
                    class="border border-slate-200 rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
                    placeholder="Search..."
                >
            </div>
        </div>
    </div>
</template>