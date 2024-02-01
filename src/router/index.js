import { createRouter, createWebHistory } from "vue-router";
// import NotFound from "../views/NotFound.vue";
import TheBase from "@/layouts/TheBase.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/layouts/TheBase.vue"),
      children: [
        {
          path: "",
          name: "home-page",
          component: () => import("@/pages/Base/HomePage.vue"),
        },
      ],
    },
    {
      path: "/category/",
      name: "category",
      component: () => import("@/layouts/TheCategories.vue"),
      children: [
        {
          path: ":id",
          name: "category-id",
          component: () => import("@/pages/Category/CategoryId.vue"),
        },
      ],
    },
    {
      path: "/products/",
      name: "products",
      component: () => import("@/layouts/TheProducts.vue"),
      children: [
        {
          path: ":id",
          name: "product-single",
          component: () => import("@/pages/Products/ProductSingle.vue"),
        },
        {
          path: "list",
          name: "product-list",
          component: () => import("@/pages/Products/ProductList.vue"),
        },
      ],
    },
    // {
    //   path: "/:catchAll(.*)",
    //   name: "Not Found",
    //   component: NotFound,
    // },
  ],
});

export default router;
