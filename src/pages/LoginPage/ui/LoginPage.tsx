import { FC } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { LoginForm, RegistrationForm } from 'features/Authorization'

import { Block, BlockFlex } from 'shared/ui/Block/Block'
import cls from './LoginPage.module.scss'

const LoginPage: FC = () => {
    return (
        <Block flex={BlockFlex.ROW} className={classNames(cls.wrapper, {}, [])}>
            <RegistrationForm />
            <LoginForm />
        </Block>
    )
}

export default LoginPage
