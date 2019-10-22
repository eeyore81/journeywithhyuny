const INITIAL_STATE = {
    isLoggedIn : false,
}

const authreducer = (state = INITIAL_STATE, action) => {
    switch(action.state) {
        case 'LOG_IN' :
            return {...state, isLoggedIn : true};
        case 'LOG_OUT' :
                return {...state, isLoggedIn : false};
        default :
            return state;
    }

}
export default authreducer;