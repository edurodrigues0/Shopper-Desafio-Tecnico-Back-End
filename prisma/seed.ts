import { prisma } from "@/lib/prisma";

async function seed() {
  const customerAlredyExists = await prisma.customer.findUnique({
    where: {
      code: 'seed-code'
    }
  })

  if (customerAlredyExists) {
    return
  }

  const customer = await prisma.customer.create({
    data: {
      code: 'seed-code'
    }
  })

  await prisma.measure.create({
    data: {
      id: 'b7b96570-6393-4ed7-9963-1d31499370fc',
      imageUrl: 'seed-img-url',
      measureDate: new Date(),
      measureType: 'WATER',
      measureValue: 12345678.9,
      customerId: customer.id,
      isConfirmed: false,
    }
  })
}

seed().then(() => {
  console.log('Database seeded!')
})