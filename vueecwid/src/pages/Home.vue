<script setup>
   import CardList from "../components/CardList.vue";
   import SearchSelect from "../components/SearchSelect.vue";

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
    
