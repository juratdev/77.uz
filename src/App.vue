<script setup>
import CustomHeader from "./components/Base/CustomHeader.vue";
import Footer from "./components/Footer/Footer.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <div class="bg-[#F0F3F7] min-h-screen flex flex-col justify-between">
    <CustomHeader />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <Footer />
    <!-- FOOTER -->
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
