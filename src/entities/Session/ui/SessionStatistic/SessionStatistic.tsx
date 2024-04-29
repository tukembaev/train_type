import { nanoid } from '@reduxjs/toolkit'

import {
    getDuration,
    getErrors,
    getLanguage,
    getMode,
} from 'features/TypingSession'

import { FC, memo, useEffect, useRef, useState } from 'react'
import { Tooltip } from 'react-tooltip'
import { classNames } from 'shared/lib/classNames/classNames'
import { getTodayDate } from 'shared/lib/functions/dateFunction'
import {
    calculateRAW,
    calculateWPM,
} from 'shared/lib/functions/statisticFunctions'
import { useAppSelector } from 'app/providers/StoreProvider'
import { Block, BlockFlex } from 'shared/ui/Block/Block'
import { useDispatch } from 'react-redux'

import {
    getGraphData,
    getSessionResults,
    getSessionsInfo,
    setSessionResults,
} from 'entities/Session'
import {
    useGetUserByIdQuery,
    useGetUserStatisticQuery,
    useUpdateUserExpirienceMutation,
    useUpdateUserHistoryMutation,
    useUpdateUserRecordMutation,
} from 'entities/User'
import SessionGraph from '../SessionGraph/SessionGraph'

import { processSessionData } from '../../model/logic/SessionLogic'
import cls from './SessionStatistic.module.scss'

interface SessionStatisticProps {
    setIsConfetii: (value: boolean) => void
}

const SessionStatistic: FC<SessionStatisticProps> = ({ setIsConfetii }) => {
    const [isRecord, setIsRecord] = useState(false)
    const { data: userData } = useGetUserByIdQuery('')
    const { data: userStatistic } = useGetUserStatisticQuery('')
    const [updateUserHistory] = useUpdateUserHistoryMutation()
    const [updateUserExpirience] = useUpdateUserExpirienceMutation()
    const [setNewRecord] = useUpdateUserRecordMutation()

    const sessionInfo = useAppSelector(getSessionsInfo)
    const sessionResults = useAppSelector(getSessionResults)

    const graphData = useAppSelector(getGraphData)

    const currentMode = useAppSelector(getMode)
    const currentDuration = useAppSelector(getDuration)
    const currentLanguage = useAppSelector(getLanguage)

    const errorsCount = useAppSelector(getErrors)
    const dispatch = useDispatch()

    const calculatedWPM = calculateWPM(
        sessionInfo.letters_count,
        sessionInfo.time_s,
    ) // WPM
    const calculatedRAW = calculateRAW(
        sessionInfo.letters_count,
        sessionInfo.time_s,
        errorsCount,
    )
    const consistency = (
        100 -
        Math.abs(
            ((calculatedRAW - calculatedWPM) /
                (calculatedRAW + calculatedWPM)) *
                100,
        )
    ).toFixed(0)

    useEffect(() => {
        const data = {
            id: nanoid(4),
            wpm: calculatedWPM,
            acc:
                ((sessionInfo.letters_count - errorsCount) * 100) /
                sessionInfo.letters_count,
            raw: +calculatedRAW.toFixed(0),
            consistency: +consistency,
            correct: sessionInfo.letters_count,
            incorrect: errorsCount,
            time_spend: sessionInfo.time_s,
            mode: currentMode,
            duration: currentDuration,
            language: currentLanguage,
            sessionDate: getTodayDate(),
            graphData,
        }
        dispatch(setSessionResults(data))

        if (userStatistic) {
            const test = processSessionData(
                data,
                userStatistic,
                setNewRecord,

                userData,
                updateUserHistory,
                updateUserExpirience,
            )
            setIsConfetii(test ?? false)
            setIsRecord(test ?? false)
        }
    }, [sessionInfo, dispatch, errorsCount, calculatedRAW, calculatedWPM])

    const graphWidth = useRef<HTMLDivElement>(null)

    return (
        <Block className={classNames(cls.wrapper, {}, [])}>
            <div className={cls.top}>
                <div>
                    <div className={cls.stat_block} data-tooltip-id="wpm">
                        {isRecord ? (
                            <i
                                className={classNames(cls.icon, {}, [
                                    'fa-solid fa-crown',
                                ])}
                                style={{
                                    color: 'var(--primary-color)',
                                    fontSize: '28px',
                                }}
                            />
                        ) : null}{' '}
                        <h3>wpm</h3>
                        <h1
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                            }}
                        >
                            {sessionResults.wpm.toFixed(0)}
                        </h1>
                    </div>
                    <div className={cls.stat_block}>
                        <h3>acc</h3>
                        <h1>{sessionResults.acc.toFixed(0)}%</h1>
                    </div>
                </div>
                <div>
                    <SessionGraph
                        width={
                            graphWidth?.current?.offsetWidth &&
                            graphWidth.current.offsetWidth - 90
                        }
                    />
                </div>
            </div>
            <div ref={graphWidth}>
                <Block flex={BlockFlex.ROW} className={cls.bottom}>
                    <div className={cls.stat_block}>
                        <h5>test type</h5>
                        <h4>
                            {sessionResults.mode} {sessionResults.duration}{' '}
                            {sessionResults.language}
                        </h4>
                    </div>
                    <div className={cls.stat_block} data-tooltip-id="wpm">
                        <h5>raw</h5>
                        <h4>{sessionResults.raw}</h4>
                    </div>
                    <div
                        className={cls.stat_block}
                        data-tooltip-id="correct-incorrect"
                    >
                        <h5>characters</h5>
                        <h4>
                            {sessionResults.correct}/{sessionResults.incorrect}
                        </h4>
                    </div>
                    <div className={cls.stat_block}>
                        <h5>consistency</h5>
                        <h4>{sessionResults.consistency.toFixed(0)}%</h4>
                    </div>
                    <div className={cls.stat_block} data-tooltip-id="time">
                        <h5>time</h5>
                        <h4>{sessionInfo.time_s}</h4>
                    </div>
                </Block>
            </div>
            <Tooltip
                id="correct-incorrect"
                place="top"
                content="Correct / Incorrect"
            />
            <Tooltip
                id="wpm"
                place="top"
                content={`${calculatedWPM.toFixed(2)}% wpm`}
            />
            <Tooltip
                id="time"
                place="top"
                content={`${sessionInfo.time_s}s (0s afk 0%)`}
            />
        </Block>
    )
}

export default memo(SessionStatistic)
