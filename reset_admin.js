const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.user.update({
  where: { email: 'admin@hs21schools.com' },
  data: { password: 'password123' }
}).then(console.log).finally(() => prisma.$disconnect());
