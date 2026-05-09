import FirebaseContext, { withFirebase } from './context';
import Firebase from './firebase';

const service = new Firebase();

export default service;

export { FirebaseContext, withFirebase };
