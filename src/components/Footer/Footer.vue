<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();
</script>
<template>
  <footer>
    <div
      class="mt-8 pt-14 md:pt-16 pb-3 bg-[url('/public/images/footer/circles.svg')] bg-center bg-cover relative"
    >
      <a
        aria-current="page"
        href="/"
        class="absolute top-0 left-[50%] -translate-x-2/4 -translate-y-[45%]"
        ><img
          class="h-16 absolute-center !top-0 rounded-[10px]"
          src="../../assets/images/logo.svg"
          alt="77.uz Logo"
          style="box-shadow: 0 8px 32px 0 rgba(56, 143, 243, 0.44)"
      /></a>
      <div class="containerMain">
        <p
          class="mb-8 text-base not-italic font-normal leading-6 text-center footer_about font-inter md:mx-44"
        >
          77.uz marketplace - это виртуальная платформа в Узбекистане, которая
          облегчает<br />
          покупки и продажи, связывая продавцов с потенциальными клиентами.
        </p>
        <div
          class="flex justify-center items-center gap-y-4 gap-x-4 sm:gap-x-6 md:gap-x-[72px] mt-6 flex-wrap"
        >
          <a
            href="#"
            target="_blank"
            class="flex items-center gap-1 text-sm font-semibold duration-300 md:text-xl leading-130 text-dark hover:text-blue transition-300 flex-y-center"
            ><img src="../../assets/images/footer/symbol.svg" alt="Symbol" />
            Доска объявлений</a
          ><a
            href="#"
            target="_blank"
            class="flex items-center gap-1 text-sm font-semibold duration-300 md:text-xl leading-130 text-dark hover:text-blue transition-300 flex-y-center"
            ><img src="../../assets/images/footer/symbol.svg" alt="Symbol" />
            Условия пользования</a
          ><a
            href="tel: +998885005000"
            target="_blank"
            class="flex items-center gap-1 text-sm font-semibold duration-300 md:text-xl leading-130 text-dark hover:text-blue transition-300 flex-y-center"
            ><img src="../../assets/images/footer/symbol.svg" alt="Symbol" />
            +998 88 500 50 00
          </a>
        </div>
        <div
          class="flex items-center justify-center gap-6 mt-6 mb-2 downloading_content"
        >
          <a href="http://" target="_blank"
            ><img src="../../assets/images/footer/appstore.svg" alt="appstore"
          /></a>
          <a href="http://" target="_blank"
            ><img
              src="../../assets/images/footer/googlestore.svg"
              alt="googlestore"
          /></a>
        </div>
        <p
          class="text-base not-italic font-normal leading-6 text-center text-black"
        >
          Загрузите наше
          <span class="font-bold text-blue-500">приложение</span> и пользуйтесь
          с платформой <span class="font-bold text-blue-500">ещё удобнее</span>
        </p>
      </div>
    </div>

    <div class="py-4 bg-white">
      <div class="flex items-center justify-between containerMain">
        <div class="flex items-center gap-1 max-sm:block">
          <span class="font-medium text-black">© 77.uz</span>
          <span class="font-normal text-black"> 2023. Все права защищены</span>
        </div>

        <a
          href="https://uic.group/"
          class="flex items-center justify-between gap-2 transition duration-300 hover:scale-110"
        >
          <img src="../../assets/images/footer/uiclogo.svg" alt="uiclogo" />
          <img src="../../assets/images/footer/uictext.svg" alt="uictext" />
        </a>
      </div>
    </div>
  </footer>
</template>
