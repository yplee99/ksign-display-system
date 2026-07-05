/* 대시보드 하단 화면 미리보기 카드 컴포넌트 */
interface ScreenPreviewCardProps {
  displayName: string;
  planogramName: string;
  bgFrom: string;
  bgTo: string;
  /* 재생 진행률 0~1 */
  progress: number;
}

export default function ScreenPreviewCard({
  displayName,
  planogramName,
  bgFrom,
  bgTo,
  progress,
}: ScreenPreviewCardProps) {
  return (
    <div className="flex-shrink-0 w-[180px] flex flex-col rounded-lg overflow-hidden border border-gray-200 bg-white">
      {/* 미리보기 영역 (세로 비율 ~16:9 반전) */}
      <div
        className="h-[240px] relative flex items-center justify-center"
        style={{
          background: `linear-gradient(160deg, ${bgFrom} 0%, ${bgTo} 100%)`,
        }}
      >
        {/* 플래노그램 이름 오버레이 */}
        <span className="text-white/80 text-[11px] font-medium px-3 text-center leading-snug drop-shadow">
          {planogramName}
        </span>

        {/* 가상 선반 장식 선 */}
        <div className="absolute inset-x-3 bottom-12 h-px bg-white/20" />
        <div className="absolute inset-x-3 bottom-20 h-px bg-white/20" />
        <div className="absolute inset-x-3 bottom-28 h-px bg-white/20" />
      </div>

      {/* 하단 정보 */}
      <div className="px-3 py-2 border-t border-gray-100">
        <p className="text-[11px] text-gray-500 truncate">
          Display:{" "}
          <span className="text-gray-800 font-medium">{displayName}</span>
        </p>
      </div>

      {/* 재생 진행 바 */}
      <div className="h-1 w-full bg-gray-100">
        <div
          className="h-full bg-primary transition-all duration-500 rounded-r-full"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
