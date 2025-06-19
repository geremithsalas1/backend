import { PrismaClient } from '../generated/prisma/index.js';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

function generateRandomPassword(length = 6) {
  // Genera una contraseña numérica de 6 dígitos
  let password = '';
  for (let i = 0; i < length; i++) {
    password += Math.floor(Math.random() * 10);
  }
  return password;
}

async function resetAllPasswords() {
  const users = await prisma.users.findMany();
  for (const user of users) {
    const newPassword = generateRandomPassword(6);
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.users.update({
      where: { id: user.id },
      data: { password_hash: hashedPassword },
    });
    console.log(`Usuario: ${user.email} | Nueva contraseña: ${newPassword}`);
  }
  await prisma.$disconnect();
  console.log('Todas las contraseñas han sido actualizadas.');
}

resetAllPasswords();