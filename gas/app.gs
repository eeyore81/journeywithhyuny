// Google Apps Script Firebase proxy for Realtime Database
// Set these script properties in your GAS project:
//   FIREBASE_DATABASE_URL = https://the-journey-with-hyuny.firebaseio.com
//   FIREBASE_DATABASE_SECRET = <your realtime database secret or auth token> (optional if DB rules are open)
// Note: 최신 Firebase 콘솔에서는 legacy Database Secret이 제공되지 않을 수 있습니다.
// 이 경우 Realtime DB 보안 규칙을 열거나 서비스 계정/OAuth 인증을 사용해야 합니다.

const FIREBASE_DB_URL = PropertiesService.getScriptProperties().getProperty('FIREBASE_DATABASE_URL');
const FIREBASE_DB_SECRET = PropertiesService.getScriptProperties().getProperty('FIREBASE_DATABASE_SECRET');

function doGet() {
  return jsonResponse({ ok: true, message: 'Firebase GAS proxy is running.' });
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const action = body.action;
    const payload = body.payload || {};

    if (!FIREBASE_DB_URL) {
      return jsonResponse({ error: 'FIREBASE_DATABASE_URL is not configured.' });
    }

    switch (action) {
      case 'getBlogs':
        return jsonResponse({ data: getJson('blog.json') });
      case 'getCategories':
        return jsonResponse({ data: getJson('category.json') });
      case 'addBlog':
        return jsonResponse({ data: pushJson('blog.json', payload.data) });
      case 'updateBlog':
        return jsonResponse({ data: putJson(`blog/${payload.key}.json`, payload.data) });
      case 'removeBlog':
        return jsonResponse({ data: deleteJson(`blog/${payload.key}.json`) });
      default:
        return jsonResponse({ error: 'Unknown action: ' + action });
    }
  } catch (err) {
    return jsonResponse({ error: err.message });
  }
}

function getJson(path) {
  const url = buildUrl(path);
  const response = UrlFetchApp.fetch(url, { method: 'get', muteHttpExceptions: true });
  return parseResponse(response);
}

function pushJson(path, data) {
  const url = buildUrl(path);
  const response = UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(data),
    muteHttpExceptions: true,
  });
  return parseResponse(response);
}

function putJson(path, data) {
  const url = buildUrl(path);
  const response = UrlFetchApp.fetch(url, {
    method: 'put',
    contentType: 'application/json',
    payload: JSON.stringify(data),
    muteHttpExceptions: true,
  });
  return parseResponse(response);
}

function deleteJson(path) {
  const url = buildUrl(path);
  const response = UrlFetchApp.fetch(url, {
    method: 'delete',
    muteHttpExceptions: true,
  });
  return parseResponse(response);
}

function buildUrl(path) {
  let url = FIREBASE_DB_URL.replace(/\/$/, '') + '/' + path;
  if (FIREBASE_DB_SECRET) {
    url += '?auth=' + encodeURIComponent(FIREBASE_DB_SECRET);
  }
  return url;
}

function parseResponse(response) {
  const content = response.getContentText();
  try {
    return JSON.parse(content);
  } catch (err) {
    throw new Error(`Invalid JSON response from Firebase: ${content}`);
  }
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
