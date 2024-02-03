import axios from "axios";
import config from "@/config";

export const storeInstance = axios.create({
  baseURL: config.SERVER_URL + "/store",
});

export const authInstance = axios.create({
  baseURL: config.SERVER_URL + "/accounts",
});
