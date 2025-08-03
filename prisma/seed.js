const { PrismaClient } = require('@prisma/client')
const doctors = require('../src/data/doctors.json')
const hospitals = require('../src/data/hospitals.json')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Seed hospitals
  console.log('🏥 Seeding hospitals...')
  for (const hospital of hospitals) {
    if (hospital.status === 'Approved') {
      await prisma.hospital.upsert({
        where: { hospitalCode: hospital.code },
        update: {},
        create: {
          hospitalCode: hospital.code,
          name: hospital.name,
          address: hospital.address,
          city: hospital.city,
          cityCode: hospital.cityCode,
          state: hospital.city, // You might want to add state to your JSON
          type: hospital.type === 'Government Hospital' ? 'GOVERNMENT_HOSPITAL' :
                hospital.type === 'Private Hospital' ? 'PRIVATE_HOSPITAL' : 'CHARITABLE_TRUST_HOSPITAL',
          status: hospital.status === 'Approved' ? 'APPROVED' : 'PENDING'
        }
      })
    }
  }

  // Seed physicians
  console.log('👨‍⚕️ Seeding physicians...')
  for (const doctor of doctors) {
    await prisma.physician.upsert({
      where: { uniqueId: doctor.value },
      update: {},
      create: {
        name: doctor.label,
        uniqueId: doctor.value,
        speciality: 'Oncology', // Default speciality, you can modify as needed
        isActive: true
      }
    })
  }

  // Create a default admin user
  console.log('👤 Creating default admin user...')
  await prisma.user.upsert({
    where: { email: 'admin@immunoact.com' },
    update: {},
    create: {
      email: 'admin@immunoact.com',
      passwordHash: '$2b$10$rQZ8K9mN2pL1vX3yU7wE4t.5sA6bC8dF9gH0iJ1kL2mN3oP4qR5sT6uV7wX8yZ9', // You should hash this properly
      role: 'ADMIN',
      firstName: 'Admin',
      lastName: 'User',
      isActive: true
    }
  })

  console.log('✅ Database seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 