import clsx from "clsx";
import { Search } from "lucide-react";
import { InputHTMLAttributes } from "react";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
}

export default function SearchInput({ containerClassName, className, ...props }: SearchInputProps) {
  return (
    <div className={clsx("relative", containerClassName)}>
      <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      <input
        type="text"
        className={clsx(
          "pl-8 pr-3 py-1.5 text-[13px] bg-gray-50 border border-gray-200 rounded-md",
          "focus:outline-none focus:border-primary transition-colors w-full",
          className
        )}
        {...props}
      />
    </div>
  );
}
