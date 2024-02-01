import { createI18n } from "vue-i18n";
import { ref } from "vue";

const messages = {
  uz: {
    categories: {
      title: "Kategoriyalar",
      types: {
        menClothes: "Erkaklar kiyimi",
      },
    },
    search: {
      placeholder: "Izlash",
    },
    products: {
      title: "E'lonlar",
    },
  },
  ru: {
    categories: {
      title: "Категории",
      types: {
        menClothes: "Мужская одежда",
      },
    },
    search: {
      placeholder: "Поиск",
    },
    products: {
      title: "Объявления",
    },
  },
};

const i18n = createI18n({
  locale: localStorage.getItem("locale")
    ? localStorage.getItem("locale")
    : "uz", // set locale
  fallbackLocale: "ru", // set fallback locale
  messages, // set locale messages
});

export default i18n;
