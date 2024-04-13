import { Role } from "@/types";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  try {
    await seedSudo(prisma);

    console.log("Done running seeders.");
  } catch (error) {
    console.error("Error seeding the database categories", error);
  } finally {
    await prisma.$disconnect();
  }
}

async function seedSudo(prisma: PrismaClient) {
  console.log("Started: seedSudo");

  const users = [
    {
      name: "acelords",
      email: "acelords.space@gmail.com",
      role: Role.ADMIN,
      password: "acelords",
    },
    {
      name: "jack",
      email: "arifkuppa@gmail.com",
      role: Role.ADMIN,
      password: "jack",
    },
  ];

  for (const k of users) {
    await prisma.user.upsert({
      where: {
        email: k.email,
      },
      create: {
        ...k,
        password: await bcrypt.hash(k.password, 10),
      },
      update: {},
    });
  }

  console.log("Success: seedSudo");
}

main();
