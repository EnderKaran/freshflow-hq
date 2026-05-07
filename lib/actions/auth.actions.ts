"use server";

import { prisma } from "../prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await (prisma as any).user.findUnique({ where: { email } });

  if (!user) return { error: "Kullanıcı bulunamadı." };

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) return { error: "Hatalı şifre." };

  // Basit bir Session yönetimi (Gerçek projede JWT veya NextAuth önerilir)
  const cookieStore = await cookies();
  cookieStore.set("freshflow-auth", user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 gün
    path: "/",
  });

  redirect("/dashboard");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("freshflow-auth");
  redirect("/login");
}