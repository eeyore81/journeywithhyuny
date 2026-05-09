import FirebaseContext, { withFirebase } from './context';
import Firebase from './firebase';
import GasFirebase from './gasProxy';

const useGas = process.env.REACT_APP_USE_GAS === 'true';
const gasEndpoint = process.env.REACT_APP_GAS_ENDPOINT;
const service = useGas ? new GasFirebase(gasEndpoint) : new Firebase();

export default service;

export { FirebaseContext, withFirebase };
