export type TForgotPasswordData = {
    email: string
}

export type TLoginData = {
    email: string,
    password: string
}

export type TRegisterData = {
    email: string,
    password: string
    name: string
}

export type TResetPasswordData = {
    password: string,
    token: string
}

export type TProfileFormData = {
    email: string,
    name: string,
    password: string
}