<template>
        <header class="flex justify-between border-b border-slate-200 px-10 py-8">
        <div class="flex items-center gap-4">
            <img src="/logo.png" alt="Logo" class="w-20 h-6">
            <div>
                <h2 class="text-xl font-bold uppercase">Vue store</h2>
                <p class="text-slate-400">The best store</p>
            </div>
        </div>
        <ul class="flex items-center gap-10">
            <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
                <img src="/cart.svg" alt="Cart">
                <b>12354 rub</b>     
            </li>
            <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
                <img src="/heart.svg" alt="heart">
                <p>Закладки</p>     
            </li>
            <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
                <img src="/profile.svg" alt="profile">
                <p>Профиль</p>     
            </li>
        </ul>
    </header>
</template> 