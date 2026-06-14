# GDAM Frontend

아이가 그린 집·나무·사람(HTP) 그림을 AI로 분석해 심리 리포트를 제공하는 서비스의 프론트엔드입니다.

---

## 팀원 및 역할

| 이름 | 담당 |
|------|------|
| 이희원 | 전체 디자인 · 로그인/회원가입 UI 구현 및 디자인 디테일 수정 · 홈,마이페이지, 로그인/회원가입 API 연동 |
| 박하은 | 홈,마이페이지,심리검사,AI 챗봇 UI 구현 · 심리검사,AI 챗봇 API 연동 |

---

## 기술 스택

| 항목 | 버전 |
|------|------|
| React | 19 |
| TypeScript | 6 |
| Vite | 8 |
| React Router DOM | 7 |
| TanStack React Query | 5 |
| Tailwind CSS | 4 |
| Axios | 1 |
| html2canvas + jsPDF | — |

---

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

### 환경 변수

`.env` 파일에 아래 변수를 설정합니다.

```env
VITE_API_BASE_URL=http://localhost:8000
```

---

## 프로젝트 구조

```
src/
├── api/                  # 일부 도메인 API 클라이언트 (home, mypage)
├── apis/                 # 공통 API 레이어
│   ├── axiosInstance.ts  # Axios 기본 설정 및 인터셉터
│   ├── queryClient.ts    # React Query 클라이언트
│   ├── chat/             # 채팅 API
│   └── test/             # HTP 검사 API
├── assets/icons/         # 도메인별 SVG/PNG 아이콘
│   ├── auth/
│   ├── chat/
│   ├── common/
│   ├── home/
│   ├── Mypage/
│   └── test/
├── components/
│   ├── common/           # 재사용 UI 컴포넌트
│   ├── chat/             # 채팅 전용 컴포넌트
│   └── home/             # 홈 전용 컴포넌트
├── contexts/             # React Context (AuthContext)
├── hooks/                # 커스텀 훅 (apiHooks)
├── layout/               # 레이아웃 컴포넌트
├── pages/
│   ├── auth/             # 로그인, OAuth 콜백, 회원가입
│   ├── chat/             # AI 챗봇
│   ├── home/             # 홈
│   ├── MyPage/           # 마이페이지
│   └── test/             # HTP 검사 플로우
├── routes/               # 라우터 설정
├── styles/               # 전역 CSS 테마
└── types/                # TypeScript 타입 정의
```

---

## 주요 기능

### 인증 (Auth)
- Google OAuth 로그인 (`/login` → 서버 `/auth/google` → `/auth/callback`)
- JWT 액세스 토큰을 `localStorage`에 저장
- `AuthContext`로 토큰 상태 전역 관리
- Axios 요청 인터셉터가 자동으로 `Authorization: Bearer <token>` 헤더 추가
- 401 응답 시 토큰 삭제 후 로그인 페이지로 리다이렉트
- 회원가입 플로우: 약관 동의 → 프로필 입력 → 자녀 정보 등록

### 홈 (`/home`)
- 서버에서 내려받은 헤드라인, 검사 카드, 챗봇 카드, 최근 리포트 카드를 렌더링
- 검사 이력이 없을 때와 있을 때 UI를 다르게 표시

### HTP 검사 플로우

```
/test (검사 목록)
  └─ /test-start           동의 및 검사 시작
       └─ /test-first-step  아이 선택 (Step 1/3)
            └─ /test-second-step  그림 업로드 (Step 2/3)
                 └─ /test-third-step   확인 (Step 3/3)
                      └─ /test-loading-step       AI 분석 대기
                           └─ /test-time-input-step   그림 소요 시간 입력
                                └─ /test-question-intro-step  PDI 질문 안내
                                     └─ /test-question-form-step  PDI 질문 응답
                                          └─ /test-result         결과 리포트
```

결과 리포트(`TestResult`)는 다음 기능을 제공합니다.
- 집·사람·나무 탭 전환으로 영역별 소견 조회
- YOLO 객체 감지 바운딩 박스 오버레이
- AI 리포트 생성 폴링 (2초 간격, 최대 90초 대기)
- 결과 공유 (Web Share API 또는 클립보드 복사)
- PDF 저장 (html2canvas + jsPDF, A4)
- 공유 전용 뷰 (`/share/result`) — 비로그인 접근 가능, URL 파라미터로 데이터 수신

### AI 챗봇 (`/chat`)
- 리포트 기반 또는 일반 육아 질문 상담
- 서버에서 추천 질문(Suggested Prompts) 수신
- 채팅 내역 조회 및 메시지 송수신

### 마이페이지 (`/mypage`)
- 사용자 프로필 조회 및 수정
- 자녀 등록·수정·추가
- 사용 가이드, FAQ, 약관 및 정책 링크
- 로그아웃 / 계정 탈퇴 (팝업 확인)

---

## 라우팅 구조

```
/                         → 토큰 유무에 따라 /home 또는 /login으로 리다이렉트
/share/result             → 공유 전용 리포트 뷰 (인증 불필요)

RootLayout
├── /login
├── /auth/callback
├── /signup/terms
├── /signup/profile
├── /signup/child
├── /test-start
├── /test-first-step
├── /test-second-step
├── /test-third-step
├── /test-loading-step
├── /test-time-input-step
├── /test-question-intro-step
├── /test-question-form-step
├── /test-result
├── /chat/intro-step
├── /chat/report/:reportId
└── NavigationLayout (하단 탭 바 포함)
    ├── /home
    ├── /test
    ├── /mypage
    ├── /profile/edit
    ├── /child/edit
    ├── /child/add
    ├── /guide
    ├── /faq
    └── /terms
```

---

## 공통 컴포넌트 (`src/components/common/`)

| 컴포넌트 | 설명 |
|----------|------|
| `ActionButton` | 주요 CTA 버튼, variant(darkGrey, lightOrange 등) 지원 |
| `BottomNavigation` | 홈·심리 검사·마이페이지 하단 탭 바 |
| `BottomSheet` | 슬라이드 업 시트 |
| `Chip` | 소형 레이블 칩 |
| `Dropdown` | 드롭다운 선택 |
| `FloatingButton` | 플로팅 액션 버튼 |
| `Popup` | 확인/취소 다이얼로그 |
| `SearchBar` | 검색 입력 필드 |
| `Tag` | 태그 뱃지 |
| `Textfield` | 폼 입력 필드 |
| `TopBar` | 페이지 상단 헤더 |

---

## 데이터 페칭

`src/hooks/apiHooks.ts`에 정의된 래퍼 훅을 사용합니다.

```ts
// GET 요청
const { data, isLoading } = useAppQuery(['key'], fetchFn, options);

// POST/PUT/DELETE 요청
const { mutate } = useAppMutation(mutationFn, { onSuccess, onError });
```

- `useAppQuery`: 기본 staleTime 5분, React Query `useQuery` 래퍼
- `useAppMutation`: 에러 타입이 `AxiosError<ApiError>`로 고정된 `useMutation` 래퍼

---

## 배포

`vercel.json`이 포함되어 있으며 Vercel에 배포됩니다.  
SPA 라우팅을 위해 모든 경로를 `index.html`로 리라이트합니다.
