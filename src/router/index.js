import { createRouter, createWebHistory } from "vue-router";

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
        {
          path: "category/:id",
          name: "category-id",
          component: () => import("@/pages/Category/CategoryId.vue"),
        },
        {
          path: "products/:id",
          name: "product-single",
          component: () => import("@/pages/Products/ProductSingle.vue"),
        },
        {
          path: "products/list",
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
