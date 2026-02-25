export function normalizeStringsData<T extends Record<string, any>>(obj: T): T {
  const newObj = { ...obj };

  // Fields that should not be normalized:
  const notNormalizedFields = [
    "visitDate",
    "weightKg",
    "reasonForVisit",
    "physicalExamination",
    "diagnosis",
    "notes",
    "additionalTests",
    "treatmentGiven",
    "prescribedTreatment",
  ];

  for (const key in newObj) {
    if (typeof newObj[key] === "string") {
      if (notNormalizedFields.includes(key)) {
        newObj[key] = newObj[key];
      } else if (key === "email") {
        newObj[key] = newObj[key].toLowerCase().trim();
      } else {
        newObj[key] = newObj[key].toUpperCase().trim();
      }
    }
  }

  return newObj;
}
