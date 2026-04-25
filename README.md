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

- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_DATABASE_URL`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_STORAGE_BUCKET`
- `FIREBASE_MESSAGING_SENDER_ID`
- `FIREBASE_APP_ID`
- `GAS_ENDPOINT` (GAS Web app URL)
- `GH_PAT` (GitHub Pages 배포용 퍼스널 액세스 토큰)

`GH_PAT`는 `repo` 권한이 있는 토큰이어야 합니다.

이 Secret들을 저장한 뒤 `master` 브랜치에 푸시하면 CI가 자동으로 빌드하고 같은 저장소의 GitHub Pages로 배포합니다.

## Google Apps Script(GAS) 백엔드 사용

React 앱에서 Firebase 클라이언트 SDK를 직접 호출하지 않고 Google Apps Script를 통해 Firebase 쿼리를 처리하려면 다음 환경 변수를 사용하세요.

- `REACT_APP_USE_GAS=true`
- `REACT_APP_GAS_ENDPOINT=https://script.google.com/macros/s/AKfycb.../exec`

GAS는 `gas/app.gs`에 샘플 코드가 포함되어 있습니다. 이 스크립트는 Firebase Realtime Database REST API를 호출하도록 구성되어 있으며, 다음과 같습니다:

- DB 규칙이 `".read": true` 및 `".write": true`로 열려 있다면 `FIREBASE_DATABASE_SECRET` 없이도 동작합니다.
- 최신 Firebase 콘솔에서는 `FIREBASE_DATABASE_SECRET`(legacy DB secret)이 제공되지 않을 수 있습니다.
- 보안 규칙이 닫혀 있으면 GAS 스크립트 속성에 `FIREBASE_DATABASE_SECRET`을 추가하거나 다른 인증 방식을 사용해야 합니다.

GAS 모드를 사용하면 React 앱은 Firebase config를 직접 사용하지 않고 GAS 엔드포인트로 요청을 보냅니다. 이 경우 `REACT_APP_API_KEY` 등 클라이언트 Firebase 설정은 빌드 시에 필요하지 않습니다.

이렇게 설정하면 클라이언트는 Firebase config를 직접 사용하지 않고, GAS 엔드포인트로 요청을 보냅니다. GAS 프로젝트에 저장된 비밀값은 GitHub 저장소에 올라가지 않기 때문에, 클라이언트 쪽 노출을 줄이는 데 도움이 됩니다.

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
