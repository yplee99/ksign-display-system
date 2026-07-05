import Sidebar from "@/components/layout/Sidebar";

/* 대시보드 전체 레이아웃 — 사이드바 + 메인 콘텐츠 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* 좌측 고정 사이드바 */}
      <Sidebar />

      {/* 우측 메인 콘텐츠 */}
      <main className="flex-1 bg-content-bg overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
