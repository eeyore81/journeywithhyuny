# Google Apps Script proxy for Firebase

이 폴더에는 React 클라이언트가 직접 Firebase에 접속하지 않고, GAS가 대신 Firebase Realtime Database REST API를 호출하도록 하는 샘플 코드가 들어 있습니다.

## 사용 방법

1. Google Apps Script 프로젝트를 만들고 `app.gs` 내용을 복사합니다.
2. `Properties > Script properties`에서 다음 값을 등록합니다:
   - `FIREBASE_DATABASE_URL`
   - `FIREBASE_DATABASE_SECRET` (필요한 경우)
3. 배포 > 새 웹 앱으로 배포하고 URL을 복사합니다.
4. React 앱 `.env`에 설정합니다:
   - `REACT_APP_USE_GAS=true`
   - `REACT_APP_GAS_ENDPOINT=https://script.google.com/macros/s/....../exec`

이후 React 앱은 GAS 엔드포인트로 요청을 보내고, GAS가 Firebase를 대신 호출합니다.
