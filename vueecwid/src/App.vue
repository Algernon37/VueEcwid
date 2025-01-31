<script setup>
    import { onMounted, ref, provide } from "vue";
    import axios from "axios";

    import HeaderComponent from "../src/components/HeaderComponent.vue";
    import CardList from "./components/CardList.vue";
    import Drawer from "./components/Drawer.vue";
    import SearchSelect from "./components/SearchSelect.vue";

    const items = ref([]);
    const drawerOpen = ref(false);
    const favoriteItems = ref(JSON.parse(localStorage.getItem('favoriteItems')) || []);
    const cartItems = ref(JSON.parse(localStorage.getItem('cartItems')) || []);

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

    const closeDrawer = () => {
        drawerOpen.value = false;
    };

    const openDrawer = () => {
        drawerOpen.value = true;
    };

    const updateItems = (newItems) => {
        items.value = newItems;
    };

    const handleItemAction = (itemId, listType) => {
        let itemsList;
        if (listType === 'favorite') {
            itemsList = favoriteItems;
        } else if (listType === 'cart') {
            itemsList = cartItems;
        }
        const index = itemsList.value.findIndex(product => product === itemId);
        if (index === -1) {
            itemsList.value.push(itemId);
        } else {
            itemsList.value.splice(index, 1);
        }
        localStorage.setItem(listType === 'favorite' ? 'favoriteItems' : 'cartItems', JSON.stringify(itemsList.value));
    };
    
    const onClickFavorite = (itemId) => handleItemAction(itemId, 'favorite');
    const onClickAdd = (itemId) => handleItemAction(itemId, 'cart');
    provide('favoriteAndCartActions', {
        onClickFavorite,
        onClickAdd,
        favoriteItems,
        cartItems
    });
    provide('cartActions', {
        openDrawer,
        closeDrawer
    });

</script>

<template>
    <div>
        <Drawer v-if="drawerOpen"/>
        <div class="bg-white w-4/5 m-auto  rounded-xl shadow-xl mt-14">
            <HeaderComponent 
                @open-drawer="openDrawer"
            />  
            <div class="p-10">
                <SearchSelect 
                    @update-items="updateItems"
                    :fetchProducts="fetchProducts"
                />
                <div class="mt-10">
                    <CardList :items="items"/>
                </div>
            </div>
        </div>
    </div>
</template>