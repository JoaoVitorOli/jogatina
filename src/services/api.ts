import axios from "axios";

export const api = axios.create({
  baseURL: "http://0.0.0.0:8080/https://api.igdb.com/v4",
});
