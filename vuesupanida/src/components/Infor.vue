<template>
  <div class="w-full h-auto bg-yellow-400 py-10 overflow-hidden">
    <!-- ส่วนหัวของเว็บไซต์ -->
    <div class="text-center text-burgundy font-serif mb-10 text-red-950">
      <h1 class="text-4xl font-bold">Baan-Naaydin Bookstore</h1>
      <p class="text-lg mt-2 text-brown">Discover enchanting books from the wizarding world</p>
    </div>

    <!-- แถวหนังสือ -->
    <div
      class="flex gap-10 px-12 overflow-x-auto"
      ref="scrollContainer"
      @mouseover="stopScrolling"
      @mouseleave="startScrolling"
    >
      <!-- กรอบของแต่ละรูป -->
      <div
        class="w-56 h-auto border border-black rounded-lg p-4 bg-red-900 shadow-md flex-shrink-0 transform transition-transform duration-300 hover:scale-90 active:scale-95 overflow-hidden"
        v-for="(book, index) in books"
        :key="index"
      >
        <img :src="book.image" :alt="book.alt" class="w-full h-60 object-cover rounded-md" />
        <p class="text-center text-lg font-bold text-white mt-3">{{ book.title }}</p>
        <p class="text-center text-lg font-semibold text-white">฿100</p>

        <!-- ปุ่มเพิ่มลงในตะกร้า -->
        <button
          class="w-full mt-2 py-2 bg-yellow-600 hover:bg-yellow-500 active:bg-yellow-700 text-white rounded-md font-bold transition-all"
          @click="openPopup(book)"
        >
          Add to cart
        </button>
      </div>
    </div>

    <!-- ป๊อปอัป -->
    <div
      v-if="selectedBook"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white w-96 p-6 rounded-lg shadow-lg relative">
        <h2 class="text-2xl font-bold text-burgundy text-center mb-4">Add to cart</h2>
        <p class="text-center text-lg">{{ selectedBook.title }}</p>
        <div class="flex justify-between items-center mt-4">
          <button
            class="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full w-10 h-10 text-xl"
            @click="decreaseQuantity"
          >
            -
          </button>
          <p class="text-xl font-bold">{{ quantity }}</p>
          <button
            class="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full w-10 h-10 text-xl"
            @click="increaseQuantity"
          >
            +
          </button>
        </div>
        <div class="mt-6 flex justify-between">
          <button
            class="w-1/2 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-md font-bold"
            @click="closePopup"
          >
            cancel
          </button>
          <button
            class="w-1/2 bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-md font-bold ml-2"
            @click="addToCart"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      books: [
        { image: "src/assets/image/finik.png", alt: "Finik", title: "Harry Potter and the Order of the Phoenix" },
        { image: "src/assets/image/jaochay.png", alt: "Jaochay", title: "Harry Potter and the Half-Blood Prince" },
        { image: "src/assets/image/naktos.webp", alt: "Naktos", title: "Harry Potter and the Prisoner of Azkaban" },
        { image: "src/assets/image/secreat.webp", alt: "Secreat", title: "Harry Potter and the Chamber of Secrets" },
        { image: "src/assets/image/sila.webp", alt: "Sila", title: "Harry Potter and the Philosopher's Stone" },
        { image: "src/assets/image/tuayarkanee.png", alt: "Tuayarkanee", title: "Harry Potter and the Goblet of Fire" },
        { image: "src/assets/image/yommatud.webp", alt: "Yommatud", title: "Harry Potter and the Deathly Hallows" },
      ],
      selectedBook: null,
      quantity: 1,
    };
  },
  methods: {
    startScrolling() {
      const container = this.$refs.scrollContainer;
      this.scrollInterval = setInterval(() => {
        container.scrollLeft += 1;
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
          container.scrollLeft = 0;
        }
      }, 20);
    },
    stopScrolling() {
      clearInterval(this.scrollInterval);
    },
    openPopup(book) {
      this.selectedBook = book;
      this.quantity = 1;
    },
    closePopup() {
      this.selectedBook = null;
    },
    increaseQuantity() {
      this.quantity += 1;
    },
    decreaseQuantity() {
      if (this.quantity > 1) this.quantity -= 1;
    },
    addToCart() {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push({
        title: this.selectedBook.title,
        price: 100,
        quantity: this.quantity,
        image: this.selectedBook.image,
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      this.$router.push({ name: "cart" });
    },
  },
  mounted() {
    this.startScrolling();
  },
  beforeUnmount() {
    clearInterval(this.scrollInterval);
  },
};
</script>
