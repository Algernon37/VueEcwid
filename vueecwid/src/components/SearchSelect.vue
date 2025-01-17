<template>
    <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold mb-8">All items</h2>
        <div class="flex gap-4">
            <select class=" py-2 px-3 border rounded-md outline-none">
                <option>By name</option>
                <option>By price (low)</option>
                <option>By price (high)</option>
            </select>
            <div class="relative">
                <img class="absolute left-4 top-3" src="/search.svg">
                <input
                    class="border border-slate-200 rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
                    placeholder="Search..."
                >
            </div>
        </div>
    </div>
</template>