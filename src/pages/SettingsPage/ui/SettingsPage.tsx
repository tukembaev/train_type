import { FC } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './SettingsPage.module.scss'

const SettingsPage: FC = () => {
    return (
        <div className={classNames(cls.wrapper, {}, [])}>
            <h1 style={{ color: 'var(--third-color)' }}>
                Development in progress , stay in tune <br /> Will be available
                in version 2.00{' '}
            </h1>
        </div>
    )
}

export default SettingsPage
