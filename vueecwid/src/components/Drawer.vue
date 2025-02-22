<script setup>
    import { ref, computed,inject } from "vue";
    import axios from "axios";
    import CardItemList from './CartItemList.vue';
    import DrawerHeader from './DrawerHeader.vue';
    import InfoBlock from './InfoBlock.vue';

    const props = defineProps({
        totalPrice: Number,
    })
    const {cartItems}  = inject('favoriteAndCart');

    const isCreativeOrder = ref(false);
    const orderId = ref(false);

    const itemTax = (item) => parseFloat((item.price * 0.05).toFixed(2));
    const totalTax = computed(() => parseFloat((props.totalPrice * 0.05).toFixed(2)));
    const cartIsEmpty = computed(() => cartItems.value.length === 0);

    const cartButtonDisabled = computed(() => {
        return isCreativeOrder.value || cartIsEmpty.value;
    })

    const createOrder = async () => {
        try {
            isCreativeOrder.value = true;
            const cartItemsCopy = JSON.parse(JSON.stringify(cartItems.value)).map(item => ({
                ...item,
                tax: item.tax ? Number(itemTax(item)) : 0, 
                shipping: item.shipping ? Number(item.shipping) : 0 
            }));
            const options = {
                method: 'POST',
                url: 'https://app.ecwid.com/api/v3/108362264/orders',
                headers: {
                    'Authorization': 'Bearer public_RiNvjTVVzKLhFNWyzR5fNY68u1GMHLEs',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: {
                    items: cartItemsCopy.value,
                    totalPrice: props.totalPrice,
                    paymentStatus: 'AWAITING_PAYMENT'
                }
            };
            const response = await axios(options);
            cartItems.value = [];
            orderId.value = response.data.id;
            localStorage.setItem('cartItems', JSON.stringify([]));
            return response.data;
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            return [];
        } finally {
            isCreativeOrder.value = false;
        }
    };

</script>

<template>
    <div class="fixed top-0 left-0 h-full w-full bg-black z-10" style="background-color: rgba(0, 0, 0, 0.7)">
        <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
            <div class="flex flex-col justify-between h-full">
                <div>
                    <DrawerHeader />
                    <div v-if="!totalPrice || orderId" class="my-[100%]">
                        <InfoBlock 
                            v-if="!totalPrice && !orderId"
                            title="Your cart is empty"
                            description="Add products to your cart to see the total price"
                            imageUrl="/package-icon.png"
                        />
                        <InfoBlock 
                            v-if="orderId"
                            title="Your order is created"
                            :description="`Your order #${orderId} is created and will be processed soon`"
                            imageUrl="/order-success-icon.png"
                        />
                    </div>
                    <CardItemList v-else/>
                </div>
                <div v-if="totalPrice" class="flex flex-col gap-5 mt-7">
                    <div class="flex gap-2 ">
                        <span>Total:</span>
                        <div class="flex-1 border-b border-dashed"></div>
                        <b>€ {{ totalPrice }}</b>
                    </div>
                    <div class="flex gap-2 ">
                        <span>Tax 5%</span>
                        <div class="flex-1 border-b border-dashed"></div>
                        <b>€ {{ totalTax }}</b>
                    </div>
                    <button 
                        :disabled="cartButtonDisabled"
                        class="bg-lime-500 w-full rounded-xl py-3 mt-4 text-white disabled:bg-slate-400 hover:bg-lime-600 active:bg-lime-700 transition cursor-pointer"
                        @click="createOrder"
                    > 
                        Place an order
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>