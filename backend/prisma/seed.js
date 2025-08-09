const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('superadminpassword', 10);

  await prisma.user.create({
    data: {
      name: 'Super Admin',
      email: 'superadmin@example.com',
      password: hashedPassword,
      role: 'SUPERADMIN',
      status: 'ACTIVE',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
