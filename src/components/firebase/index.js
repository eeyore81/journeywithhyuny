import FirebaseContext, { withFirebase } from './context';
import Firebase from './firebase';
import GasFirebase from './gasProxy';

const gasEndpoint = process.env.REACT_APP_GAS_ENDPOINT;
const service = gasEndpoint ? new GasFirebase(gasEndpoint) : new Firebase();

export default service;

export { FirebaseContext, withFirebase };
