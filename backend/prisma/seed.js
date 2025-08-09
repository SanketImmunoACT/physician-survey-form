const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('superadminpassword', 10);

  // Check if superadmin exists
  let superadmin = await prisma.user.findUnique({
    where: { email: 'superadmin@example.com' },
  });

  if (!superadmin) {
    superadmin = await prisma.user.create({
      data: {
        name: 'Super Admin',
        email: 'superadmin@example.com',
        password: hashedPassword,
        role: 'SUPERADMIN',
        status: 'ACTIVE',
      },
    });
    console.log('Superadmin created.');
  } else {
    console.log('Superadmin already exists.');
  }

  // Create Zonal Manager 1 user
  let zm1 = await prisma.user.findUnique({
    where: { email: 'zm1@example.com' },
  });

  if (!zm1) {
    zm1 = await prisma.user.create({
      data: {
        name: 'Zonal Manager 1',
        email: 'zm1@example.com',
        password: hashedPassword,
        role: 'ZONAL_MANAGER_1',
        status: 'ACTIVE',
      },
    });
    console.log('Zonal Manager 1 created.');
  } else {
    console.log('Zonal Manager 1 already exists.');
  }

  // Create Zonal Manager 2 user
  let zm2 = await prisma.user.findUnique({
    where: { email: 'zm2@example.com' },
  });

  if (!zm2) {
    zm2 = await prisma.user.create({
      data: {
        name: 'Zonal Manager 2',
        email: 'zm2@example.com',
        password: hashedPassword,
        role: 'ZONAL_MANAGER_2',
        status: 'ACTIVE',
      },
    });
    console.log('Zonal Manager 2 created.');
  } else {
    console.log('Zonal Manager 2 already exists.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
