import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    const cafes = await prisma.cafe.createMany({
        data: [
          {
            name: 'The Java',
            description: 'A cozy place to enjoy the finest coffees.',
            logo: null,
            location: '123 Coffee Lane, Brew City',
          },
          {
            name: 'Brewedss',
            description: 'Wake up and smell the coffee!',
            logo: null, // No logo provided
            location: '456 Espresso St, Caffeine Town',
          },
          {
            name: 'Café Moc',
            description: 'A perfect blend of coffee and culture.',
            logo: null,
            location: '789 Latte Ave, Java City',
          },
        ],
      });
      const cafeFirst = await prisma.cafe.findFirst();
      const employees = await prisma.employee.createMany({
        data: [
          {
            id: 'UI1234560',
            name: 'Alice Smith',
            email_address: 'alice.smith@example.com',
            phone_number: '91551234',
            gender: 'Female',
            cafeId: cafeFirst?.id,
            start: new Date('2023-01-15T09:00:00Z'),
          },
          {
            id: 'UI1234561',
            name: 'Bob Johnson',
            email_address: 'bob.johnson@example.com',
            phone_number: '85555678',
            gender: 'Male',
            cafeId: cafeFirst?.id,
            start: new Date('2023-02-20T09:00:00Z'),
          },
          {
            id: 'UI1234562',
            name: 'Charlie Brown',
            email_address: 'charlie.brown@example.com',
            phone_number: '85558765',
            gender: 'Male',
            cafeId: cafeFirst?.id,
            start: new Date('2023-03-10T09:00:00Z'),
          },
          {
            id: 'UI1234563',
            name: 'Daisy Lee',
            email_address: 'daisy.lee@example.com',
            phone_number: '85554321',
            gender: 'Female',
            cafeId: cafeFirst?.id,
            start: new Date('2023-04-05T09:00:00Z'),
          },
        ],
      });
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })