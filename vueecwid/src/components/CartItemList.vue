<script setup>
    import { inject } from "vue";
    import CartItem from "./CartItem.vue";

    const {cartItems, onClickCart } = inject('favoriteAndCart')
    const {changeQuantity}  = inject('quantityActions')

</script>
<template>
    <div class="flex flex-col gap-4" v-auto-animate>
        <CartItem  v-for="item in cartItems" 
            :key="item.id"
            :imageURL="item.imageUrl"
            :title="item.name"
            :price= "item.price"
            :removeFromCart="() => onClickCart(item)"
            :quantity="item.quantity"
            :changeQuantity="(newQuantity) => changeQuantity(item, newQuantity)"
        />
    </div>
</template>
