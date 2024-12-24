import prisma from '../config/prisma/client.js';

export async function readClasses() {
  const classes = await prisma.Class.findMany({});
  return classes;
}
