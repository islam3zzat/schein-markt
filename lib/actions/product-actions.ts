"use server";

import { convertToJsObject, roundToTwoDecimals } from "../utils";
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

  products.forEach((product) => {
    // @ts-expect-error untyped property
    product.price = roundToTwoDecimals(product.price);
  });

  return convertToJsObject(products);
}

export async function getProductBySlug(slug: string): Promise<Product> {
  const product = await prisma.product.findFirst({ where: { slug } });
  if (product?.price) {
    // @ts-expect-error untyped property
    product.price = parseFloat(product.price.toString());
  }

  return convertToJsObject(product);
}
