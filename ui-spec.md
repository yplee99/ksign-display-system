# UI 명세서 (ui-spec.md)

> 디자인 기준: `/design/*.png` (52개 화면 시안)
> 기술 스택: Next.js 14 · TypeScript · Tailwind CSS

---

## 1. 디자인 시스템

### 1.1 색상 팔레트

```
/* 사이드바 */
sidebar-bg:        #1C2B3A   (Tailwind: custom / slate-800 근사)
sidebar-active:    #253548   (활성 메뉴 배경)
sidebar-text:      #FFFFFF   (메뉴 텍스트)
sidebar-text-muted:#94A3B8   (비활성 텍스트 / slate-400)

/* 메인 컨텐츠 */
content-bg:        #F3F4F6   (Tailwind: gray-100)
card-bg:           #FFFFFF
border:            #E5E7EB   (Tailwind: gray-200)

/* 포인트 컬러 — 버튼, 링크, 활성 상태 */
primary:           #14B8A6   (Tailwind: teal-500)
primary-hover:     #0D9488   (Tailwind: teal-600)
primary-light:     #CCFBF1   (Tailwind: teal-100)

/* 텍스트 */
text-primary:      #111827   (Tailwind: gray-900)
text-secondary:    #6B7280   (Tailwind: gray-500)
text-muted:        #9CA3AF   (Tailwind: gray-400)

/* 상태 색상 */
status-active:     #111827   (검정 — Active)
status-running:    #14B8A6   (청록 — Running)
status-error:      #EF4444   (Tailwind: red-500)
```

### 1.2 타이포그래피

```
font-family: 'Inter', system-ui, sans-serif

/* 페이지 제목 */
page-title:    font-size: 22px / font-weight: 600 / color: text-primary

/* 페이지 부제목 */
page-subtitle: font-size: 13px / font-weight: 400 / color: text-secondary

/* 사이드바 메뉴 */
nav-item:      font-size: 14px / font-weight: 400 / color: sidebar-text

/* 테이블 헤더 */
table-header:  font-size: 12px / font-weight: 500 / color: text-secondary / uppercase

/* 테이블 본문 */
table-body:    font-size: 14px / font-weight: 400 / color: text-primary

/* 링크 (테이블 내) */
table-link:    font-size: 14px / color: primary / hover: underline

/* 버튼 텍스트 */
btn-text:      font-size: 14px / font-weight: 500
```

### 1.3 간격 (Spacing)

```
/* 사이드바 */
sidebar-width-expanded:  160px
sidebar-width-collapsed:  60px
sidebar-item-px:          16px
sidebar-item-py:          10px

/* 메인 레이아웃 */
content-padding:          24px
content-gap:              24px

/* 카드 */
card-padding:             20px
card-border-radius:       8px

/* 테이블 */
table-cell-py:            12px
table-cell-px:            16px

/* 버튼 */
btn-px:                   16px
btn-py:                   8px
btn-border-radius:        20px  (pill shape — 둥근 버튼)
```

### 1.4 그림자 (Shadow)

```
card-shadow:   box-shadow: 0 1px 3px rgba(0,0,0,0.08)
modal-shadow:  box-shadow: 0 4px 24px rgba(0,0,0,0.15)
```

### 1.5 반응형 브레이크포인트

```
mobile:   < 768px    → 사이드바 숨김 (하단 탭바 대체 또는 드로어)
tablet:   768~1024px → 사이드바 아이콘만 표시 (collapsed)
desktop:  > 1024px   → 사이드바 전체 펼침 (expanded)
```

---

## 2. 전체 레이아웃 구조

```
┌─────────────────────────────────────────────────┐
│  사이드바 (160px)  │  메인 콘텐츠 영역           │
│                    │  ┌───────────────────────┐  │
│  [로고]            │  │ 페이지 헤더             │  │
│                    │  │ (제목 + 액션 버튼)      │  │
│  [메뉴 아이템들]   │  ├───────────────────────┤  │
│                    │  │                       │  │
│  [프로필]          │  │ 페이지 콘텐츠          │  │
│                    │  │                       │  │
│  [Toggle]          │  └───────────────────────┘  │
└─────────────────────────────────────────────────┘
```

### 공통 레이아웃 컴포넌트

#### `<AppLayout>`
- `<Sidebar>` (좌측 고정)
- `<main>` (flex-1, overflow-y-auto, bg-gray-100)
  - `<PageHeader>` (제목 + 부제목 + 우측 액션 버튼)
  - `{children}` (페이지 콘텐츠)

#### `<Sidebar>`
- 상단: 로고 (`BD Rowa™` → 프로젝트 로고로 교체 예정)
- 중간: 네비게이션 메뉴 목록
- 하단: 프로필 아이콘 + "Toggle navigation menu" 버튼
- 활성 메뉴: `sidebar-active` 배경 + 좌측 3px 청록 border

#### 사이드바 메뉴 구성

| 아이콘 | 레이블 | 라우트 |
|--------|--------|--------|
| LayoutDashboard | Dashboard | `/dashboard` |
| LayoutGrid | Planograms | `/planograms` |
| ListVideo | Playlists | `/playlists` |
| CalendarDays | Schedule | `/schedule` |
| AlignJustify | Pulldown Menus | `/pulldown-menus` |
| Image | Media | `/media` |
| Tag | Products | `/products` |
| Settings | Vmotion Settings | `/settings` |
| Building2 | My Organizations | `/organizations` |

---

## 3. 페이지별 UI 명세

### 3.1 로그인 페이지 (`/login`)

**레이아웃**: 전체 화면 흰 배경, 콘텐츠 좌측 상단 정렬

**구성 요소:**
- 로고 (상단 좌측, 별 아이콘 + "BD Rowa™ Vcloud" 텍스트)
- 소제목: "Sign in with your existing account" (gray-600, 14px)
- 입력 필드: Email Address (둥근 모서리, 배경 gray-100)
- 입력 필드: Password + 우측에 "Forgot your password?" 링크 (primary 색)
- Sign in 버튼 (primary 배경, pill shape, 우측 정렬)
- 구분선 + "Sign in with your BD account" 버튼 (선택 사항)

**더미 데이터:**
```ts
email: "admin@ksign.com"
password: "••••••••••••"
```

**반응형:**
- mobile: 폼 전체 너비 (padding 24px)
- desktop: 폼 너비 최대 440px

---

### 3.2 대시보드 (`/dashboard`)

**페이지 헤더:** "My Pharmacy" / 부제목: "Here you can find an overview of Vmotion and Vmotion content in your pharmacy."

**상단 Stat 카드 4개 (가로 나열, 동일 너비):**

| 카드 | 아이콘 | 값 | 액션 |
|------|--------|-----|------|
| Displays | 모니터 | "9 screens available" | - |
| Playlist | 재생목록 | "Demo mode" | Edit playlist → |
| Schedule | 캘린더 | "Autumn 2020" | Edit schedule → |
| Pharmacy date & time | 시계 | "October 12, 2020 at 9:12:37 AM GMT+2" | - |

각 카드: 흰 배경, 카드 패딩, 테두리, 아이콘(primary color) + 레이블(gray) + 값(굵게) 구조

**하단 플래노그램 미리보기 그리드:**
- 가로 스크롤 가능한 카드 목록
- 각 카드: 플래노그램 썸네일 이미지 + 하단에 "Display: [이름]" 텍스트
- 이미지 하단에 진행바 (현재 재생 위치 표시)

**더미 데이터:**
```ts
const dashboardStats = {
  displays: 9,
  playlist: "Winter Special",
  schedule: "Autumn 2025",
  datetime: "2026-07-05 09:12 AM GMT+9",
}

const previewScreens = [
  { id: 1, name: "Pharmacy Entry", thumbnail: "/dummy/screen1.jpg" },
  { id: 2, name: "Screen 11", thumbnail: "/dummy/screen2.jpg" },
  { id: 3, name: "Screen 3",  thumbnail: "/dummy/screen3.jpg" },
  { id: 4, name: "Screen 4",  thumbnail: "/dummy/screen4.jpg" },
  { id: 5, name: "Screen 5",  thumbnail: "/dummy/screen5.jpg" },
]
```

**반응형:**
- mobile: stat 카드 2×2 그리드
- tablet: stat 카드 4열 → 미리보기 가로 스크롤
- desktop: stat 카드 4열, 미리보기 가로 스크롤

---

### 3.3 플래노그램 목록 (`/planograms`)

**페이지 헤더:** "Planograms" / 우측: `+ New planogram` 버튼 (primary)

**컨트롤 바 (헤더 아래):**
- 콘텐츠 타입 탭: `All Planograms` | `Image Planograms` | `Video Planograms`
- 우측: 뷰 토글(그리드/리스트), 검색(돋보기), 필터(▼) 버튼

**카드 그리드 (기본 뷰):**
- 카드 크기: 약 220px 너비
- 썸네일 이미지 (4:5 비율)
- 카드 하단: 플래노그램 이름 + 태그 + 아이콘(즐겨찾기·편집·복사·삭제)

**필터 패널 (드롭다운):**
- 정렬 (Newest first 등)
- My Content 토글
- Favorites 토글
- Tags 다중 선택
- Authors 다중 선택
- Apply 버튼

**더미 데이터:**
```ts
const planograms = [
  { id: 1, name: "Winter Cold & Flu", type: "image", author: "Admin", tags: ["winter", "cold"], thumbnail: "/dummy/plano1.jpg" },
  { id: 2, name: "Skincare Summer",   type: "image", author: "Admin", tags: ["summer", "skincare"], thumbnail: "/dummy/plano2.jpg" },
  { id: 3, name: "Vitamin Campaign",  type: "video", author: "Admin", tags: ["vitamin"], thumbnail: "/dummy/plano3.jpg" },
  { id: 4, name: "Pain Relief",       type: "image", author: "Admin", tags: ["pain"], thumbnail: "/dummy/plano4.jpg" },
  { id: 5, name: "Children Health",   type: "image", author: "Admin", tags: ["children"], thumbnail: "/dummy/plano5.jpg" },
  { id: 6, name: "Spring Allergy",    type: "image", author: "Admin", tags: ["spring", "allergy"], thumbnail: "/dummy/plano6.jpg" },
]
```

**반응형:**
- mobile: 2열 그리드
- tablet: 3열 그리드
- desktop: 4~5열 그리드

---

### 3.4 플래노그램 편집기 (`/planograms/[id]/edit`)

**레이아웃:** 좌측 미리보기 패널 + 우측 설정 패널 (2분할)

**상단 바:**
- 좌측: 플래노그램 이름 입력 필드
- 중앙: 줌 비율 (100%)
- 우측: `✓ Save` 버튼, `✕ Close` 버튼

**좌측 사이드 아이콘 (세로 나열):**
- Overview (그리드)
- Save
- Copy
- Delete

**우측 탭 패널:** `Media` | `Design` | `Shelves` | `Products`

#### Media 탭
- Media type 드롭다운 (Background images / Header images / Videos)
- 검색 입력
- 이미지 그리드 (4열)

#### Design 탭
- Background 섹션: 배경색 색상 선택
- Header 섹션: 표시 여부 토글, 정렬(좌/중/우), 배경색, 폰트, 크기, 색상, Title/Subtitle 입력

#### Shelves 탭
- Shelf Count: 슬라이더 (1~8, 기본 5)
- Products Margin from Edge: 좌/우 슬라이더 (px)

#### Products 탭
- 상품명/코드/제조사로 검색
- Locked area (회색 블록, 드래그 배치 가능)
- 상품 목록 (이미지 + 코드 + 이름 + 팩 사이즈 + 가격)
- 드래그앤드롭으로 미리보기에 배치

---

### 3.5 플레이리스트 목록 (`/playlists`)

**페이지 헤더:** "Playlists" / 우측: `+ New playlist` 버튼

**탭:** `Playlists` | `Shared Templates`

**테이블 컬럼:** Name | Used in | Created on | Copy | Delete

**더미 데이터:**
```ts
const playlists = [
  { id: 1, name: "Winter Special",   usedIn: null,                  createdAt: "2026-01-15" },
  { id: 2, name: "Spring Campaign",  usedIn: null,                  createdAt: "2025-12-26" },
  { id: 3, name: "Daily Rotation",   usedIn: "Used in one schedule", createdAt: "2025-12-14" },
  { id: 4, name: "Promo Week",       usedIn: null,                  createdAt: "2025-12-01" },
  { id: 5, name: "Main Playlist",    usedIn: "Used in one schedule", createdAt: "2025-10-15" },
]
```

**반응형:**
- mobile: 이름 + 날짜만 표시, 액션은 아이콘
- desktop: 전체 컬럼

---

### 3.6 스케줄 (`/schedule`)

**페이지 헤더:** "Schedule" / 우측: `+ New schedule` 버튼

**테이블 컬럼:** Name | Status | Valid from | Valid until | Delete

**Status 색상:**
- Active: `text-gray-900`
- Running: `text-teal-500` (primary)
- Planned: `text-gray-400`

**더미 데이터:**
```ts
const schedules = [
  { id: 1, name: "The Elephant",      status: "Active",  validFrom: "2026-07-24", validUntil: "Indefinite" },
  { id: 2, name: "Another Schedule",  status: "Active",  validFrom: "2026-08-11", validUntil: "Indefinite" },
  { id: 3, name: "Autumn 2025",       status: "Running", validFrom: "2025-09-04", validUntil: "Indefinite" },
]
```

---

### 3.7 미디어 갤러리 (`/media`)

**페이지 헤더:** "Media" / 우측: `↑ Upload` 버튼

**탭:** `Background Images` | `Header Images` | `Videos`

**그리드 뷰:**
- 이미지 카드 (hover 시 편집/삭제 아이콘 오버레이)
- 카드 하단: 파일 이름 (hover 시 표시)

**더미 데이터:**
```ts
const mediaFiles = {
  backgrounds: [
    { id: 1, name: "winter_bg.jpg",    url: "/dummy/bg1.jpg" },
    { id: 2, name: "summer_bg.jpg",    url: "/dummy/bg2.jpg" },
    { id: 3, name: "spring_bg.jpg",    url: "/dummy/bg3.jpg" },
    { id: 4, name: "pharmacy_bg.jpg",  url: "/dummy/bg4.jpg" },
  ],
  headers: [
    { id: 5, name: "header_promo.jpg", url: "/dummy/h1.jpg" },
    { id: 6, name: "header_sale.jpg",  url: "/dummy/h2.jpg" },
  ],
  videos: [
    { id: 7, name: "brand_video.mp4",  url: "/dummy/v1.mp4" },
  ],
}
```

**반응형:**
- mobile: 2열 그리드
- tablet: 4열 그리드
- desktop: 6열 그리드

---

### 3.8 제품 목록 (`/products`)

**페이지 헤더:** "Products" / 우측: 검색 아이콘

**테이블 컬럼:** Product Name | Product Code | Manufacturer | Dosage Form | Pack Size | Price

**특이사항:**
- 취소선 표시 제품: 단종 예정 (crossed-through)
- 이름 클릭 시 상세 페이지로 이동

**더미 데이터:**
```ts
const products = [
  { id: 1, name: "Aspirin Complex 10 St",     code: "00000001", manufacturer: "Bayer AG",     dosageForm: "Granulat", packSize: "10 St",  price: 9.70 },
  { id: 2, name: "Ibuprofen 400mg 20 St",      code: "00000002", manufacturer: "Ratiopharm",  dosageForm: "Tablette", packSize: "20 St",  price: 5.34 },
  { id: 3, name: "Vitamin C 1000 30 St",       code: "00000003", manufacturer: "Doppelherz",  dosageForm: "Tablette", packSize: "30 St",  price: 12.50 },
  { id: 4, name: "Paracetamol 500mg 10 St",    code: "00000004", manufacturer: "Hexal AG",    dosageForm: "Tablette", packSize: "10 St",  price: 2.50 },
  { id: 5, name: "Omeprazol 20mg 14 St",       code: "00000005", manufacturer: "Stada GmbH",  dosageForm: "Kapsel",  packSize: "14 St",  price: 6.90 },
  { id: 6, name: "Loratadin 10mg 20 St",       code: "00000006", manufacturer: "Ratiopharm",  dosageForm: "Tablette", packSize: "20 St",  price: 4.80 },
]
```

---

### 3.9 제품 상세 (`/products/[id]`)

**브레드크럼:** `Products > [제품명]`

**탭:** `Product properties` | `Product recommendations` | `Alternative products` | `Product variants`

#### Product properties 탭

- 좌측: 제품 이미지 (정방형)
- 우측: 메타 정보 그리드 (Product code, Manufacturer, Pack size, Product Group, Pharmacy only, Dosage form, Last updated, Last imported, Report Issue 링크)
- 하단: Prices 섹션
  - 안내 배너 (IT 시스템에서 가격 사용 시 표시)
  - 라디오 버튼: RRP / Own price / Promotion price
  - 해당 가격 입력 필드
- 우측 하단: Cancel / Save 버튼

#### Product recommendations / Alternative products 탭
- 좌측: 배치된 추천/대안 제품 슬롯 (드래그앤드롭)
- 우측: 검색 + 제품 목록 (이미지 + 코드 + 이름 + 팩사이즈 + 가격)

#### Product variants 탭
- 아코디언 목록 (각 variant: 용량, 제조사, 팩사이즈, 제형)
- 각 variant 펼치면: 가격 설정 + 충성 포인트 + Discreet/Profit/Visibility 설정

---

### 3.10 Vmotion 설정 (`/settings`)

**탭:** `Prices` | `Product Pop-Up` | `Vmotion Effects` | `Product Barcodes` | `Vmotion Screen`

각 탭은 토글/라디오/슬라이더 조합의 설정 폼.
우측 하단 공통: `Save` 버튼

---

### 3.11 프로필 (`/profile`)

**섹션:**
- Profile Details: Full Name, E-mail
- Preferences: Language 드롭다운, Region 드롭다운
- Password: Change password 링크
- About Vmotion Cloud: Front/Back End Version, Release Notes 링크

---

## 4. 공통 컴포넌트 목록

| 컴포넌트 | 파일 경로 | 설명 |
|----------|-----------|------|
| `Button` | `ui/Button.tsx` | primary/secondary/danger variant, pill shape |
| `Input` | `ui/Input.tsx` | 텍스트 입력 (둥근 모서리, gray-100 배경) |
| `Badge` | `ui/Badge.tsx` | 태그/상태 표시 (teal, gray) |
| `Table` | `ui/Table.tsx` | 공통 테이블 (헤더 고정, hover 효과) |
| `Card` | `ui/Card.tsx` | 흰 배경, 그림자, 둥근 모서리 |
| `Modal` | `ui/Modal.tsx` | 다이얼로그 (삭제 확인, 폼 등) |
| `Tabs` | `ui/Tabs.tsx` | 언더라인 탭 스타일 |
| `Sidebar` | `layout/Sidebar.tsx` | 다크 네이비 좌측 사이드바 |
| `PageHeader` | `layout/PageHeader.tsx` | 제목 + 부제목 + 우측 액션 |
| `StatCard` | `dashboard/StatCard.tsx` | 대시보드 stat 카드 |
| `PlanogramCard` | `planograms/PlanogramCard.tsx` | 썸네일 + 이름 + 액션 |
| `MediaCard` | `media/MediaCard.tsx` | 미디어 파일 카드 (hover 오버레이) |
| `SearchInput` | `ui/SearchInput.tsx` | 검색 입력 (돋보기 아이콘 포함) |
| `FilterPanel` | `ui/FilterPanel.tsx` | 드롭다운 필터 패널 |

---

## 5. 폴더 구조

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── forgot-password/page.tsx
│   └── (dashboard)/
│       ├── layout.tsx          ← AppLayout (사이드바 포함)
│       ├── dashboard/page.tsx
│       ├── planograms/
│       │   ├── page.tsx
│       │   └── [id]/edit/page.tsx
│       ├── playlists/page.tsx
│       ├── schedule/page.tsx
│       ├── pulldown-menus/page.tsx
│       ├── media/page.tsx
│       ├── products/
│       │   ├── page.tsx
│       │   └── [id]/page.tsx
│       ├── settings/page.tsx
│       └── organizations/page.tsx
├── components/
│   ├── ui/                     ← 공통 UI 컴포넌트
│   ├── layout/                 ← Sidebar, PageHeader
│   ├── dashboard/
│   ├── planograms/
│   ├── playlists/
│   ├── media/
│   └── products/
├── data/
│   └── dummy/                  ← 더미 데이터 (*.ts)
└── types/
    └── index.ts                ← 공통 TypeScript 인터페이스
```

---

## 6. 더미 데이터 전략

- 모든 더미 데이터는 `src/data/dummy/` 에 TypeScript 파일로 관리
- API 연동 전까지 각 페이지에서 import 하여 사용
- 파일: `planograms.ts`, `playlists.ts`, `schedules.ts`, `media.ts`, `products.ts`, `organizations.ts`
- 이미지 더미: `/public/dummy/` 에 placeholder 이미지 사용 (예: `https://placehold.co/400x500`)

---

## 7. 디자인 참조 이미지 목록

| 화면 | 파일 |
|------|------|
| 로그인 | `login-ui-design.png` |
| 대시보드 | `dashboard-ui-design.png` |
| 플래노그램 목록 | `planograms-ui-design.png` |
| 플래노그램 생성 | `create new planogram-ui-design.png` |
| 플래노그램 편집 (Media탭) | `create new planogram-media tab-ui-design.png` |
| 플래노그램 편집 (Design탭) | `create new planogram-design tab-ui-design.png` |
| 플래노그램 편집 (Shelves탭) | `create new planogram-shelves tab-ui-design.png` |
| 플래노그램 편집 (Products탭) | `create new planogram-products tab-ui-design.png` |
| 플레이리스트 목록 | `playlists-ui-design.png` |
| 플레이리스트 상세 | `playlist detail-ui-design.png` |
| 스케줄 목록 | `schedule-ui-design.png` |
| 스케줄 생성 | `new schedule-ui-design.png` |
| 미디어 | `media-ui-design.png` |
| 제품 목록 | `products-ui-design.png` |
| 제품 속성 | `product properties1-ui-design.png` |
| 제품 추천 | `product recommendations-ui-design.png` |
| Vmotion 설정 (가격) | `vmotion settings-prices-ui-design.png` |
| 프로필 | `profiles-ui-design.png` |
| 조직 관리 | `organizations-ui-design.png` |
