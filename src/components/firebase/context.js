import React, { useContext } from 'react';

const FirebaseContext = React.createContext(null);

export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
      {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
  );
  
export const useFirebase = () => useContext(FirebaseContext);

export default FirebaseContext;