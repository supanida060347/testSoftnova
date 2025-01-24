<template>
  <div class="w-full h-auto bg-red-900 text-white min-h-screen py-1 rounded-lg">
    <div class="container mx-auto px-6">
      <!-- Title -->
      <h1 class="text-3xl font-extrabold text-center mb-10 text-white my-5">
        Shopping Cart
      </h1>

      <!-- Cart Items -->
      <div
        v-if="cartItems.length"
        class="bg-white text-burgundy rounded-lg shadow-lg p-6 space-y-6"
      >
        <div
          v-for="(item, index) in cartItems"
          :key="index"
          class="flex items-center justify-between border-b border-yellow-500 pb-4"
        >
          <!-- Image and Details -->
          <div class="flex items-center space-x-4">
            <img
              :src="item.image"
              alt="Book image"
              class="w-24 h-24 object-cover rounded-md"
            />
            <div>
              <p class="text-xl font-bold">{{ item.title }} </p>
              <p class="text-sm text-gray-600">Price: ฿{{ item.price }}</p>
            </div>
          </div>

          <!-- Quantity, Total, and Remove -->
          <div class="flex items-center space-x-6">
            <div class="flex items-center space-x-2">
              <button
                class="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full w-8 h-8 font-bold"
                @click="decreaseQuantity(index)"
              >
                -
              </button>
              <p class="text-lg font-bold">{{ item.quantity }}</p>
              <button
                class="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full w-8 h-8 font-bold"
                @click="increaseQuantity(index)"
              >
                +
              </button>
            </div>
            <div class="text-lg font-bold text-yellow-600">
              ฿{{ item.price * item.quantity }}
            </div>
            <!-- Remove Button -->
            <button
              class="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md font-bold"
              @click="removeItem(index)"
            >
              Remove
            </button>
          </div>
        </div>

        <!-- Total Price -->
        <div class="mt-6 text-right">
          <p class="text-2xl font-extrabold text-yellow-500">
            Subtotal: ฿{{ subtotal }}
          </p>
          <p class="text-lg font-bold text-green-600">
            Discount: -฿{{ discount }}
          </p>
          <p class="text-2xl font-extrabold text-yellow-500">
            Total: ฿{{ total }}
          </p>
        </div>

        <!-- Clear Cart Button -->
        <div class="text-right mt-4">
          <button
            class="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-md font-bold"
            @click="clearCart"
          >
            Clear Cart
          </button>
        </div>
      </div>

      <!-- Empty Cart Message -->
      <div v-else class="text-center mt-20">
        <p class="text-xl font-bold text-yellow-500">
          Your cart is currently empty.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartItems: [], // Array to store cart items
    };
  },
  computed: {
    // คำนวณ subtotal
    subtotal() {
      return this.cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },

    // คำนวณส่วนลดจากคู่สินค้าที่ไม่ซ้ำกัน
    discount() {
      let discountAmount = 0;
      const uniqueBooks = this.cartItems.filter((item, index, self) => {
        return index === self.findIndex((t) => t.title === item.title);
      });

      // ถ้ามีสินค้าที่ไม่ซ้ำกัน 3 รายการ
      if (uniqueBooks.length >= 2) {
        // ลูปหาคู่สินค้าที่ไม่ซ้ำกัน
        for (let i = 0; i < uniqueBooks.length; i++) {
          for (let j = i + 1; j < uniqueBooks.length; j++) {
            const itemA = this.cartItems.find((item) => item.title === uniqueBooks[i].title);
            const itemB = this.cartItems.find((item) => item.title === uniqueBooks[j].title);

            const pairCount = Math.min(itemA.quantity, itemB.quantity); // จำนวนสินค้าคู่ที่สามารถลดได้
            const pairPrice = itemA.price + itemB.price;

            // ส่วนลด 10% สำหรับคู่สินค้า
            discountAmount += pairCount * pairPrice * 0.1;
          }
        }
      }

      return Math.round(discountAmount);
    },

    // คำนวณราคารวมหลังหักส่วนลด
    total() {
      return this.subtotal - this.discount;
    },
  },
  methods: {
    // ลดจำนวนสินค้า
    decreaseQuantity(index) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity--;
        this.updateCart();
      }
    },

    // เพิ่มจำนวนสินค้า
    increaseQuantity(index) {
      this.cartItems[index].quantity++;
      this.updateCart();
    },

    // ลบสินค้าจากตะกร้า
    removeItem(index) {
      this.cartItems.splice(index, 1);
      this.updateCart();
    },

    // เคลียร์ตะกร้า
    clearCart() {
      this.cartItems = [];
      localStorage.removeItem("cart");
    },

    // อัพเดตข้อมูลใน localStorage
    updateCart() {
      localStorage.setItem("cart", JSON.stringify(this.cartItems));
    },
  },
  mounted() {
    // โหลดข้อมูลตะกร้าจาก localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    this.cartItems = cart;
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap");

body {
  font-family: "Poppins", sans-serif;
}

.text-burgundy {
  color: #5a2328; /* Burgundy color */
}
</style>
