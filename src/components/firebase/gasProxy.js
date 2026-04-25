export default class GasFirebase {
  constructor(endpoint) {
    if (!endpoint) {
      throw new Error('REACT_APP_GAS_ENDPOINT is required when using GAS proxy.');
    }
    this.endpoint = endpoint.replace(/\/$/, '');
  }

  async request(action, payload = {}) {
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action, payload }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`GAS proxy error: ${response.status} ${response.statusText} - ${text}`);
    }

    const result = await response.json();
    if (result.error) {
      throw new Error(result.error);
    }
    return result.data;
  }

  getBlogs = () => this.request('getBlogs');
  getCategories = () => this.request('getCategories');
  addBlog = (data) => this.request('addBlog', { data });
  updateBlog = (key, data) => this.request('updateBlog', { key, data });
  removeBlog = (key) => this.request('removeBlog', { key });
}
