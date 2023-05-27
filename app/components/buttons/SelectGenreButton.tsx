"use client";

interface SelectGenreButtonProps {
  id: number;
  name: string;
  onClick: (name: string) => void;
}

const SelectGenreButton: React.FC<SelectGenreButtonProps> = ({
  name,
  id,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick}
      className="p-4 cursor-pointer text-center lg:text-lg text-xs rounded-2xl border-[1px] border-[#F692FF] bg-[#37385b94] outline-none text-white flex items-center justify-center"
    >
      {name}
    </div>
  );
};

export default SelectGenreButton;
