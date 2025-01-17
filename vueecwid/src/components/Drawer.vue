<script setup>
    import CardItemList from './CardItemList.vue';
    import DrawerHeader from './DrawerHeader.vue';

</script>

<template>
    <div class="fixed top-0 left-0 h-full w-full bg-black z-10" style="background-color: rgba(0, 0, 0, 0.7)">
        <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
            <div class="flex flex-col justify-between h-full">
                <div>
                    <DrawerHeader />
                    <CardItemList />
                </div>
                <div class="flex flex-col gap-5 mt-7">
                    <div class="flex gap-2 ">
                        <span>Total:</span>
                        <div class="flex-1 border-b border-dashed"></div>
                        <b>250 $</b>
                    </div>
                    <div class="flex gap-2 ">
                        <span>Tax 5%</span>
                        <div class="flex-1 border-b border-dashed"></div>
                        <b>12.5 $</b>
                    </div>
                    <button disabled="" class="bg-lime-500 w-full rounded-xl py-3 mt-4 text-white disabled:bg-slate-400 hover:bg-lime-600 active:bg-lime-700 transition cursor-pointer"> 
                        Place an order
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>