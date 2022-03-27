import {authFetchRequest, fetchRequest} from "../../utils/api";
import {
    forgotPasswordFailed,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    getUserFailed,
    getUserRequest,
    getUserSuccess,
    loginFailed,
    loginRequest,
    loginSuccess,
    logoutFailed,
    logoutRequest,
    logoutSuccess,
    registerFailed,
    registerRequest,
    registerSuccess,
    resetPasswordFailed,
    resetPasswordRequest,
    resetPasswordSuccess,
    updateUserFailed,
    updateUserRequest,
    updateUserSuccess
} from "../reducers/auth";
import {deleteCookie, getCookie, setCookie} from "../cookies";

export const loginThunk = (loginData) => (dispatch) => {
    dispatch(loginRequest())
    fetchRequest('/auth/login', loginData, 'POST')
        .then(data => {
            if (data.success) {
                dispatch(loginSuccess(data.user))
                setCookie('accessToken', data.accessToken.split(' ')[1], {expires: 60 * 20})
                setCookie('refreshToken', data.refreshToken)
            } else {
                dispatch(loginFailed())
            }
        })
        .catch(error => {
            dispatch(loginFailed())
            console.log(`Login response error: ${error.message}`)
        })
}

export const registerThunk = (registerData) => (dispatch) => {
    dispatch(registerRequest())
    fetchRequest('/auth/register', registerData, 'POST')
        .then(data => {
            if (data.success) {
                dispatch(registerSuccess(data.user))
                setCookie('accessToken', data.accessToken.split(' ')[1], {expires: 60 * 20})
                setCookie('refreshToken', data.refreshToken)
            } else {
                dispatch(registerFailed())
            }
        })
        .catch(error => {
            dispatch(registerFailed())
            console.log(`Register response error: ${error.message}`)
        })
}

export const logoutThunk = () => (dispatch) => {
    dispatch(logoutRequest())
    fetchRequest('/auth/logout', {token: getCookie('refreshToken')}, 'POST')
        .then(data => {
            if (data.success) {
                deleteCookie('accessToken')
                deleteCookie('refreshToken')
                dispatch(logoutSuccess())
            } else {
                dispatch(logoutFailed())
            }
        })
        .catch(error => {
            dispatch(logoutFailed())
            console.log(`Logout response error: ${error.message}`)
        })
}

export const getUserThunk = () => (dispatch) => {
    dispatch(getUserRequest())
    authFetchRequest('/auth/user')
        .then(data => {
            if (data.success) {
                dispatch(getUserSuccess(data.user))
            } else {
                dispatch(getUserFailed())
            }
        })
        .catch(error => {
            dispatch(getUserFailed())
            console.log(`Get user response error: ${error.message}`)
        })
}

export const updateUserThunk = (userData) => (dispatch) => {
    dispatch(updateUserRequest())
    authFetchRequest('/auth/user', userData, 'PATCH')
        .then(data => {
            if (data.success) {
                dispatch(updateUserSuccess(data.user))
            } else {
                dispatch(updateUserFailed())
            }
        })
        .catch(error => {
            dispatch(updateUserFailed())
            console.log(`Update user response error: ${error.message}`)
        })
}

export const resetPasswordThunk = (formData, navigate) => (dispatch) => {
    dispatch(resetPasswordRequest())
    fetchRequest('/password-reset/reset', {...formData}, 'POST')
        .then(data => {
            if (data.success) {
                dispatch(resetPasswordSuccess())
                navigate('/login')
            } else {
                dispatch(resetPasswordFailed())
            }
        })
        .catch(error => {
            dispatch(resetPasswordFailed())
            console.log(`Reset password response error: ${error.message}`)
        })
}

export const forgotPasswordThunk = (formData, navigate) => (dispatch) => {
    dispatch(forgotPasswordRequest())
    fetchRequest('/password-reset', {...formData}, 'POST')
        .then(data => {
            if (data.success) {
                dispatch(forgotPasswordSuccess())
                navigate('/reset-password', {state: {from: '/forgot-password'}})
            } else {
                dispatch(forgotPasswordFailed())
            }
        })
        .catch(error => {
            dispatch(forgotPasswordFailed())
            console.log(`Forgot password response error: ${error.message}`)
        })
}

