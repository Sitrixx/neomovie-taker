"use client";

import clsx from "clsx";
import { useCallback, useState } from "react";
import LoginForm from "./login/page";
import RegisterForm from "./register/page";
import Link from "next/link";

type Variant = string;

export default function Home() {
  const [variant, setVariant] = useState<Variant>("LOGIN");

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  return (
    <div
      className={clsx(
        "min-h-full bg-center bg-cover bg-no-repeat flex flex-row justify-center",
        variant === "REGISTER"
          ? "bg-register"
          : "bg-connexion bg-right lg:bg-center"
      )}
    >
      <div className="my-8 px-6 md:px-14 w-full max-w-screen-2xl mx-auto space-y-8 md:space-y-20">
        <div className="relative top-0 flex justify-between py-5 px-4 lg:px-5 lg:py-3">
          <h1 className="font-bold text-xl py-2 uppercase text-white">
            <Link href={"/"}>Neomovie</Link>
          </h1>
        </div>
        <div className="space-y-6 flex flex-col items-center justify-center">
          <div className="max-w-fit mx-auto px-4 sm:max-w-md md:max-w-lg lg:max-w-fit lg:mx-0 lg:px-5">
            <h1 className="mt-4 text-center text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-medium tracking-tight text-white">
              <span className="text-rose font-semibold">
                {variant === "LOGIN" ? "Connect to" : "Create"}
              </span>{" "}
              your account
            </h1>
          </div>
          <div
            className={clsx(
              "max-w-fit mx-auto text-base mt-1 lg:text-xl md:text-lg text-[#D7D7D7] flex items-center justify-center lg:my-4 font-extralight px-4 sm:max-w-md md:max-w-lg lg:max-w-fit lg:mx-0 lg:px-5",
              variant === "LOGIN" ? "lg:mb-2" : "mb-6 lg:mb-8"
            )}
          >
            {variant === "LOGIN" ? (
              <h1 className="tracking-tighter md:tracking-wider text-center">
                <span className="font-semibold">Continue</span> with Google or{" "}
                <span className="font-semibold">enter</span> your details.
              </h1>
            ) : (
              <h1>
                Already have an account ?{" "}
                <span
                  className="text-rose font-semibold cursor-pointer"
                  onClick={() => toggleVariant()}
                >
                  Click here
                </span>
              </h1>
            )}
          </div>
          {variant === "LOGIN" ? (
            <LoginForm variant={variant} toggleVariant={toggleVariant} />
          ) : (
            <RegisterForm variant={variant} toggleVariant={toggleVariant} />
          )}
        </div>
      </div>
    </div>
  );
}
