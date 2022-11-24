import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function justDigits(digits: number[]) {
  let justDigits = '';
  for (let c = 0; c < digits.length; c++) {
    if (digits[c] < 16) {
      justDigits += '0';
    }
    justDigits += digits[c].toString(16);
  }
  return justDigits;
}

function createEUI() {

  const EUI = [
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256)
  ];

  EUI[0] = (EUI[0] & ~1) | 2;

  return `eui-${justDigits(EUI)}`;
}

async function main() {

  const ids = Array.from({ length: 100 }).map(() => ({ gatewayId: createEUI() }));

  const t = await prisma.gateway.createMany({
    data: ids
  });
  console.log(`🌱 ${t.count} items seeded.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });