import { createRouter, createWebHistory } from "vue-router";
import Infor from "@/components/Infor.vue";
import Navber from "@/components/Navber.vue";
import Cart from "@/components/Cart.vue";
import Cartinfo from "@/components/Cartinfo.vue";


const routes = [
  { path: "/", name: "Home", component: Navber },
  { path: "/cart", name: "cart", component: Cart },
  {path: "/cartinfo", name:"cartinfo", components: Cartinfo},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;