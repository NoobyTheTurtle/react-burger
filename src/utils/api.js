const BASE_URL = "https://norma.nomoreparties.space/api"

export const fetchIngredients = fetch(`${BASE_URL}/ingredients`)
    .then(res => (res.ok ? res.json() : Promise.reject(new Error("Request fail"))))


