import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  /* 우측 액션 버튼 영역 (선택) */
  action?: ReactNode;
}

/* 모든 대시보드 페이지 공통 헤더 */
export default function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="text-[22px] font-semibold text-gray-900 leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[13px] text-gray-500 mt-0.5 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="flex-shrink-0 ml-4">{action}</div>}
    </div>
  );
}
