import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient({
  // Uncomment the next line to get detailed logging
  //  log: ['query', 'info', 'warn', 'error'],
});

async function seed() {
  const parcels: Prisma.ParcelCreateInput[] = [
    {
      id: "US-MN-27003-363425430002",
      address: "5275 229TH AVENUE NORTHWEST SAINT FRANCIS 55070",
      homestead: false,
      lat: 45.38665285816786,
      lon: -93.39843984950384,
    },
    {
      id: "US-MN-27003-363425410007",
      address: "4826 232ND AVENUE NORTHWEST SAINT FRANCIS 55070",
      homestead: true,
      lat: 45.38938583142575,
      lon: -93.38901328410914,
    },
  ];

  await prisma.parcel.deleteMany({});
  for (const parcel of parcels) {
    await prisma.parcel.create({
      data: parcel,
    });
  }
  return { parcels: parcels.length };
}

async function main() {
  console.log(`Starting seeding ...`);
  const payload = await seed();
  console.log(JSON.stringify(payload));
  console.log(`Finished seeding.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
