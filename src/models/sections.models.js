import axios from "axios";
import {DB_PORT} from "../config.js"; 


const API_URL = `http://localhost:${DB_PORT}/sections`; 

export const getAllSections = async () => {
   
  const { data } = await axios.get(API_URL);
  return data;
};

export const getSectionById = async (id) => {
  const { data } = await axios.get(`${API_URL}/${id}`);
  return data;
};

export const createSection = async (Section) => {
  const { data } = await axios.post(API_URL, Section);
  return data;
};

export const updateSection = async (id, Section) => {
  const { data } = await axios.put(`${API_URL}/${id}`, Section);
  return data;
};

export const deleteSection = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};