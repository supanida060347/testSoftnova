<template>
  <div>
    <!-- Header -->
    <header class="sticky top-0 bg-red-900 shadow-lg">
      <nav class="container mx-auto flex justify-between items-center py-4 px-6">
        <!-- โลโก้ -->
        <div class="text-3xl font-bold text-white">
          Baan-naaydin
        </div>

        <!-- ตะกร้าสินค้า -->
        <div>
          <router-link to="/cart" class="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-8 h-8 text-white hover:text-yellow-500 transition"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 3h2l.4 2M7 13h10l1.6-8H6.4M5 21a2 2 0 100-4 2 2 0 000 4zm12 0a2 2 0 100-4 2 2 0 000 4z"
              />
            </svg>
          </router-link>
        </div>
      </nav>
    </header>

    <!-- Cartinfo Component -->
    <main class="container mx-auto py-8">
      <Cartinfo />
    </main>
  </div>
</template>

<script>
import Cartinfo from "../components/Cartinfo.vue"; // นำเข้า component

export default {
  components: {
    Cartinfo, // ลงทะเบียน component
  },
};
</script>
