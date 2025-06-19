import { PrismaClient } from '../generated/prisma/index.js';
export const prisma = new PrismaClient();

// Obtener todas las secciones
export const getAllSections = () => { prisma.sections.findMany(); };

export const getSectionById =  (id) => {
   prisma.sections.findUnique({
    where: { id: Number(id) },
  });

const API_URL = `http://localhost:${DB_PORT}/section`; 

export const getAllSections = async () => {
   
  const { data } = await axios.get(API_URL);
  return data;

};

// Crear una nueva sección
export const createSection =  (section) => {
   prisma.sections.create({
    data: section,
  });
};

<<<<<<< HEAD
// Actualizar una sección
export const updateSection =  (id, section) => {
   prisma.sections.update({
    where: { id: Number(id) },
    data: section,
  });
=======
export const createSection = async () => {
  const { data } = await axios.post(API_URL, Section);
  return data;
>>>>>>> 0f6e6544bddf370d2a4a1611cf39efebfd51674a
};

// Eliminar una sección
export const deleteSection =  (id) => {
   prisma.sections.delete({
    where: { id: Number(id) },
  });
};