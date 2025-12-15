"use server";

import { prisma } from "@/shared/lib/prisma/prisma-client";
import { Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";

export async function registerUser(body: Prisma.UsersCreateInput) {
  try {
    const user = await prisma.users.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      throw new Error("User is already created");
    }

    await prisma.users.create({
      data: {
        name: body.name,
        password: hashSync(body.password, 10),
        email: body.email,
      },
    });
  } catch (e) {
    console.log("Error [CREATE_USER] ", e);
    throw e;
  }
}
