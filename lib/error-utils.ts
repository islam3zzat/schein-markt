const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
export function formatPrismaErrors(error: unknown) {
  if (typeof error !== "object" || error === null) return;

  if (
    "name" in error &&
    error.name === "ZodError" &&
    "issues" in error &&
    Array.isArray(error.issues)
  ) {
    return error.issues
      .map((issue) => `${issue.path.join(".")} : ${issue.message}`)
      .join(", ");
  }
  if ("name" in error && error.name === "PrismaClientValidationError") {
    return "Invalid data";
  }
  if (!("code" in error) || !("name" in error) || !("meta" in error)) return;
  if (typeof error.meta !== "object" || error.meta === null) return;
  if (!("target" in error.meta) || !error.meta.target) return;

  const {
    name,
    code,
    meta: { target },
  } = error;

  if (name === "PrismaClientKnownRequestError" && code === "P2002") {
    return capitalize(`${target} already exists`);
  }
}
