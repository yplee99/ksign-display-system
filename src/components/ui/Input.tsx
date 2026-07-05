import clsx from "clsx";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-[13px] font-medium text-gray-700">{label}</label>
      )}
      <input
        className={clsx(
          "w-full px-4 py-2.5 text-[14px] bg-gray-100 rounded-full",
          "border border-transparent outline-none",
          "focus:border-primary focus:bg-white",
          "transition-colors duration-150 placeholder:text-gray-400",
          error && "border-red-400",
          className
        )}
        {...props}
      />
      {error && <p className="text-[12px] text-red-500">{error}</p>}
    </div>
  );
}
