import PageHeader from "@/components/layout/PageHeader";

export default function DashboardPage() {
  return (
    <div className="p-6">
      <PageHeader
        title="My Pharmacy"
        subtitle="Here you can find an overview of Vmotion and Vmotion content in your pharmacy."
      />
      {/* 대시보드 콘텐츠 — 추후 구현 */}
      <div className="text-sm text-gray-400">대시보드 콘텐츠 (구현 예정)</div>
    </div>
  );
}
