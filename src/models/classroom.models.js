import { PrismaClient } from '../generated/prisma/index.js';
export const prisma = new PrismaClient();

// Obtener todas las aulas
export const getAllClassrooms =  () => {
  prisma.classrooms.findMany();
};

// Obtener un aula por ID
export const getClassroomById =  (id) => {
  prisma.classrooms.findUnique({
    where: { id: Number(id) },
  });
};

// Crear un aula
export const createClassroom =  (classroom) => {
  prisma.classrooms.create({
    data: classroom,
  });
};

// Actualizar un aula
export const updateClassroom =  (id, classroom) => {
  prisma.classrooms.update({
    where: { id: Number(id) },
    data: classroom,
  });
};

// Eliminar un aula
export const deleteClassroom =  (id) => {
  prisma.classrooms.delete({
    where: { id: Number(id) },
  });
};