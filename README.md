# journeywithhyuny

React + Redux + Firebase 기반 가족 다이어리 웹 앱입니다.

## 주요 기능

- 다이어리 글 목록 조회
- 제목 검색
- 카테고리 필터
- 글 작성/수정/삭제
- 소개 페이지

## 기술 스택

- React 18
- Redux
- React Router DOM v5
- Firebase Realtime Database
- Semantic UI React

## 실행 방법

1. 패키지 설치

```bash
npm install
```

2. 환경 변수 설정 (`.env` 파일 생성)

```bash
REACT_APP_API_KEY=...
REACT_APP_AUTH_DOMAIN=...
REACT_APP_DATABASE_URL=...
REACT_APP_PROJECT_ID=...
REACT_APP_STORAGE_BUCKET=...
REACT_APP_MESSAGING_SENDER_ID=...
REACT_APP_APP_ID=...
```

### Firebase 키 발급 방법

1. Firebase 콘솔에 로그인합니다: https://console.firebase.google.com/
2. 새 프로젝트를 만들거나 기존 프로젝트를 선택합니다.
3. 프로젝트 설정으로 이동한 뒤 새 웹 앱을 등록합니다.
4. Firebase SDK 구성 정보에서 `apiKey`, `authDomain`, `databaseURL`, `projectId`, `storageBucket`, `messagingSenderId`, `appId` 값을 복사합니다.
5. 복사한 값을 `.env` 파일에 붙여넣습니다.

### Realtime Database 설정

1. Firebase 콘솔에서 **Realtime Database**를 선택합니다.
2. 데이터베이스가 없다면 새로 생성합니다.
3. 규칙 탭에서 임시로 다음을 사용합니다.

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

4. 배포 시에는 반드시 보안 규칙을 강화하세요.

3. 개발 서버 실행

```bash
npm start
```

4. 프로덕션 빌드

```bash
npm run build
```

## GitHub Actions 배포 설정

이 프로젝트는 GitHub Actions를 사용해서 빌드와 GitHub Pages 배포를 자동화할 수 있습니다.

필요한 Secret:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_STORAGE_BUCKET` (선택, 기본값: `blog-images`)
- `GH_PAT` (GitHub Pages 배포용 퍼스널 액세스 토큰)

`GH_PAT`는 `repo` 권한이 있는 토큰이어야 합니다.

이 Secret들을 저장한 뒤 `master` 브랜치에 푸시하면 CI가 자동으로 빌드하고 같은 저장소의 GitHub Pages로 배포합니다.

## Supabase 백엔드 사용

이 프로젝트는 Supabase를 데이터베이스와 스토리지로 사용하도록 변경되었습니다.

React 앱은 Supabase 클라이언트 SDK를 통해 직접 데이터 읽기/쓰기와 이미지 업로드를 처리합니다.

필요한 환경 변수:

- `REACT_APP_SUPABASE_URL`
- `REACT_APP_SUPABASE_ANON_KEY`
- `REACT_APP_SUPABASE_STORAGE_BUCKET` (선택, 기본값: `blog-images`)

스토리지 버킷은 공개 액세스가 가능한 버킷으로 구성해야 하며, 기본값으로 `blog-images`를 사용합니다.

Supabase를 사용하면 GAS 중간 서버 없이도 GitHub Pages 호스팅 환경에서 바로 데이터와 이미지 업로드가 가능합니다.

## 데이터 구조 (Realtime Database)

```json
{
	"blog": {
		"-generatedKey": {
			"title": "Post title",
			"category": "Category name",
			"comment": "Post content",
			"mediaLink": "https://www.youtube.com/embed/..."
		}
	},
	"category": ["Hyuny", "Family", "Travel"]
}
```

## 폴더 구조

```text
src/
	actions/
	components/
		firebase/
	reducers/
	store/
public/
style/
```

## 이번 리팩토링에서 정리한 내용

- 라우팅 구조 정리 (`Switch` + fallback redirect)
- 인증 리듀서 버그 수정 (`action.state` -> `action.type`)
- 헤더 검색 로직 런타임 오류 수정
- Firebase 중복 초기화 방지
- JSX/DOM 속성 경고 정리 (`class` -> `className`, `frameborder` -> `frameBorder`)
- 불필요한 import 및 디버그 로그 제거
- null/undefined 안전성 보강

## 알려진 제약 사항

- 의존성이 오래된 버전이라 최신 Node.js 환경에서 경고가 발생할 수 있습니다.
- `react-scripts` 버전이 낮아 최신 CRA 프로젝트와 설정 방식이 다릅니다.

## 향후 개선 제안

- React Router v6로 마이그레이션
- Redux Toolkit 도입
- 글/카테고리 타입 검증 추가
- 테스트 코드(Jest + React Testing Library) 추가
