import { ref } from "vue";
import { useI18n } from "vue-i18n";

export function useTime() {
  const { locale } = useI18n();
  const formattedDate = ref("");

  async function convertTime(date) {
    const formatterTime = new Intl.DateTimeFormat(locale.value, { timeStyle: "short" });
    const formatterDate = new Intl.DateTimeFormat(locale.value, {
      day: "2-digit",
      year: "numeric",
      month: "long",
    });

    const finalResult = `${formatterTime.format(
      new Date(date)
    )} ${formatterDate.format(new Date(date))}`;

    formattedDate.value = finalResult;
  }

  return { formattedDate, convertTime };
}
