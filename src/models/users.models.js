import { PrismaClient } from '../generated/prisma/index.js';
export const prisma = new PrismaClient();

export const getAllUsers = () => prisma.users.findMany();

export const getUserById = (id) =>
  prisma.users.findUnique({
    where: { id: Number(id) },
  });

export const createUser = (user) =>
  prisma.users.create({
    data: user,
  });

export const updateUser = (id, user) =>
  prisma.users.update({
    where: { id: Number(id) },
    data: user,
  });

export const deleteUser = (id) =>
  prisma.users.delete({
    where: { id: Number(id) },
  });