import { PrismaClient } from "@prisma/client";
import sampleData from "./sample-data";

async function main() {
  const client = new PrismaClient();
  await client.product.deleteMany();

  await client.product.createMany({
    data: sampleData.products,
  });

  await client.$disconnect();
  console.log("Seed with sample data completed.");
}

main();
