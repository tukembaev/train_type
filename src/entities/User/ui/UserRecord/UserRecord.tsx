import { FC, memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Block, BlockFlex } from 'shared/ui/Block/Block'

import { TypingSelection, sessionData } from 'features/TypingSession'
import { useGetUserStatisticQuery } from 'entities/User'

import cls from './UserRecord.module.scss'

const UserRecord: FC = () => {
    const { data: userStatistic } = useGetUserStatisticQuery('')

    const getRecordsByModeAndDuration = (
        mode: sessionData['mode'],
        duration: sessionData['duration'],
    ) => {
        if (!userStatistic) return null

        return userStatistic.records.find(
            (record) => record.mode === mode && record.duration === duration,
        )
    }

    const records15Seconds = getRecordsByModeAndDuration(
        TypingSelection.TIME,
        15,
    )
    const records30Seconds = getRecordsByModeAndDuration(
        TypingSelection.TIME,
        30,
    )
    const records60Seconds = getRecordsByModeAndDuration(
        TypingSelection.TIME,
        60,
    )
    const records120Seconds = getRecordsByModeAndDuration(
        TypingSelection.TIME,
        120,
    )

    const records10Words = getRecordsByModeAndDuration(
        TypingSelection.WORDS,
        10,
    )
    const records25Words = getRecordsByModeAndDuration(
        TypingSelection.WORDS,
        25,
    )
    const records50Words = getRecordsByModeAndDuration(
        TypingSelection.WORDS,
        50,
    )
    const records100Words = getRecordsByModeAndDuration(
        TypingSelection.WORDS,
        100,
    )

    return (
        <div className={classNames(cls.wrapper, {}, [])}>
            <div className={cls.left_side}>
                <Block bg flex={BlockFlex.ROW} className={cls.record_block}>
                    {[
                        { label: '15 seconds', records: records15Seconds },
                        { label: '30 seconds', records: records30Seconds },
                        { label: '60 seconds', records: records60Seconds },
                        { label: '120 seconds', records: records120Seconds },
                    ].map(({ label, records }) => (
                        <Block
                            key={label}
                            flex={BlockFlex.COLUMN}
                            className={cls.record_item}
                        >
                            <h5>{label}</h5>
                            <h1>{records?.wpm?.toFixed(0) ?? '-'}</h1>
                            <h3>
                                {typeof records?.accurancy === 'number'
                                    ? `${records.accurancy?.toFixed(0)}%`
                                    : '-'}
                            </h3>
                        </Block>
                    ))}
                </Block>
            </div>
            <div className={cls.right_side}>
                <Block bg flex={BlockFlex.ROW} className={cls.record_block}>
                    {[
                        { label: '10 words', records: records10Words },
                        { label: '25 words', records: records25Words },
                        { label: '50 words', records: records50Words },
                        { label: '100 words', records: records100Words },
                    ].map(({ label, records }) => (
                        <Block
                            key={label}
                            flex={BlockFlex.COLUMN}
                            className={cls.record_item}
                        >
                            <h5>{label}</h5>
                            <h1>{records?.wpm?.toFixed(0) ?? '-'}</h1>
                            <h3>
                                {typeof records?.accurancy === 'number'
                                    ? `${records.accurancy?.toFixed(0)}%`
                                    : '-'}
                            </h3>
                        </Block>
                    ))}
                </Block>
            </div>
        </div>
    )
}

export default memo(UserRecord)
