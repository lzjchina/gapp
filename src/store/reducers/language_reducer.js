import { LANGUAGE } from '../actions/language_action';

const initialState = {
    name: 'zh'
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LANGUAGE:
            return {
                ...state,
                name: action.payload
            }
    
        default:
            return state;
    }
}