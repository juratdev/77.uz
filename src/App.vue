<script setup>
import CustomHeader from "./components/Base/CustomHeader.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <div class="bg-[#F0F3F7]">
    <CustomHeader />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
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
