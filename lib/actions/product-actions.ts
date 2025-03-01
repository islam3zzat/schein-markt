"use server";

import { convertToJsObject } from "../utils";
import { LATEST_PRODUCTS_LIMIT } from "../constants/products";
import { prisma } from "@/db/prisma";
import { Product } from "@/types/product";

export async function getLatestProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: {
      createdAt: "desc",
    },
  });

  return convertToJsObject(products);
}

export async function getProductBySlug(slug: string): Promise<Product> {
  const product = await prisma.product.findFirst({ where: { slug } });

  return convertToJsObject(product);
}
