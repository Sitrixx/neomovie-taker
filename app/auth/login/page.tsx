"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import SocialAuthButton from "@/app/components/buttons/SocialAuthButton";
import clsx from "clsx";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { TLoginSchema, loginSchema } from "@/lib/validation/auth";
import toast from "react-hot-toast";
import axios from "axios";

const LoginForm = ({ variant, toggleVariant }: any) => {
  const router = useRouter();
  const [checked, setChecked] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: TLoginSchema) => {
    await signIn("credentials", {
      ...data,
      redirect: false,
    }).then((res) => {
      if (res?.ok) {
        toast.success("Logged in.");

        axios
          .post("/api/login", data)
          .then((res) => {
            if (res.data?.isFirstTime) {
              router.push("/first_connection");
            } else router.push("/home");
          })
          .catch((error: Error) => {
            toast.error("Can't register.");
            console.log(error);
          });
      }

      if (res?.error) {
        toast.error(res.error);
      }
    });
  };

  return (
    <div className="w-full my-2 px-4 flex items-center mx-auto lg:mx-0 justify-center sm:max-w-md md:max-w-lg flex-col">
      <SocialAuthButton
        text="Log in with Google"
        className={clsx(variant === "REGISTER" ? "hidden" : "block")}
        variant={variant}
        onClick={() => signIn("google")}
      />
      <div className="flex flex-row w-full items-center justify-center px-2 my-3">
        <hr className="w-full text-green-200" />
        <h2 className="text-white px-4">or</h2>
        <hr className="w-full bg-[#494a5e]" />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col justify-center space-y-4"
      >
        <input
          {...register("email", {
            required: "Email is required",
            minLength: {
              value: 3,
              message: "Email should be at least 3 characters long.",
            },
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
            minLength: {
              value: 8,
              message: "Password should be at least 8 characters long.",
            },
          })}
          type="password"
          placeholder="Password"
          className={clsx(
            "px-4 py-4 rounded-2xl border-[1px] border-transparent focus:border-[#F692FF] bg-[#37385b94] outline-none text-white"
          )}
        />

        <div className="w-full flex items-center justify-end">
          <label className="text-[#b9b9b9] text-sm">Remember me</label>
          <input
            type="checkbox"
            checked={checked}
            onChange={() => setChecked((prev) => !prev)}
            className="ml-2 border-2 border-[#F692FF] rounded-lg"
          />
        </div>

        <div className="flex w-full flex-row md:flex-col justify-center space-x-4 md:space-x-0">
          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full py-4 my-2 lg:text-xl md:text-lg shadow-[#F048FF] bg-[#F048FF] border-[2px] border-[#58006D] rounded-2xl text-white font-semibold text-base"
          >
            Login
          </button>
          <SocialAuthButton
            text={
              variant === "LOGIN"
                ? "Log in with Google"
                : "Register with Google"
            }
            className={clsx(variant === "LOGIN" ? "hidden" : "block")}
            variant={variant}
            onClick={() => signIn("google")}
          />
        </div>
      </form>
      <h3 className="font-extralight lg:text-xl md:text-lg text-[#D7D7D7] my-5">
        Don&apos;t have an account ?&nbsp;
        <span
          className="text-rose font-semibold cursor-pointer"
          onClick={() => toggleVariant()}
        >
          Click here
        </span>
      </h3>
    </div>
  );
};

export default LoginForm;
