"use client";

import clsx from "clsx";
import { FcGoogle } from "react-icons/fc";

interface SocialAuthButtonProps {
  text: string;
  className: string;
  variant: string;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const SocialAuthButton: React.FC<SocialAuthButtonProps> = ({
  text,
  className,
  variant,
  onClick,
}) => {
  return (
    <div
      className={`cursor-pointer p-3 mx-3 my-2 w-full flex items-center justify-center bg-[#37385ba0] border-[1px] rounded-2xl border-[#F692FF] text-white font-medium ${className}`}
      onClick={onClick}
    >
      <FcGoogle size={30} className="mx-2" />
      <span className={clsx("md:block", variant === "REGISTER" && "hidden")}>
        {text}
      </span>
    </div>
  );
};

export default SocialAuthButton;
