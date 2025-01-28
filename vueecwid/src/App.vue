<script setup>
    import { onMounted, ref } from "vue";
    import axios from "axios";

    import HeaderComponent from "../src/components/HeaderComponent.vue";
    import CardList from "./components/CardList.vue";
    import Drawer from "./components/Drawer.vue";
    import SearchSelect from "./components/SearchSelect.vue";

    const items = ref([]);

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

    onMounted(async () => {
        items.value = await fetchProducts();  
    });

    const updateItems = (newItems) => {
        items.value = newItems;
    };
</script>

<template>
    <div>
        <!-- <Drawer /> -->
        <div class="bg-white w-4/5 m-auto  rounded-xl shadow-xl mt-14">
            <HeaderComponent />  
            <div class="p-10">
                <SearchSelect 
                    @update:items="updateItems"
                    :fetchProducts="fetchProducts"
                />
                <div class="mt-10">
                    <CardList :items="items"/>
                </div>
            </div>
        </div>
    </div>
</template>