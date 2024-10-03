import axios, { AxiosInstance } from "axios";

class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: "https://66f509e49aa4891f2a239949.mockapi.io/api/todo/",
      timeout: 10000,
    });
  }
}

const http = new Http().instance

export default http;