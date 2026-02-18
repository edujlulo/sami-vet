export function normalizeStringsData<T extends Record<string, any>>(obj: T): T {
  const newObj = { ...obj };

  for (const key in newObj) {
    if (typeof newObj[key] === "string") {
      if (key === "email") {
        newObj[key] = newObj[key].toLowerCase().trim();
      } else {
        newObj[key] = newObj[key].toUpperCase().trim();
      }
    }
  }

  return newObj;
}
