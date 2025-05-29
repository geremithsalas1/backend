import axios from "axios";
import {DB_PORT} from "../config.js"; 


const API_URL = `http://localhost:${DB_PORT}/classrooms`; 

export const getAllClassrooms = async () => {
   
  const { data } = await axios.get(API_URL);
  return data;
};

export const getClassroomById = async (id) => {
  const { data } = await axios.get(`${API_URL}/${id}`);
  return data;
};

export const createClassroom = async (Classroom) => {
  const { data } = await axios.post(API_URL, Classroom);
  return data;
};

export const updateClassroom = async (id, Classroom) => {
  const { data } = await axios.put(`${API_URL}/${id}`, Classroom);
  return data;
};

export const deleteClassroom = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};