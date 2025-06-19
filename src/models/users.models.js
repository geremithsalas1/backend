import { PrismaClient } from '../generated/prisma/index.js';
export const prisma = new PrismaClient();

export const getAllUsers = () => prisma.users.findMany();

export const getUserById = (id) =>
  prisma.users.findUnique({
    where: { id: Number(id) },
  });

<<<<<<< HEAD
export const createUser = (user) =>
  prisma.users.create({
    data: user,
  });
=======
export const getAllUsers = async () => {
   
  const { data } = await get(API_URL);
  return data;
};
>>>>>>> 0f6e6544bddf370d2a4a1611cf39efebfd51674a

export const updateUser = (id, user) =>
  prisma.users.update({
    where: { id: Number(id) },
    data: user,
  });

export const deleteUser = (id) =>
  prisma.users.delete({
    where: { id: Number(id) },
  });


export const getUserByEmail = async (email) => {
  return prisma.users.findUnique({ where: { email } });
