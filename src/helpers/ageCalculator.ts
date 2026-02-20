export function calculateAge(birthDate: string | null): string {
  if (!birthDate) return "DESCONOCIDO";

  const birth = new Date(birthDate);
  const today = new Date();

  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  return `${years} año${years !== 1 ? "s" : ""} ${months} mes${
    months !== 1 ? "es" : ""
  }`;
}
