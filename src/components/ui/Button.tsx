import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  children: ReactNode;
}

const VARIANTS: Record<Variant, string> = {
  primary:   "bg-primary text-white hover:bg-primary-hover",
  secondary: "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50",
  ghost:     "text-gray-500 hover:bg-gray-100 hover:text-gray-900",
  danger:    "bg-red-500 text-white hover:bg-red-600",
};

const SIZES: Record<Size, string> = {
  sm: "px-3 py-1.5 text-[12px] gap-1",
  md: "px-4 py-2   text-[13px] gap-1.5",
};

export default function Button({
  variant = "primary",
  size = "md",
  icon,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center font-medium rounded-full transition-colors duration-150",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
