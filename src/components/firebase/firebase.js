import { initializeApp, getApps } from 'firebase/app';
import { getDatabase, ref, child, get, push, set, remove } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

class Firebase {
  constructor() {
    if (!getApps().length) {
      initializeApp(firebaseConfig);
    }
    this.db = getDatabase();
  }

  blogsRef = () => ref(this.db, 'blog');
  categoryRef = () => ref(this.db, 'category');

  getBlogs = async () => {
    const snapshot = await get(this.blogsRef());
    return snapshot.val() || {};
  };

  getCategories = async () => {
    const snapshot = await get(this.categoryRef());
    return snapshot.val() || [];
  };

  addBlog = (data) => push(this.blogsRef(), data);

  updateBlog = (key, data) => set(child(this.blogsRef(), key), data);

  removeBlog = (key) => remove(child(this.blogsRef(), key));
}

export default Firebase; 