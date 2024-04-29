import { classNames } from 'shared/lib/classNames/classNames'
import { memo } from 'react'
import { UserHistory, UserInfo, UserRecord, UserStatistic } from 'entities/User'
import cls from './ProfilePage.module.scss'

const ProfilePage = () => {
    return (
        <div className={classNames(cls.wrapper, {}, [])}>
            <UserInfo />
            <UserRecord />
            <UserStatistic />
            <UserHistory />
        </div>
    )
}

export default memo(ProfilePage)
