import 'whatwg-fetch';
import 'es6-promise';

export function get(url) {
    var result = fetch(url, {
        method: 'GET',
        // mode: 'cors',
        credentials: 'include',
        headers: {
            'Accept': 'application/json,text/plain,*/*'
        },
    });
    return result;
}

function obj2params(obj){
    var result = '';
    var item;
    for (item in obj) {
        result += '&' + item + '=' + encodeURIComponent(obj[item]);
    }

    if(result){
        result = result.slice(1);
    }
    return result;
}

export function post(url,params) {
    var result = fetch(url, {
        method: 'POST',
        // mode: 'cors',
        credentials: 'include',
        headers: {
            'Accept': 'application/json,text/plain,*/*',
            'Content-type': 'application/x-www-form-urlencoded'
        },
        body: obj2params(params)
    });
    return result;
}