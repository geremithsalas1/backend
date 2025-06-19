import { PrismaClient } from '../generated/prisma/index.js';
export const prisma = new PrismaClient();

export const findUserByEmail = async (email) => {
  return await prisma.users.findUnique({
    where: { email },
  });
};