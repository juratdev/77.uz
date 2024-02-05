<script setup>
import { ref } from "vue";
import { defineAsyncComponent } from "vue";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();

const LoginModal = defineAsyncComponent(() => import("./LoginModal.vue"));

const toggleLanguages = ref(false);
const toggleLoginModal = ref(false);

const handleLanguages = () => {
  toggleLanguages.value = !toggleLanguages.value;
};

const closeLanguages = () => {
  toggleLanguages.value = false;
};

const currentLocale = ref(localStorage.getItem("locale"));

const changeLocale = (l) => {
  localStorage.setItem("locale", l);
  currentLocale.value = l;
  locale.value = l;
};

const openLoginModal = () => {
  toggleLoginModal.value = true;
};

const closeLoginModal = () => {
  toggleLoginModal.value = false;
};
</script>

<template>
  <header
    class="sticky top-0 z-50 py-3 mb-4 border-b md:py-4 md:mb-3 border-gray-00 backdrop-blur-[6px] bg-white/90"
  >
    <div class="flex items-center justify-between containerMain">
      <div class="flex items-center gap-6">
        <div class="relative z-0">
          <div>
            <button
              v-click-outside="closeLanguages"
              @click="handleLanguages"
              class="flex items-center gap-2 text-sm font-medium duration-300 text-dark leading-130 hover:text-blue transition-300 max-sm:uppercase"
            >
              <span
                v-if="currentLocale === 'ru'"
                class="flex items-center justify-center space-x-2"
                ><img
                  class="w-5 h-5 shrink-0"
                  src="../../assets/images/header/ru.svg"
                  alt="Русский"
                />
                <span
                  class="relative w-full py-2 leading-6 duration-300 sm:hidden group-hover/lang:text-blue transition-300 max-sm:uppercase"
                  >ru</span
                >
                <span
                  class="relative w-full py-2 leading-6 duration-300 max-sm:hidden group-hover/lang:text-blue transition-300 max-sm:uppercase"
                  >Русский</span
                ></span
              >
              <span v-else class="flex items-center justify-center space-x-2">
                <img
                  class="w-5 h-5 shrink-0"
                  src="../../assets/images/header/uz.svg"
                  alt="O’zbekcha"
                />
                <span
                  class="relative w-full py-2 leading-6 duration-300 sm:hidden group-hover/lang:text-blue transition-300 max-sm:uppercase"
                  >uz</span
                >
                <span
                  class="relative w-full py-2 leading-6 duration-300 group-hover/lang:text-blue transition-300 max-sm:uppercase max-sm:hidden"
                  >O’zbekcha</span
                ></span
              >
              <i
                class="text-[9px] text-dark transition icon-down"
                :class="{ 'rotate-180': toggleLanguages }"
              ></i>
            </button>
          </div>
          <Transition name="fade-up" mode="out-in">
            <div
              v-show="toggleLanguages"
              class="absolute left-0 min-w-full overflow-hidden translate-y-full bg-white rounded-lg shadow w-max -bottom-1 z-1 dropdown-shadow"
            >
              <div>
                <button
                  @click="changeLocale('ru')"
                  class="flex items-center gap-2 px-4 cursor-pointer group/lang"
                >
                  <img
                    class="w-5 h-5 shrink-0"
                    src="../../assets/images/header/ru.svg"
                    alt="Русский"
                  />
                  <span
                    class="relative w-full py-2 leading-6 duration-300 sm:hidden group-hover/lang:text-blue transition-300 max-sm:uppercase"
                    :class="{ 'text-blue': locale === 'ru' }"
                    >ru</span
                  >
                  <span
                    class="relative w-full py-2 leading-6 duration-300 group-hover/lang:text-blue transition-300 max-sm:uppercase max-sm:hidden"
                    :class="{ 'text-blue': locale === 'ru' }"
                    >Русский</span
                  >
                </button>
                <button
                  @click="changeLocale('uz')"
                  class="flex items-center gap-2 px-4 cursor-pointer group/lang"
                >
                  <img
                    class="w-5 h-5 shrink-0"
                    src="../../assets/images/header/uz.svg"
                    alt="O’zbekcha"
                  />
                  <span
                    class="relative w-full py-2 leading-6 duration-300 sm:hidden group-hover/lang:text-blue transition-300 max-sm:uppercase"
                    :class="{ 'text-blue': locale === 'uz' }"
                    >uz</span
                  >
                  <span
                    class="relative w-full py-2 leading-6 group-hover/lang:text-blue transition-300 max-sm:uppercase max-sm:hidden"
                    :class="{ 'text-blue': locale === 'uz' }"
                    >O’zbekcha</span
                  >
                </button>
              </div>
            </div>
          </Transition>
        </div>
        <a
          href="tel: +998885005000"
          class="flex items-center gap-1 group max-lg:hidden"
        >
          <i
            class="text-xl leading-5 icon-phone text-gray-2 group-hover:text-blue transition-300"
          >
          </i>
          <span
            class="text-sm font-medium leading-130 text-dark hover:text-blue transition-300"
            >+998 88 500 50 00</span
          >
        </a>
      </div>
      <a
        href="/"
        class="absolute top-0 left-[50%] -translate-x-1/2 bg-white border border-t-0 border-gray-4 rounded-b-[20px] p-3 md:px-4 md:py-3 shadow-3xl"
      >
        <img
          class="max-md:h-12"
          src="../../assets/images/logo.svg"
          alt="logo"
        />
      </a>

      <div class="flex items-center gap-3 sm:gap-4">
        <a
          href="#"
          class="flex items-center gap-2 text-dark text-sm font-semibold leading-5 hover:text-blue transition-300 max-sm:p-1.5 max-sm:bg-gray-bg max-sm:rounded-lg"
        >
          <i class="text-lg icon-like"></i>
          <span class="max-md:hidden">{{ t("navbar.star") }}</span></a
        >
        <span class="h-8 bg-gray-bg max-sm:hidden"></span>
        <button
          @click="openLoginModal"
          class="bg-gray-4 text-dark hover:bg-[#c8c8c8] px-6 md:px-7 py-2.5 md:py-3 text-sm md:text-base font-semibold leading-130 rounded-lg relative active:scale-95 disabled:bg-gray-bg disabled:text-gray-2 max-sm:!p-2.5 transition duration-300"
          type="button"
        >
          <span
            class="flex items-center justify-center gap-2 text-center transition duration-300 opacity-100 whitespace-nowrap"
            ><span class="text-lg max-sm:hidden">{{ t("navbar.login") }}</span
            ><span class="text-lg leading-5 icon-exit"></span
          ></span>
        </button>
        <transition name="fade" mode="out-in">
          <LoginModal @close:modal="closeLoginModal" v-if="toggleLoginModal" />
        </transition>
      </div>
    </div>
  </header>
</template>

<style>
.fade-up-enter-active,
.fade-up-leave-active {
  transition: all 0.5s ease;
}

.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(90%);
}
</style>
