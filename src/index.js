import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/app';
import store from './store'
import Firebase, { FirebaseContext } from './components/firebase';

ReactDOM.render(
  <Provider store={store}>
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>
  </Provider>
  , document.querySelector('.container'));
