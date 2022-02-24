const URL = "https://norma.nomoreparties.space/api/ingredients"

export const fetchIngredients = fetch(URL)
    .then(res => (res.ok ? res.json() : Promise.reject(new Error("Request fail"))))


