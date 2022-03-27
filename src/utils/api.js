import {getCookie, setCookie} from "../services/cookies";

const BASE_URL = "https://norma.nomoreparties.space/api"

export const fetchRequest = (url, requestData = {}, method = 'GET', token = false) => {
    const params = {method, headers: {}}
    if (Object.keys(requestData).length !== 0) {
        params.body = JSON.stringify(requestData)
        params.headers['Content-Type'] = 'application/json'
        params.headers['Accept'] = 'application/json'
    }
    if (token) {
        params.headers['authorization'] = 'Bearer ' + getCookie('accessToken')
    }
    return fetch(BASE_URL + url, params)
        .then(res => (res.ok ? res.json() : Promise.reject(new Error("Request fail"))))
}

export const authFetchRequest = (url, requestData = {}, method = 'GET') => {
    if (!getCookie('accessToken')) {
        return fetchRequest('/auth/token', {token: getCookie('refreshToken')}, 'POST')
            .then(data => {
                if (data.success) {
                    setCookie('accessToken', data.accessToken.split(' ')[1], {expires: 60 * 20})
                    setCookie('refreshToken', data.refreshToken)
                    return fetchRequest(url, requestData, method, true)
                } else {
                    return Promise.reject(new Error('Авторизируйтесь'))
                }
            })
            .catch(_error => {
                return Promise.reject(new Error('Авторизируйтесь'))
            })
    }
    return fetchRequest(url, requestData, method, true)
}


