import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToJsObject<T>(obj: T) {
  return JSON.parse(JSON.stringify(obj));
}

export function formatPrice(price: number): string {
  const [integerPart, decimalPart] = Number(price).toFixed(2).split(".");

  return `$${integerPart}.${decimalPart}`;
}
