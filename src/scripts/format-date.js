import moment from "moment";

export const formatDate = (date, format = "DD MMMM, HH:mm", lang = "uz") => {
  moment.updateLocale("uz", {
    months: [
      "Yanvar",
      "Fevral",
      "Mart",
      "Aprel",
      "May",
      "Iyun",
      "Iyul",
      "Avgust",
      "Sentabr",
      "Oktabr",
      "Noyabr",
      "Dekabr",
    ],
  });
  moment.updateLocale("ru", {
    months: [
      "Yanvar",
      "Fevral",
      "Mart",
      "Aprel",
      "May",
      "Iyun",
      "Iyul",
      "Avgust",
      "Sentabr",
      "Октабр",
      "Noyabr",
      "Dekabr",
    ],
  });
  moment.locale(lang);
  return moment(date).format(format);
};
