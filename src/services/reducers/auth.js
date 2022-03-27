import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: {
        email: null,
        name: null
    },
    isAuth: false,
    isRequesting: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginRequest(state) {
            state.isRequesting = true
        },
        loginSuccess(state, action) {
            state.isRequesting = false
            state.user = action.payload
            state.isAuth = true
        },
        loginFailed() {
            return initialState
        },
        registerRequest(state) {
            state.isRequesting = true
        },
        registerSuccess(state, action) {
            state.isRequesting = false
            state.user = action.payload
            state.isAuth = true
        },
        registerFailed() {
            return initialState
        },
        getUserRequest() {
        },
        getUserSuccess(state, action) {
            state.user = action.payload
            state.isAuth = true
        },
        getUserFailed() {
            return initialState
        },
        logoutRequest(state) {
            state.isRequesting = true
        },
        logoutSuccess() {
            return initialState
        },
        logoutFailed(state) {
            state.isRequesting = false
        },
        updateUserRequest() {
        },
        updateUserSuccess(state, action) {
            state.user = action.payload
        },
        updateUserFailed() {
            return initialState
        },
        resetPasswordRequest(state) {
            state.isRequesting = true
        },
        resetPasswordSuccess(state) {
            state.isRequesting = false
        },
        resetPasswordFailed() {
            return initialState
        },
        forgotPasswordRequest(state) {
            state.isRequesting = true
        },
        forgotPasswordSuccess(state) {
            state.isRequesting = false
        },
        forgotPasswordFailed() {
            return initialState
        },

    }
})

export const {
    loginRequest,
    loginSuccess,
    loginFailed,
    registerRequest,
    registerSuccess,
    registerFailed,
    getUserRequest,
    getUserSuccess,
    getUserFailed,
    logoutRequest,
    logoutSuccess,
    logoutFailed,
    updateUserRequest,
    updateUserSuccess,
    updateUserFailed,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFailed,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFailed,
} = authSlice.actions;

export const selectUser = (state) => state.auth.user
export const selectIsAuth = (state) => state.auth.isAuth
export const selectAuthIsRequesting = (state) => state.auth.isRequesting

export default authSlice.reducer