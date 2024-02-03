import { createI18n } from "vue-i18n";
import { ref } from "vue";

const messages = {
  uz: {
    navbar: {
      star: "Sevimlilar",
      login: "Kirish",
    },
    categories: {
      title: "Kategoriyalar",
      minTitle:
        "Sizga kerak bo'lgan barcha toifalarni xaridordan topishingiz mumkin",
      types: {
        menClothes: "Erkaklar kiyimi",
      },
    },
    search: {
      text: "Izlash",
      placeholder: "Siz nimani izlayapsiz?",
    },
    products: {
      title: "E'lonlar",
      minTitle:
        "Sizga kerak bo'lgan barcha toifalarni xaridordan topishingiz mumkin",
      buttonMore: "Ko'proq ko'rsatish",
    },
  },
  ru: {
    navbar: {
      star: "Избранные",
      login: "Войти",
    },
    categories: {
      title: "Категории",
      minTitle:
        "Вы можете найти все категории, которые вам нужны от покупателя",
      types: {
        menClothes: "Мужская одежда",
      },
    },
    search: {
      text: "Поиск",
      placeholder: "Что вы ищите?",
    },
    products: {
      title: "Объявления",
      minTitle:
        "Вы можете найти все категории, которые вам нужны от покупателя",
      buttonMore: "Показать больше",
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
