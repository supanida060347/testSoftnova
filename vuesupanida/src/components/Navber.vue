<template>
  <header class="sticky top-0 bg-red-900 shadow-lg">
    <nav class="container mx-auto flex justify-between items-center py-4 px-6">
      <!-- โลโก้ -->
      <div class="text-3xl font-bold text-yellow-400">
        Baan-naaydin
      </div>
      <div class="relative">
        <input 
          type="text" 
          placeholder="search....." 
          class="text-red-900 placeholder-red-900 w-64 px-4 py-2 border rounded border-red-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-900 bg-yellow-400"
        >
      </div>
      <!-- ตะกร้าสินค้า -->
      <div>
        <router-link to="/cart" class="relative">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8 text-yellow-400 hover:text-yellow-100 transition">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l1.6-8H6.4M5 21a2 2 0 100-4 2 2 0 000 4zm12 0a2 2 0 100-4 2 2 0 000 4z"/>
          </svg>
        </router-link>
      </div>
    </nav>
  </header>

  <div class="w-full h-[500px] bg-[url('@/assets/image/bg.jpg')] bg-cover bg-center text-white flex items-center">
      <div class="pl-8">
        <h1 class="text-6xl font-extrabold drop-shadow-lg ml-11 text-yellow-500">
          New!
        </h1>
        <h1 class="text-6xl font-extrabold drop-shadow-lg ml-11 mt-5 ">
        Harry Potter
        </h1>
      </div>
  </div>

  <!-- เรียกใช้ Component Infor -->
  <Infor />
</template>

<script>
import Infor from "../components/Infor.vue";

export default {
  components: {
    Infor,
  },
};
</script>
