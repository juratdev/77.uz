import moment from "moment";

export const formatDate = (date, format = "DD MMMM, HH:mm") => {
  return moment(date).format(format);
};