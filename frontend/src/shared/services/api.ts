import axios from "axios";

export const API_URL = 'https://691078c77686c0e9c20a6dc4.mockapi.io/api'

export const axiosClient = axios.create({
    baseURL: `${API_URL}`,
});