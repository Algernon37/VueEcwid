<script setup>
   import CardList from "../components/CardList.vue";
   import SearchSelect from "../components/SearchSelect.vue";
   import { ref } from "vue";
   import { onMounted } from "vue";

   import axios from "axios";

   const items = ref([]);
    onMounted(async () => {
        items.value = await fetchProducts();  
    });

    const fetchProducts = async (filters = {}) => {
        try {
            const options = {
                method: 'GET',
                url: 'https://app.ecwid.com/api/v3/108362264/products',
                headers: {
                    'Authorization': 'Bearer public_RiNvjTVVzKLhFNWyzR5fNY68u1GMHLEs',
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                params: {
                    sortBy: filters.sortBy,          
                    keyword: filters.searchQuery,   
                    enabled: true,  
                    limit: 100  
                }
            };
            const response = await axios(options);
            return response.data.items;
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            return [];
        }
    };

    const updateItems = (newItems) => {
        items.value = newItems;
    };

</script>

<template>
    <div>
        <SearchSelect 
            @update-items="updateItems"
            :fetch-products="fetchProducts"
        />
        <div class="mt-10">
            <CardList :items="items"/>
        </div>
    </div>
</template>
    
