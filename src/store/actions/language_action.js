export const LANGUAGE = 'LANGUAGE';

export const change_language = (language) => dispatch => {
    dispatch({
        type: LANGUAGE,
        payload: language
    })
}
