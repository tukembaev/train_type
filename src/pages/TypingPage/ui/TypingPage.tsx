import { useGetUserByIdQuery, useGetUserStatisticQuery } from 'entities/User'
import {
    LanguageSelection,
    ModeBar,
    TypingSimulator,
} from 'features/TypingSession'
import { FC, memo, useEffect } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Block, BlockFlex } from 'shared/ui/Block/Block'
import cls from './TypingPage.module.scss'

const TypingPage: FC = () => {
    const { refetch: isRefetchUserData } = useGetUserByIdQuery('')
    const { refetch: isRefetchUserStatistic } = useGetUserStatisticQuery('')

    useEffect(() => {
        isRefetchUserData()
        isRefetchUserStatistic()
    }, [])

    return (
        <div className={classNames(cls.wrapper, {}, [])}>
            <Block flex={BlockFlex.COLUMN} className={cls.body}>
                {/* {isLoadingUserData && <p>Updating user data</p>}
                {isLoadingStatistic && <p>Loading user statistic</p>}
                {!isLoadingUserData && !isLoadingStatistic && ( */}
                {/* {isLoadingStatistic && <p>Loading user statistic</p>}
                {!isLoadingStatistic && ( */}
                <>
                    {' '}
                    <ModeBar />
                    <LanguageSelection />
                    <TypingSimulator />
                </>
                {/* )} */}

                {/* )} */}
            </Block>
        </div>
    )
}

export default memo(TypingPage)
