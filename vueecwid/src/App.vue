<script setup>
    import { ref, provide, computed } from "vue";
    import HeaderComponent from "../src/components/HeaderComponent.vue";
    import Drawer from "./components/Drawer.vue";

    /* Избранное  (START) */ 
    const favoriteItems = ref(JSON.parse(localStorage.getItem('favoriteItems')) || []);
    const onClickFavorite = (item) => handleItemAction(item, 'favorite');
    /* Избранное  (END) */ 
    
    /* Корзина (START) */ 
    const drawerOpen = ref(false);
    
    const cartItems = ref(JSON.parse(localStorage.getItem('cartItems')) || []);
    const onClickCart = (item) => handleItemAction(item, 'cart');
    const totalPrice = computed(() => parseFloat(cartItems.value.reduce((acc, item) => acc + item.price*item.quantity, 0).toFixed(2)));

    const closeDrawer = () => {
        drawerOpen.value = false;
    };

    const openDrawer = () => {
        drawerOpen.value = true;
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
            if (listType === 'cart') {
                item.quantity = 1;
            }
            itemsList.value.push(item);
        } else {
            itemsList.value.splice(index, 1);
        }
        localStorage.setItem(listType === 'favorite' ? 'favoriteItems' : 'cartItems', JSON.stringify(itemsList.value));
    };

    const changeQuantity = (item, newQuantity) => {
        item.quantity = newQuantity;
    };
    /* Корзина (END) */ 

    provide('favoriteAndCart', {
        onClickFavorite,
        onClickCart,
        favoriteItems,
        cartItems,
        closeDrawer
    });

    provide('quantityActions', {
        changeQuantity
    });

</script>

<template>
    <div>
        <Drawer 
            v-if="drawerOpen"
            :total-price="totalPrice"
        />
        <div class="bg-white w-4/5 m-auto  rounded-xl shadow-xl mt-14">
            <HeaderComponent 
                :total-price="totalPrice"
                @open-drawer="openDrawer"
            />  
            <div class="p-10">
                <router-view>
                </router-view>
            </div>
        </div>
    </div>
</template>