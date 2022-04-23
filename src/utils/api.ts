import {getCookie, setCookie} from "../services/cookies";

const BASE_URL = "https://norma.nomoreparties.space/api"

type TFetchRequest = (
    url: string,
    requestData?: {
        [name: string]: any
    },
    method?: 'GET' | 'POST' | 'PATCH' | 'DELETE',
    token?: boolean
) => Promise<TParamsResponse>

type TParamsRequest = {
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
    body?: string,
    headers: {
        [name: string]: string
    }
}

type TParamsResponse = {
    [name: string]: any
} & { success: boolean }

export const fetchRequest: TFetchRequest = (url, requestData = {}, method = 'GET', token = false) => {
    const params: TParamsRequest = {method, headers: {}}
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

export const authFetchRequest: TFetchRequest = (url, requestData = {}, method = 'GET') => {
    if (!getCookie('accessToken')) {
        return fetchRequest('/auth/token', {token: getCookie('refreshToken') || ''}, 'POST')
            .then((data: TParamsResponse) => {
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


