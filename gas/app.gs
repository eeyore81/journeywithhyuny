const FIREBASE_DATABASE_URL = PropertiesService.getScriptProperties().getProperty('FIREBASE_DATABASE_URL');
const FIREBASE_DATABASE_SECRET = PropertiesService.getScriptProperties().getProperty('FIREBASE_DATABASE_SECRET');

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || '{}');
    const action = payload.action;
    const data = payload.payload || {};

    if (!action) {
      return jsonResponse({ error: 'Missing action' }, 400);
    }

    const result = handleAction(action, data);
    return jsonResponse({ data: result });
  } catch (error) {
    return jsonResponse({ error: error.message || String(error) }, 500);
  }
}

function handleAction(action, payload) {
  switch (action) {
    case 'getBlogs':
      return getBlogs();
    case 'getCategories':
      return getCategories();
    case 'addBlog':
      return addBlog(payload.data);
    case 'updateBlog':
      return updateBlog(payload.key, payload.data);
    case 'removeBlog':
      return removeBlog(payload.key);
    default:
      throw new Error('Unknown action: ' + action);
  }
}

function getBlogs() {
  return fetchJson(buildUrl('/blog.json')) || {};
}

function getCategories() {
  return fetchJson(buildUrl('/category.json')) || [];
}

function addBlog(data) {
  return fetchJson(buildUrl('/blog.json'), { method: 'post', payload: JSON.stringify(data) });
}

function updateBlog(key, data) {
  if (!key) throw new Error('Missing key for updateBlog');
  return fetchJson(buildUrl('/blog/' + encodeURIComponent(key) + '.json'), { method: 'put', payload: JSON.stringify(data) });
}

function removeBlog(key) {
  if (!key) throw new Error('Missing key for removeBlog');
  return fetchJson(buildUrl('/blog/' + encodeURIComponent(key) + '.json'), { method: 'delete' });
}

function buildUrl(path) {
  if (!FIREBASE_DATABASE_URL) {
    throw new Error('FIREBASE_DATABASE_URL is not configured in script properties.');
  }
  let url = FIREBASE_DATABASE_URL.replace(/\/$/, '') + path;
  if (FIREBASE_DATABASE_SECRET) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + 'auth=' + FIREBASE_DATABASE_SECRET;
  }
  return url;
}

function fetchJson(url, options) {
  const fetchOptions = Object.assign({
    method: options && options.method ? options.method : 'get',
    contentType: 'application/json',
    muteHttpExceptions: true,
    payload: options && options.payload ? options.payload : null,
  }, options);

  const response = UrlFetchApp.fetch(url, fetchOptions);
  const code = response.getResponseCode();
  const text = response.getContentText();

  if (code < 200 || code >= 300) {
    throw new Error('Firebase request failed: ' + code + ' - ' + text);
  }

  return JSON.parse(text);
}

function jsonResponse(data, statusCode) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  if (statusCode) {
    output.setResponseCode(statusCode);
  }
  return output;
}
