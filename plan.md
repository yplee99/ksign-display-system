# 개발 계획 (plan.md)

## 프로젝트 목표

BD Rowa™ Vmotion을 참조하여, **AI 기반 디지털 사이니지 및 3D 가상 진열장 시스템**을 자체 개발한다.
약국·소매점에서 사용할 수 있는 터치스크린 디스플레이 솔루션으로, 클라우드 관리 포털과 디스플레이 앱으로 구성한다.

---

## 시스템 구성

```
[관리자 웹 포털 (Cloud)]
       ↓ API
[디스플레이 앱 (NUC/SoC)]
       ↓
[터치스크린 디스플레이]
```

### 1. 관리자 웹 포털
- 플래노그램 생성·편집
- 플레이리스트·스케줄 관리
- 미디어(이미지·비디오) 업로드·관리
- 제품 정보·가격·재고 관리
- 다중 매장 조직 관리

### 2. 디스플레이 앱
- 플래노그램 렌더링 (3D 제품 뷰 포함)
- 터치 인터랙션 처리
- 클라우드와 실시간 동기화
- 조제 로봇 연동 (향후)

---

## 개발 단계

### Phase 1 — 기반 설계 ✅ 완료
- [x] 기술 스택 확정 (Next.js 14 + TypeScript + Tailwind CSS)
- [x] 디자인 시안 분석 (`/design/*.png` 52개 화면)
- [x] UI 스펙 문서 작성 (`ui-spec.md`)
- [x] 데이터 모델 설계 (더미 데이터로 엔티티 구조 확정)
- [x] Next.js 프로젝트 초기화 및 폴더 구조 설정
- [x] Tailwind 커스텀 테마 설정 (sidebar, primary, content 컬러)
- [ ] API 설계 문서화 (REST endpoints 명세) → Phase 3 진입 전 작성

### Phase 2 — 관리자 포털 UI 구현 (프론트엔드 우선)
> 디자인 기준: `/design/` 폴더 참조 / 세부 스펙: `ui-spec.md` 참조

#### 공통 레이아웃 ✅ 완료
- [x] 사이드바 네비게이션 (다크 네이비, 접힘/펼침, 활성 teal border)
- [x] TopBar (프로필 드롭다운)
- [x] 전체 페이지 레이아웃 (Sidebar + TopBar + 메인 콘텐츠)
- [x] 공통 UI 컴포넌트 (Button, Input, Badge, SearchInput)
- [ ] 반응형 완성 (모바일 햄버거 메뉴 · 태블릿 레이아웃)

#### 인증 화면
- [x] 로그인 페이지 (`/login`)
- [ ] 비밀번호 재설정 (`/forgot-password` → 인증코드 → 새 비밀번호)

#### 주요 페이지
- [x] 대시보드 (`/dashboard`) — StatCard 4개 + 화면 미리보기 그리드
- [x] 플래노그램 목록 (`/planograms`) — 컬러 카드 그리드, 타입 필터, 즐겨찾기
- [x] 플레이리스트 목록 (`/playlists`) — 탭(Playlists/Shared Templates), 테이블
- [x] 스케줄 목록 (`/schedule`) — 상태별 컬러 테이블
- [x] 풀다운 메뉴 (`/pulldown-menus`) — 그라디언트 카드, 스크린 선택
- [x] 미디어 갤러리 (`/media`) — 탭 갤러리, hover 오버레이
- [x] 제품 목록 (`/products`) — 테이블, 취소선(단종), 검색
- [x] 제품 상세 (`/products/[id]`) — 4탭 (속성/추천/대안/변형) + 가격 라디오
- [x] Vmotion 설정 (`/settings`) — 5탭 설정폼
- [x] 조직 관리 (`/organizations`) — 3탭 테이블
- [x] **플래노그램 편집기** (`/planograms/[id]/edit`) — 다크 UI, 4탭(Media·Design·Shelves·Products), 캔버스 미리보기, 미니 툴바
- [x] **플레이리스트 상세 편집** (`/playlists/[id]`) — 스크린별 슬롯, 플래노그램 컬렉션 패널, Rotation Time 설정
- [x] **스케줄 캘린더 편집** (`/schedule/[id]`) — 주간 타임라인, 플레이리스트 블록 시각화, 클릭으로 블록 추가
- [x] **프로필 설정** (`/profile`) — Profile Details · Preferences · Password · About 섹션
- [x] **비밀번호 재설정** (`/forgot-password`) — 4단계 플로우 (이메일 → 인증코드 → 새 비밀번호 → 완료)

### Phase 3 — 백엔드 API 연동
- [ ] Next.js API Routes 또는 별도 백엔드 서버
- [ ] 인증 API (JWT)
- [ ] 플래노그램·플레이리스트·스케줄 CRUD API
- [ ] 미디어 업로드 API (S3 연동)
- [ ] 제품 데이터 API
- [ ] 실시간 동기화 (WebSocket)

### Phase 4 — 디스플레이 앱 MVP
- [ ] 플래노그램 렌더링 엔진
- [ ] 터치 제스처 처리
- [ ] 플레이리스트 자동 순환
- [ ] 제품 상세 팝업
- [ ] 클라우드 동기화 (5분 주기)

### Phase 5 — 고도화
- [ ] 3D 제품 뷰 (Three.js)
- [ ] AI 기반 제품 추천 (Claude API)
- [ ] 약국 IT 시스템 가격 자동 연동
- [ ] 조제 로봇 연동
- [ ] 분석 대시보드


---

## 기술 스택 (확정)

| 영역 | 기술 |
|------|------|
| 관리자 포털 프론트엔드 | **Next.js 14 (App Router) + TypeScript + Tailwind CSS** |
| 디스플레이 앱 | Electron + React 또는 웹앱 (Chromium 키오스크 모드) |
| 백엔드 API | Node.js (Express/Fastify) 또는 Python (FastAPI) |
| 데이터베이스 | PostgreSQL (제품·플래노그램), S3 호환 스토리지 (미디어) |
| 실시간 동기화 | WebSocket 또는 SSE |
| 3D 렌더링 | Three.js (WebGL) |
| AI 추천 | Claude API |
| 인증 | JWT + 이메일 인증 |

---

## 데이터 모델 (초안)

### 주요 엔티티

- **Organization** — 매장/약국 단위 조직
- **Screen** — 연결된 디스플레이 장치
- **Media** — 업로드된 이미지·비디오 파일
- **Product** — 제품 정보 (이름, 코드, 가격, 재고, 이미지)
- **ProductVariant** — 제품의 용량별 변형 (팩 사이즈, 가격)
- **Planogram** — 가상 선반 (배경, 헤더, 선반 수, 제품 배치 정보)
- **Playlist** — 플래노그램 목록 + 각 표시 시간(rotation interval)
- **Schedule** — 플레이리스트 + 적용 날짜·시간 범위
- **PulldownMenu** — 풀다운 메뉴에 표시할 플래노그램 목록

---

## 미디어 규격 (구현 기준)

- 배경·파노라마 이미지: 최소 1585 × 1920 px, JPG/PNG/PDF
- 헤더 이미지: 최소 1585 × 300 px, JPG/PNG/PDF
- 비디오: Full HD, MP4, 최대 350MB
- 업로드 시 서버에서 규격 자동 검증

---

## 플래노그램 디자인 규칙 (구현 기준)

- 선반당 제품 최대 4개
- 선반 수 4~5개 권장 (최소 1, 최대 설정 가능)
- 동일 제품 스태킹: 가로 최대 4, 세로 최대 3
- 제품 간 여백 및 선반 끝 여백 자동 적용

---

## 현재 상태

- **2026-07-05**: Phase 2 완료 → Phase 3(백엔드) 진입 준비 완료
  - Phase 1 전체 완료
  - Phase 2: 전체 16개 페이지 구현 완료 (반응형 모바일 제외)
  - 남은 항목: 반응형 모바일 레이아웃 (선택 사항, Phase 3 병행 가능)
  - 다음 단계: Phase 3 백엔드 API 구축
