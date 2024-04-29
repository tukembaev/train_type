import { FC, memo, useEffect } from 'react'

import { classNames } from 'shared/lib/classNames/classNames'
import { formatOverallTimeSpended } from 'shared/lib/functions/dateFunction'

import { updateStatistic } from 'shared/lib/functions/statisticFunctions'
import {
    useGetUserByIdQuery,
    useGetUserStatisticQuery,
    useUpdateUserStatisticMutation,
} from 'entities/User'

import cls from './UserStatistic.module.scss'

const UserStatistic: FC = () => {
    const { data: userData } = useGetUserByIdQuery('')
    const { data: userStatistic } = useGetUserStatisticQuery('')
    const [updateUserStatistic] = useUpdateUserStatisticMutation()
    useEffect(() => {
        if (userData && userStatistic) {
            updateStatistic(userData, userStatistic, updateUserStatistic)
        }
    }, [])

    return (
        <div className={classNames(cls.wrapper, {}, [])}>
            <div className={cls.statistic_item}>
                <h5>tests started</h5>
                <h1>{userStatistic?.overall_tests ?? '-'}</h1>
            </div>
            <div className={cls.statistic_item}>
                <h5>tests completed</h5>
                <h1>{userStatistic?.completed_tests ?? '-'}</h1>
            </div>
            <div className={cls.statistic_item}>
                <h5>time typing</h5>
                <h1>
                    {formatOverallTimeSpended(
                        userStatistic?.overall_spended_time ?? 0,
                    )}
                </h1>
            </div>
            <div className={cls.statistic_item}>
                <h5>highest wpm</h5>
                <h1>{userStatistic?.highest_wpm.toFixed(0) ?? '-'}</h1>
            </div>
            <div className={cls.statistic_item}>
                <h5>highest raw wpm</h5>
                <h1>{userStatistic?.highest_raw ?? '-'}</h1>
            </div>
            <div className={cls.statistic_item}>
                <h5>highest accuracy</h5>
                <h1>
                    {`${userStatistic?.highest_accuracy.toFixed(2)}%` ?? '-'}
                </h1>
            </div>
            <div className={cls.statistic_item}>
                <h5>highest consistency</h5>
                <h1>
                    {`${userStatistic?.highest_consistency.toFixed(0)}%` ?? '-'}
                </h1>
            </div>
            <div className={cls.statistic_item}>
                <h5>estimated_words_typed</h5>
                <h1>
                    {userStatistic?.estimated_words_typed.toFixed(0) ?? '-'}
                </h1>
            </div>
            <div className={cls.statistic_item}>
                <h5>preferred_mode</h5>
                <h1>{userStatistic?.preferred_mode ?? '-'}</h1>
            </div>
        </div>
    )
}

export default memo(UserStatistic)
