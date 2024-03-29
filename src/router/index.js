import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      meta: {
        layout: "default",
      },
      component: () => import("@/pages/Base/HomePage.vue"),
    },
    {
      path: "/category/:id",
      name: "category-id",
      meta: {
        layout: "default",
      },
      component: () => import("@/pages/Category/CategoryId.vue"),
    },
    {
      path: "/products/:id",
      name: "product-single",
      meta: {
        layout: "default",
      },
      component: () => import("@/pages/Products/ProductSingle.vue"),
    },
    {
      path: "/products/list",
      name: "product-list",
      meta: {
        layout: "default",
      },
      component: () => import("@/pages/Products/ProductList.vue"),
    },
    {
      path: "/favourites",
      name: "favourites",
      meta: {
        layout: "default",
      },
      component: () => import("@/pages/Products/ProductFavorite.vue"),
    },
    {
      path: "/pages/:slug",
      name: "siteDirection",
      meta: {
        layout: "default",
      },
      component: () => import("@/pages/UsingRouls.vue"),
    },

    {
      path: "/:catchAll(.*)",
      name: "Not Found",
      meta: {
        layout: "empty",
      },
      component: () => import("@/pages/NotFound.vue"),
    },
  ],
});

export default router;
