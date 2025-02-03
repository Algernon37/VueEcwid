<script setup>
    import { onMounted, ref, provide, computed } from "vue";
    import axios from "axios";

    import HeaderComponent from "../src/components/HeaderComponent.vue";
    import CardList from "./components/CardList.vue";
    import Drawer from "./components/Drawer.vue";
    import SearchSelect from "./components/SearchSelect.vue";

    const items = ref([]);
    const drawerOpen = ref(false);

    const favoriteItems = ref(JSON.parse(localStorage.getItem('favoriteItems')) || []);
    const cartItems = ref(JSON.parse(localStorage.getItem('cartItems')) || []);
    
    const totalPrice = computed(() => parseFloat(cartItems.value.reduce((acc, item) => acc + item.price, 0).toFixed(2)));
    const vatPrice = computed(() => parseFloat((totalPrice.value * 0.05).toFixed(2)));

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

    const createOrder = async () => {
        try {
            const options = {
                method: 'POST',
                url: 'https://app.ecwid.com/api/v3/108362264/orders',
                headers: {
                    'Authorization': 'Bearer public_RiNvjTVVzKLhFNWyzR5fNY68u1GMHLEs',
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                params: {
                    items: cartItems,          
                    totalPrice: totalPrice.value, 
                }
            };
            const response = await axios(options);
            cartItems.value = [];
            return response.data;
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            return [];
        }
    };

    const updateItems = (newItems) => {
        items.value = newItems;
    };

    const handleItemAction = (item, listType) => {
        let itemsList;
        if (listType === 'favorite') {
            itemsList = favoriteItems;
        } else if (listType === 'cart') {
            itemsList = cartItems;
        }
        const index = itemsList.value.findIndex(product => product.id === item.id);
        if (index === -1) {
            itemsList.value.push(item);
        } else {
            itemsList.value.splice(index, 1);
        }
        localStorage.setItem(listType === 'favorite' ? 'favoriteItems' : 'cartItems', JSON.stringify(itemsList.value));
    };
    
    const onClickFavorite = (item) => handleItemAction(item, 'favorite');
    const onClickCart = (item) => handleItemAction(item, 'cart');
    
    provide('favoriteAndCart', {
        onClickFavorite,
        onClickCart,
        favoriteItems,
        cartItems,
        closeDrawer
    });

</script>

<template>
    <div>
        <Drawer 
            v-if="drawerOpen"
            :total-price="totalPrice"
            :vat-price="vatPrice"
        />
        <div class="bg-white w-4/5 m-auto  rounded-xl shadow-xl mt-14">
            <HeaderComponent 
                :total-price="totalPrice"
                @open-drawer="openDrawer"
            />  
            <div class="p-10">
                <SearchSelect 
                    @update-items="updateItems"
                    :fetch-products="fetchProducts"
                />
                <div class="mt-10">
                    <CardList :items="items"/>
                </div>
            </div>
        </div>
    </div>
</template>