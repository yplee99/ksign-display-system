import { LucideIcon } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

interface StatCardAction {
  label: string;
  href: string;
}

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  /* 선택적 액션 링크 (Edit playlist → 등) */
  action?: StatCardAction;
  /* 값이 길 때 두 줄 허용 여부 */
  wrapValue?: boolean;
}

export default function StatCard({
  icon: Icon,
  label,
  value,
  action,
  wrapValue = false,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 px-5 py-4 flex flex-col gap-2 min-w-0">
      {/* 아이콘 + 레이블 행 */}
      <div className="flex items-center gap-2">
        {/* 원형 아이콘 배경 */}
        <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
          <Icon size={15} className="text-primary" strokeWidth={2} />
        </div>
        <span className="text-[12px] text-gray-500 font-medium leading-tight">
          {label}
        </span>
      </div>

      {/* 주요 값 */}
      <p
        className={clsx(
          "text-[14px] font-semibold text-gray-900 leading-snug",
          !wrapValue && "truncate"
        )}
        title={value}
      >
        {value}
      </p>

      {/* 액션 링크 (Edit playlist + 형태) */}
      {action && (
        <Link
          href={action.href}
          className="text-[12px] text-primary hover:text-primary-hover hover:underline transition-colors"
        >
          {action.label} +
        </Link>
      )}
    </div>
  );
}
