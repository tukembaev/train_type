import { authAPI, useRegisterUserMutation, useRegisterUserStatisticMutation } from "./model/services/loginByUsername/authService";

import LoginForm from "./ui/LoginForm/LoginForm"

import RegistrationForm from "./ui/RegistrationForm/RegistrationForm"

import { type RegisterFormValues , type LoginFormValues} from "./types/authorization";


export { useRegisterUserMutation, useRegisterUserStatisticMutation , authAPI }

export {RegisterFormValues ,LoginFormValues}

export {LoginForm , RegistrationForm}
