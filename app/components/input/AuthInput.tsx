import clsx from "clsx";
import { UseFormRegister } from "react-hook-form";

interface AuthInputProps {
  register: UseFormRegister<{
    confirmPassword: string;
    password: string;
    email: string;
    username: string;
  }>;
  type: string;
  placeholder: string;
}

const AuthInput: React.FC<AuthInputProps> = ({
  register,
  type,
  placeholder,
}) => {
  return (
    <input
      {...register("confirmPassword", {
        required: "Repeated password is required",
      })}
      type={type}
      placeholder={placeholder}
      className={clsx(
        "px-4 py-4 rounded-2xl border-[1px] border-transparent focus:border-[#F692FF] bg-[#37385b94] outline-none text-white"
      )}
    />
  );
};

export default AuthInput;
