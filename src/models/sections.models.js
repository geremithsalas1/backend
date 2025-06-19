import { PrismaClient } from '../generated/prisma/index.js';
export const prisma = new PrismaClient();

// Obtener todas las secciones
export const getAllSections = () => { prisma.sections.findMany(); };

// Obtener una sección por ID
export const getSectionById =  (id) => {
   prisma.sections.findUnique({
    where: { id: Number(id) },
  });
};

// Crear una nueva sección
export const createSection =  (section) => {
   prisma.sections.create({
    data: section,
  });
};

// Actualizar una sección
export const updateSection =  (id, section) => {
   prisma.sections.update({
    where: { id: Number(id) },
    data: section,
  });
};

// Eliminar una sección
export const deleteSection =  (id) => {
   prisma.sections.delete({
    where: { id: Number(id) },
  });
};