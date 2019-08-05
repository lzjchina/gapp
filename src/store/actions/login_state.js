export  const LOGIN_STATE = 'LOGIN_STATE';

export const set_login_status = (data) =>  dispatch => {
    dispatch({
        type: LOGIN_STATE,
        payload: data
    })
}