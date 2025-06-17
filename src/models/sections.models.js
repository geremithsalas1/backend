import { PrismaClient } from '../generated/prisma/index.js';
export const prisma = new PrismaClient();

// Obtener todas las secciones
export const getAllSections = async () => {
  return await prisma.sections.findMany();
};

// Obtener una sección por ID
export const getSectionById = async (id) => {
  return await prisma.sections.findUnique({
    where: { id: Number(id) },
  });
};

// Crear una nueva sección
export const createSection = async (section) => {
  return await prisma.sections.create({
    data: section,
  });
};

// Actualizar una sección
export const updateSection = async (id, section) => {
  return await prisma.sections.update({
    where: { id: Number(id) },
    data: section,
  });
};

// Eliminar una sección
export const deleteSection = async (id) => {
  return await prisma.sections.delete({
    where: { id: Number(id) },
  });
};