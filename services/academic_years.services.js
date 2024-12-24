import prisma from '../config/prisma/client.js';

export async function readAcademicYears() {
  const years = await prisma.AcademicYear.findMany({});
  return years;
}
