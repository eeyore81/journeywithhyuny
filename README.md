# journeywithhyuny

React + Redux + Firebase 기반 가족 다이어리 웹 앱입니다.

## 주요 기능

- 다이어리 글 목록 조회
- 제목 검색
- 카테고리 필터
- 글 작성/수정/삭제
- 소개 페이지

## 기술 스택

- React 16
- Redux
- redux-form
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

3. 개발 서버 실행

```bash
npm start
```

4. 프로덕션 빌드

```bash
npm run build
```

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
