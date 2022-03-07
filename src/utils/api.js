const BASE_URL = "https://norma.nomoreparties.space/api"

export const fetchRequest = (url, data = {}, method = 'GET') => {
    const params = method === 'GET' ? {} : {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    return fetch(BASE_URL + url, params)
        .then(res => (res.ok ? res.json() : Promise.reject(new Error("Request fail"))))
}


