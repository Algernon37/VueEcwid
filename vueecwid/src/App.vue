<script setup>
    import HeaderComponent from "../src/components/HeaderComponent.vue";
    import CardList from "./components/CardList.vue";
    import Drawer from "./components/Drawer.vue";
import SearchSelect from "./components/SearchSelect.vue";
</script>

<template>
    <div>
        <!-- <Drawer /> -->
        <div class="bg-white w-4/5 m-auto  rounded-xl shadow-xl mt-14">
            <HeaderComponent />  
            <div class="p-10">
                <SearchSelect />
                <CardList />
            </div>
        </div>
    </div>
</template>
