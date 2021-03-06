import { LOGIN_STATE } from '../actions/login_state';

const initialState = {
    data: {}
}

export default  (state = initialState,action) => {
    switch (action.type) {
        case LOGIN_STATE:
            sessionStorage.setItem("token", JSON.stringify(action.payload));
            return {
                ...state,
                data: action.payload
            }
    
        default:
            return state;
    }
}