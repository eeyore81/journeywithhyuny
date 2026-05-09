import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './components/app';
import store from './store';
import firebase from './components/firebase';
import { FirebaseContext } from './components/firebase/context';

const root = createRoot(document.querySelector('.container'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <FirebaseContext.Provider value={firebase}>
        <App />
      </FirebaseContext.Provider>
    </Provider>
  </React.StrictMode>
);
