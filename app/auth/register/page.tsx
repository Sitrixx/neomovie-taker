"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import SocialAuthButton from "@/app/components/buttons/SocialAuthButton";
import { registerSchema, TRegisterSchema } from "@/lib/validation/auth";
import clsx from "clsx";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface RegisterFormProps {
  variant: string;
  toggleVariant: () => void;
}

const RegisterForm = ({ variant, toggleVariant }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TRegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: TRegisterSchema) => {
    setIsLoading(true);

    await axios
      .post("/api/register", data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Registered");
          setIsLoading(false);
        }
      })
      .catch((error: Error) => {
        toast.error("Can't register.");
        console.log(error);
      })
      .finally(() => {
        toggleVariant();
      });
  };

  return (
    <div className="w-full px-4 flex items-center mx-auto lg:mx-0 justify-center sm:max-w-md md:max-w-lg lg:max-w-lg flex-col">
      <SocialAuthButton
        text="Log in with Google"
        className={clsx(variant === "REGISTER" ? "hidden" : "block")}
        variant={variant}
        onClick={() => signIn("google")}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col justify-center space-y-5"
      >
        <input
          {...register("name", {
            required: "Username is required",
          })}
          type="username"
          placeholder="Username"
          className={clsx(
            "px-4 py-4 rounded-2xl border-[1px] border-transparent focus:border-[#F692FF] bg-[#37385b94] outline-none text-white"
          )}
        />
        {errors.name && (
          <p className="text-red-500 text-xs md:text-sm">
            {errors.name?.message}
          </p>
        )}
        <input
          {...register("email", {
            required: "Email is required",
          })}
          type="email"
          placeholder="Email"
          className={clsx(
            "px-4 py-4 rounded-2xl border-[1px] border-transparent focus:border-[#F692FF] bg-[#37385b94] outline-none text-white"
          )}
        />
        <input
          {...register("password", {
            required: "Password is required",
          })}
          type="password"
          placeholder="Password"
          className={clsx(
            "px-4 py-4 rounded-2xl border-[1px] border-transparent focus:border-[#F692FF] bg-[#37385b94] outline-none text-white"
          )}
        />
        {errors.password && (
          <p className="text-red-500 text-xs md:text-sm">
            {errors.password?.message}
          </p>
        )}
        <input
          {...register("confirmPassword", {
            required: "Repeated password is required",
          })}
          type="password"
          placeholder="Repeat password"
          className={clsx(
            "px-4 py-4 rounded-2xl border-[1px] border-transparent focus:border-[#F692FF] bg-[#37385b94] outline-none text-white"
          )}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs md:text-sm">
            {errors.confirmPassword?.message}
          </p>
        )}

        <div className="flex w-full flex-row md:flex-col justify-center space-x-4 md:space-x-0">
          <button
            disabled={isSubmitting}
            type="submit"
            className="px-12 py-4 my-2 bg-[#F048FF] border-[1px] border-[#58006D] rounded-2xl text-white font-semibold text-base"
          >
            Register
          </button>
          <SocialAuthButton
            text={
              variant === "LOGIN"
                ? "Log in with Google"
                : "Register with Google"
            }
            onClick={() => signIn("google")}
            className={clsx(variant === "LOGIN" ? "hidden" : "block")}
            variant={variant}
          />
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
