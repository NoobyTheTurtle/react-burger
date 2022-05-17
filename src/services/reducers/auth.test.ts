import authReducer, {
    forgotPasswordFailed, forgotPasswordRequest,
    forgotPasswordSuccess,
    getUserFailed,
    getUserRequest, getUserSuccess,
    loginFailed,
    loginRequest,
    loginSuccess, logoutFailed, logoutRequest, logoutSuccess,
    registerFailed,
    registerRequest,
    registerSuccess, resetPasswordFailed, resetPasswordRequest, resetPasswordSuccess,
    TUser, updateUserFailed, updateUserRequest, updateUserSuccess
} from "./auth";

const initialState = {
    user: {
        email: '',
        name: ''
    },
    isAuth: false,
    isRequesting: false
}

const user: TUser = {
    email: 'test@test.test',
    name: 'test'
}

describe("Auth reducer", () => {
    it("should return the initial state", () => {
        expect(authReducer(undefined, {type: "test"})).toEqual(initialState)
    })

    it("when login request, then return state with requesting", () => {
        const expectedState = {...initialState, isRequesting: true}

        expect(authReducer(initialState, loginRequest())).toEqual(expectedState)
    })

    it("when login success, then return state with login data", () => {
        const expectedState = {...initialState, user, isAuth: true}

        expect(authReducer(initialState, loginSuccess(user))).toEqual(expectedState)
    })

    it("when login failed, then return initial state", () => {
        expect(authReducer(initialState, loginFailed())).toEqual(initialState)
    })

    it("when register request, then return state with requesting", () => {
        const expectedState = {...initialState, isRequesting: true}

        expect(authReducer(initialState, registerRequest())).toEqual(expectedState)
    })

    it("when register success, then return state with register data", () => {
        const expectedState = {...initialState, user, isAuth: true}

        expect(authReducer(initialState, registerSuccess(user))).toEqual(expectedState)
    })

    it("when register failed, then return initial state", () => {
        expect(authReducer(initialState, registerFailed())).toEqual(initialState)
    })

    it("when get user request, then return actual state", () => {
        expect(authReducer(initialState, getUserRequest())).toEqual(initialState)
    })

    it("when get user success, then return state with user", () => {
        const expectedState = {...initialState, user, isAuth: true}

        expect(authReducer(initialState, getUserSuccess(user))).toEqual(expectedState)
    })

    it("when get user failed, then return initial state", () => {
        const state = {...initialState, user, isAuth: true}

        expect(authReducer(state, getUserFailed())).toEqual(initialState)
    })

    it("when logout request, then return state with requesting", () => {
        const expectedState = {...initialState, isRequesting: true}

        expect(authReducer(initialState, logoutRequest())).toEqual(expectedState)
    })

    it("when logout success, then return initial state", () => {
        const state = {...initialState, user, isAuth: true}

        expect(authReducer(state, logoutSuccess())).toEqual(initialState)
    })

    it("when logout failed, then return state without requesting", () => {
        const state = {...initialState, user, isAuth: true}
        const expectedState = {...state, isRequesting: false}

        expect(authReducer(state, logoutFailed())).toEqual(expectedState)
    })

    it("when update user request, then return actual state", () => {
        const state = {...initialState, user, isAuth: true}

        expect(authReducer(state, updateUserRequest())).toEqual(state)
    })

    it("when update user success, then return state with updated user", () => {
        const state = {...initialState, user, isAuth: true}
        const newUser = { email: 'test2@test.test', name: 'test2'}
        const expectedState = {...state, user: newUser}

        expect(authReducer(state, updateUserSuccess(newUser))).toEqual(expectedState)
    })

    it("when update user failed, then return initial state", () => {
        const state = {...initialState, user, isAuth: true}

        expect(authReducer(state, updateUserFailed())).toEqual(initialState)
    })

    it("when reset password request, then return state with requesting", () => {
        const expectedState = {...initialState, isRequesting: true}

        expect(authReducer(initialState, resetPasswordRequest())).toEqual(expectedState)
    })

    it("when reset password success, then return state without requesting", () => {
        const state = {...initialState, isRequesting: true}
        const expectedState = {...state, isRequesting: false}

        expect(authReducer(state, resetPasswordSuccess())).toEqual(expectedState)
    })

    it("when reset password failed, then return initial state", () => {
        const state = {...initialState, isRequesting: true}

        expect(authReducer(state, resetPasswordFailed())).toEqual(initialState)
    })

    it("when forgot password request, then return state with requesting", () => {
        const expectedState = {...initialState, isRequesting: true}

        expect(authReducer(initialState, forgotPasswordRequest())).toEqual(expectedState)
    })

    it("when forgot password success, then return state without requesting", () => {
        const state = {...initialState, isRequesting: true}
        const expectedState = {...state, isRequesting: false}

        expect(authReducer(state, forgotPasswordSuccess())).toEqual(expectedState)
    })

    it("when forgot password failed, then return initial state", () => {
        const state = {...initialState, isRequesting: true}

        expect(authReducer(state, forgotPasswordFailed())).toEqual(initialState)
    })
})