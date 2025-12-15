import { Button } from "../button";
import { Input } from "../input";
import { Label } from "../label";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, TRegisterValues } from "./schema";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { registerUser } from "@/app/api/action";

export const RegisterMenu = () => {
  const navigate = useRouter();
  const form = useForm<TRegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      userName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TRegisterValues) => {
    try {
      await registerUser({
        email: data.email,
        name: data.userName,
        password: data.password,
      });

      console.log("Successfull registration");
      navigate.push("/login");
    } catch (e) {
      console.error("Error [LOGIN]: ", e);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-gray-800 p-5 rounded-md shadow-lg"
        >
          <div className="flex flex-col items-center text-gray-200">
            <div>
              <h2 className="text-xl font-semibold text-center">
                Account registration
              </h2>
              <p className="text-center text-lg">
                Already{" "}
                <Link
                  href="/login"
                  className="text-blue-400 hover:text-blue-300"
                >
                  registered
                </Link>
              </p>
            </div>
            <div className="grid gap-4 mt-3 text-gray-200">
              <div className="grid gap-3">
                <Label htmlFor="email" className="text-gray-400">
                  Email
                </Label>
                <Input
                  {...form.register("email")}
                  id="email"
                  name="email"
                  type="email"
                  required
                ></Input>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="userName" className="text-gray-400">
                  User name
                </Label>
                <Input
                  {...form.register("userName")}
                  id="userName"
                  name="userName"
                  type="text"
                  required
                ></Input>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="password" className="text-gray-400">
                  Password
                </Label>
                <Input
                  {...form.register("password")}
                  id="password"
                  name="password"
                  type="password"
                  required
                ></Input>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="confirmPassword" className="text-gray-400">
                  Confirm Password
                </Label>
                <Input
                  {...form.register("confirmPassword")}
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                ></Input>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full hover:cursor-pointer text-white text-lg mt-4 bg-blue-600 hover:bg-blue-700"
            >
              Register
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
