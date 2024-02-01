<script setup>
import { ref } from "vue";
import { data } from "../../data/uz";

const toggleLanguages = ref(false);

const handleLanguages = () => {
  toggleLanguages.value = !toggleLanguages.value;
};

const closeLanguages = () => {
  toggleLanguages.value = false;
};

const currentLocale = localStorage.getItem("locale")
  ? localStorage.getItem("locale")
  : "uz";

const changeLocale = (locale) => {
  localStorage.setItem("locale", locale);
  window.location.reload();
};
</script>

<template>
  <header
    class="sticky top-0 z-0 py-2 mb-4 border-b border-gray-00 bg-white/90 md:mb-3"
  >
    <div class="flex items-center justify-between containerMain">
      <div class="flex items-center gap-6">
        <div class="relative z-0">
          <div class="">
            <button
              v-click-outside="closeLanguages"
              @click="handleLanguages"
              class="flex items-center gap-2 text-sm font-medium text-dark leading-130 hover:text-blue transition-300 max-sm:uppercase"
            >
              <span
                v-if="currentLocale === 'ru'"
                class="flex items-center justify-center space-x-2"
                ><img src="../../assets/images/header/ru.svg" alt="Русский" />
                <span class="sm:hidden">ru</span>
                <span class="max-sm:hidden">Русский</span></span
              >
              <span v-else class="flex items-center justify-center space-x-2">
                <img
                  src="../../assets/images/header/uz.svg"
                  alt="O’zbekcha"
                  class="shrink-0"
                />
                <span class="sm:hidden">uz</span>
                <span
                  class="w-full leading-6 py-2 relative group-hover/lang:text-blue transition-300 after:content-[''] after:absolute after:left-0 after:-bottom-px after:w-[calc(100%+16px)] after:h-px after:bg-gray-4 group-last/lang:after:hidden max-sm:uppercase"
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
              class="absolute shadow left-0 min-w-full overflow-hidden translate-y-full bg-white rounded-lg w-max -bottom-1 z-1 dropdown-shadow"
            >
              <ul>
                <button
                  @click="changeLocale('ru')"
                  class="flex items-center gap-2 px-4 cursor-pointer group/lang"
                >
                  <img
                    src="../../assets/images/header/ru.svg"
                    alt="Русский"
                    class="shrink-0"
                  /><span
                    class="w-full leading-6 py-2 relative group-hover/lang:text-blue transition-300 after:content-[''] after:absolute after:left-0 after:-bottom-px after:w-[calc(100%+16px)] after:h-px after:bg-gray-4 group-last/lang:after:hidden max-sm:uppercase"
                    >Русский</span
                  >
                </button>
                <button
                  @click="changeLocale('uz')"
                  class="flex items-center gap-2 px-4 cursor-pointer group/lang"
                >
                  <img
                    src="../../assets/images/header/uz.svg"
                    alt="O’zbekcha"
                    class="shrink-0"
                  /><span
                    class="w-full leading-6 py-2 relative group-hover/lang:text-blue transition-300 after:content-[''] after:absolute after:left-0 after:-bottom-px after:w-[calc(100%+16px)] after:h-px after:bg-gray-4 group-last/lang:after:hidden max-sm:uppercase"
                    >O’zbekcha</span
                  >
                </button>
              </ul>
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
        class="absolute top-0 left-[50%] -translate-x-1/2 bg-white border border-t-0 border-gray-4 rounded-b-[20px] p-3 md:px-4 md:py-3"
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
          <span class="max-md:hidden">Избранные</span></a
        >
        <span class="w-px h-8 bg-gray-bg max-sm:hidden"></span>
        <button
          class="bg-gray-4 text-dark hover:bg-gray-3 px-6 md:px-7 py-2.5 md:py-3 text-sm md:text-base font-semibold leading-130 rounded-lg relative transition-300 active:scale-95 disabled:bg-gray-bg disabled:text-gray-2 max-sm:!p-2.5"
          type="button"
        >
          <span
            class="gap-2 text-center opacity-100 flex-center transition-300 whitespace-nowrap"
            ><span class="max-sm:hidden">Войти</span
            ><span class="text-xl leading-5 icon-login"></span
          ></span>
        </button>
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
