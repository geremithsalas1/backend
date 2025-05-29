import axios from "axios";
import {DB_PORT} from "../config.js"; 


const API_URL = `http://localhost:${DB_PORT}/users`; 

export const getAllUsers = async () => {
   
  const { data } = await axios.get(API_URL);
  return data;
};

export const getUserById = async (id) => {
  const { data } = await axios.get(`${API_URL}/${id}`);
  return data;
};

export const createUser = async (user) => {
  const { data } = await axios.post(API_URL, user);
  return data;
};

export const updateUser = async (id, user) => {
  const { data } = await axios.put(`${API_URL}/${id}`, user);
  return data;
};

export const deleteUser = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};