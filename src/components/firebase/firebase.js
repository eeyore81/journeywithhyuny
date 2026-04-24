import app from 'firebase/app';
import 'firebase/database';

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
    const appInstance = app.apps.length ? app.app() : app.initializeApp(firebaseConfig);
    this.db = appInstance.database();
  }
  blogs = () => this.db.ref('blog');
  category = () => this.db.ref('category');
}

export default Firebase; 