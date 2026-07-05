import PageHeader from "@/components/layout/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import ScreenPreviewCard from "@/components/dashboard/ScreenPreviewCard";
import { STAT_CARDS, PREVIEW_SCREENS } from "@/data/dummy/dashboard";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* 페이지 헤더 */}
      <PageHeader
        title="My Pharmacy"
        subtitle="Here you can find an overview of Vmotion and Vmotion content in your pharmacy."
      />

      {/* ── Stat 카드 4개 (가로 4열) ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map((card) => (
          <StatCard
            key={card.label}
            icon={card.icon}
            label={card.label}
            value={card.value}
            action={card.action ?? undefined}
            wrapValue={"wrapValue" in card ? card.wrapValue : false}
          />
        ))}
      </div>

      {/* ── 화면 미리보기 섹션 ── */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        {/* 섹션 헤더 */}
        <p className="text-[12px] text-gray-400 font-medium mb-4 uppercase tracking-wide">
          Screen Preview
        </p>

        {/* 가로 스크롤 미리보기 카드 목록 */}
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {PREVIEW_SCREENS.map((screen) => (
            <ScreenPreviewCard
              key={screen.id}
              displayName={screen.displayName}
              planogramName={screen.planogramName}
              bgFrom={screen.bgFrom}
              bgTo={screen.bgTo}
              progress={screen.progress}
            />
          ))}
        </div>

        {/* 카드 하단 진행바 범례 */}
        <div className="flex justify-center gap-6 mt-4">
          {PREVIEW_SCREENS.map((screen) => (
            <div key={screen.id} className="flex-1 max-w-[180px]">
              <div className="h-1 w-full bg-gray-100 rounded-full">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${screen.progress * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
