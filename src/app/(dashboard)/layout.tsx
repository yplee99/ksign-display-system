import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";

/* 대시보드 전체 레이아웃
 * ┌──────────┬─────────────────────────────────┐
 * │  Sidebar │  TopBar (프로필)                 │
 * │  (160px) ├─────────────────────────────────┤
 * │          │  메인 콘텐츠                      │
 * └──────────┴─────────────────────────────────┘
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* 좌측 고정 사이드바 */}
      <Sidebar />

      {/* 우측 콘텐츠 영역 */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 상단 TopBar (프로필 메뉴) */}
        <TopBar />

        {/* 메인 스크롤 영역 */}
        <main className="flex-1 bg-content-bg overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
