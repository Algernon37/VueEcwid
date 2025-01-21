<script setup>
    import { onMounted, ref } from "vue";
    import axios from "axios";

    import HeaderComponent from "../src/components/HeaderComponent.vue";
    import CardList from "./components/CardList.vue";
    import Drawer from "./components/Drawer.vue";
    import SearchSelect from "./components/SearchSelect.vue";

    const items = ref([]);

    onMounted(async () => {
        try{
            const {data} = await axios.get('https://app.ecwid.com/api/v3/108362264/products', 
            {headers: {'Authorization': 'Bearer public_RiNvjTVVzKLhFNWyzR5fNY68u1GMHLEs'}})
            items.value = data.items;
        } catch (error) {
            console.error(error);
        }   
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
                    :items="items"
                    @update:items="updateItems"
                />
                <div class="mt-10">
                    <CardList :items="items"/>
                </div>
            </div>
        </div>
    </div>
</template>
