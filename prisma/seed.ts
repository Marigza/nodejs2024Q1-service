import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  const createdData1 = new Date();
  const uuid1 = uuidv4();
  const user1 = await prisma.user.upsert({
    where: { id: uuid1 },
    update: {},
    create: {
      id: uuid1,
      login: 'login1',
      password: 'password1',
      version: 1,
      createdAt: createdData1,
      updatedAt: createdData1,
    },
  });

  const createdData2 = new Date();
  const uuid2 = uuidv4();
  const user2 = await prisma.user.upsert({
    where: { id: uuid2 },
    update: {},
    create: {
      id: uuid2,
      login: 'login2',
      password: 'password2',
      version: 1,
      createdAt: createdData2,
      updatedAt: createdData2,
    },
  });

  console.log({ user1, user2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
