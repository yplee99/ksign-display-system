import clsx from "clsx";

type BadgeVariant = "primary" | "gray" | "success" | "warning" | "running";

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
}

const VARIANTS: Record<BadgeVariant, string> = {
  primary: "bg-primary-light text-primary",
  gray:    "bg-gray-100 text-gray-600",
  success: "bg-green-100 text-green-700",
  warning: "bg-amber-100 text-amber-700",
  running: "text-primary",               /* Schedule "Running" — 텍스트만 컬러 */
};

export default function Badge({ label, variant = "gray" }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium",
        VARIANTS[variant]
      )}
    >
      {label}
    </span>
  );
}
