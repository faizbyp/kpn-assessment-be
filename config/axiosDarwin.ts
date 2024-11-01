import axios from "axios";

export const axiosDarwin = axios.create({
  baseURL: process.env.DARWINHOST,
});
