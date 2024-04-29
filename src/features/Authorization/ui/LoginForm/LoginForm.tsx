import { FC, memo } from 'react'
import { Resolver, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { classNames } from 'shared/lib/classNames/classNames'
import { Block, BlockFlex } from 'shared/ui/Block/Block'

import { User, useGetAllUsersQuery } from 'entities/User'

import { Button, ButtonTheme } from 'shared/ui/Button/Button'

import { USER_LOCALSTORAGE_ID } from 'shared/const/localstorage'
import { LoginFormValues } from '../../types/authorization'

import cls from './LoginForm.module.scss'

const resolver: Resolver<LoginFormValues> = async (values) => {
    let errors = {}

    if (!values.username) {
        errors = {
            ...errors,
            username: {
                type: 'required',
                message: 'username is required',
            },
        }
    }

    if (!values.password) {
        errors = {
            ...errors,
            password: {
                type: 'required',
                message: 'password is required',
            },
        }
    } else if (values.password.length < 6) {
        errors = {
            ...errors,
            password: {
                type: 'minLength',
                message: 'password must be at least 6 characters long',
            },
        }
    }

    return { values, errors }
}

const LoginForm: FC = () => {
    const {
        register: login,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({ resolver })
    const navigate = useNavigate()
    const { data: dataUsers } = useGetAllUsersQuery('')

    const onSubmit = handleSubmit((data) => {
        const userFound = dataUsers?.find(
            (item: User) => item.username === data.username,
        )
        if (!userFound) {
            setError('username', {
                type: 'notFound',
                message: 'user not found',
            })
        }
        if (userFound && data.password !== userFound?.password) {
            setError('password', {
                type: 'wrongPassword',
                message: 'password not correct',
            })
        }
        if (userFound && Object.keys(errors).length === 0) {
            localStorage.setItem(USER_LOCALSTORAGE_ID, String(userFound?.id))
            navigate('/')
        }
    })

    return (
        <form onSubmit={onSubmit}>
            <Block flex={BlockFlex.COLUMN} className={cls.wrapper}>
                <div
                    className={cls.header}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'end',
                    }}
                >
                    <h4>login</h4>
                    <span>forgot password?</span>
                </div>
                <span className={cls.description}>
                    username{' '}
                    {errors.username ? (
                        <p className={cls.error_message}>
                            ({errors.username.message}){' '}
                        </p>
                    ) : null}
                </span>
                <input
                    {...login('username')}
                    placeholder="username"
                    className={classNames(cls.input, {}, [
                        errors.username ? cls.error_detected : '',
                    ])}
                />
                <span className={cls.description}>
                    password{' '}
                    {errors.password ? (
                        <p className={cls.error_message}>
                            ({errors.password.message}){' '}
                        </p>
                    ) : null}
                </span>
                <input
                    {...login('password')}
                    type="password"
                    placeholder="password"
                    className={classNames(cls.input, {}, [
                        errors.password?.type === 'required'
                            ? cls.error_detected
                            : '',
                    ])}
                />

                <div className={cls.user_test}>
                    <h5>Open account</h5>
                    <h3>Peter</h3>
                    <h3>parker</h3>
                </div>

                <Button
                    type="submit"
                    theme={ButtonTheme.BACKGROUND}
                    disabled={isSubmitting}
                >
                    Sign In
                </Button>
            </Block>
        </form>
    )
}

export default memo(LoginForm)
