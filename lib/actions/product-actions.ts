"use server";

import { PrismaClient } from "@prisma/client";
import { convertToJsObject } from "../utils";
import { LATEST_PRODUCTS_LIMIT } from "../constants/products";

export async function getLatestProducts() {
  const client = new PrismaClient();
  const products = await client.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: {
      createdAt: "desc",
    },
  });

  client.$disconnect();
  return convertToJsObject(products);
}
