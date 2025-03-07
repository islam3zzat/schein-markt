import { PrismaClient } from "@prisma/client";
import { sampleData } from "./sample-data";

async function main() {
  const client = new PrismaClient();
  await client.product.deleteMany();
  await client.account.deleteMany();
  await client.session.deleteMany();
  await client.verificationToken.deleteMany();
  await client.user.deleteMany();

  await client.product.createMany({
    data: sampleData.products,
  });
  await client.user.createMany({
    data: sampleData.users,
  });

  await client.$disconnect();
  console.log("Seed with sample data completed.");
}

main();
