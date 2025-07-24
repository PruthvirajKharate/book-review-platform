import axios from "axios";

const API_URL ="http://localhost:5000/api";
const AUTH_URL = `${API_URL}/auth`;

export const login = async (userData) =>{
    const response = await axios.post(`${AUTH_URL}/login`, userData);
    const token = response.data.token;
    if (token) {
        localStorage.setItem("token", token);
    }
    return response;
}
export const signup = (userData) => axios.post(`${AUTH_URL}/signup`, userData);

export const logout = () =>{
    localStorage.removeItem("token");
    return Promise.resolve();
}
