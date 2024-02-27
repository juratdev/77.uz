import axios from "axios";
import config from "@/config";

export const storeInstance = axios.create({
  baseURL: config.SERVER_URL + "/store",
});
export const usingInstance = axios.create({
  baseURL: config.SERVER_URL + "/common",
});

export const authInstance = axios.create({
  baseURL: config.SERVER_URL + "/accounts",
});

export const reverseGeocodingInstance = axios.create({
  baseURL: "https://nominatim.openstreetmap.org",
});
