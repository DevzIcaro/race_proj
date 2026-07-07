require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

(async () => {
  try {
    const pessoas = await prisma.pessoa.findMany();
    console.log('PESSOAS:', JSON.stringify(pessoas));
  } catch (e) {
    console.error('ERRO:', e.message);
  } finally {
    await prisma.$disconnect();
  }
})();
