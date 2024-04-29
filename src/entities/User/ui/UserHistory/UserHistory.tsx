/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC, memo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Tooltip } from 'react-tooltip'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Modal } from 'shared/ui/Modal/Modal'
import { useNavigate } from 'react-router-dom'
import { SessionGraph, clearGraphData, setViewGraph } from 'entities/Session'
import {
    History,
    useGetUserStatisticQuery,
    useGetUserHistoryQuery,
} from 'entities/User'
import { useWindowSize } from 'shared/lib/hooks/useWindowSize/useWindowSize'

import cls from './UserHistory.module.scss'

const UserHistory: FC = () => {
    const { data: userHistory } = useGetUserHistoryQuery('')
    const { data: userStatistic } = useGetUserStatisticQuery('')

    const { isTable, isMobile } = useWindowSize()

    const navigate = useNavigate()

    const [openSessionGraph, setOpenSessionGraph] = useState(false)
    const [visibleRows, setVisibleRows] = useState(10)
    const headerData = [
        ' ',
        'wpm',
        isTable || isMobile ? null : 'raw',
        isMobile ? null : 'accurancy',
        isTable || isMobile ? null : 'consistency',
        isTable || isMobile ? null : 'chars',
        'mode',
        isTable || isMobile ? null : 'info',
        'date',
    ]
    const dispatch = useDispatch()
    const handleViewGraph = (graphData: History['graphData']) => {
        dispatch(setViewGraph(graphData))
        setOpenSessionGraph(true)
    }
    const filteredHeaderData = headerData.filter((header) => header !== null)

    return (
        <div className={classNames(cls.wrapper, {}, [])}>
            <table className={cls.table_wrapper}>
                <thead className={cls.table_header}>
                    <tr className={cls.table_row} style={{ height: '30px' }}>
                        {filteredHeaderData.map((header) => (
                            <th
                                className={classNames(
                                    cls.table_header_cell,
                                    {},
                                    [],
                                )}
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className={cls.table_body}>
                    {userHistory?.slice(0, visibleRows).map((item, index) => {
                        const hasRecordId = userStatistic?.records?.some(
                            (record) => record.id === item.id,
                        )
                        return (
                            <tr
                                className={classNames(cls.table_row, {}, [
                                    index % 2 !== 0 ? cls.even : '',
                                ])}
                            >
                                <td
                                    className={classNames(cls.table_cell, {}, [
                                        cls.first_left_cell,
                                    ])}
                                >
                                    {hasRecordId && (
                                        <i
                                            className={classNames(
                                                cls.icon,
                                                {},
                                                ['fa-solid fa-crown'],
                                            )}
                                            style={{
                                                color: 'var(--primary-color)',
                                            }}
                                        />
                                    )}
                                </td>
                                <td
                                    className={classNames(
                                        cls.table_cell,
                                        {},
                                        [],
                                    )}
                                >
                                    {item?.wpm?.toFixed(2)}
                                </td>
                                {isTable || isMobile ? null : (
                                    <td
                                        className={classNames(
                                            cls.table_cell,
                                            {},
                                            [],
                                        )}
                                    >
                                        {item?.raw?.toFixed(2)}
                                    </td>
                                )}
                                {isMobile ? null : (
                                    <td
                                        className={classNames(
                                            cls.table_cell,
                                            {},
                                            [],
                                        )}
                                    >
                                        {item?.acc?.toFixed(2)}%
                                    </td>
                                )}

                                {isTable || isMobile ? null : (
                                    <td
                                        className={classNames(
                                            cls.table_cell,
                                            {},
                                            [],
                                        )}
                                    >
                                        {item?.consistency?.toFixed(2)}%
                                    </td>
                                )}
                                {isTable || isMobile ? null : (
                                    <td
                                        className={classNames(
                                            cls.table_cell,
                                            {},
                                            [],
                                        )}
                                    >
                                        {item?.correct}/{item.incorrect}
                                    </td>
                                )}

                                <td
                                    className={classNames(
                                        cls.table_cell,
                                        {},
                                        [],
                                    )}
                                >
                                    {item?.mode} {item?.duration}
                                </td>
                                {isTable || isMobile ? null : (
                                    <td
                                        className={classNames(
                                            cls.table_cell,
                                            {},
                                            [cls.icons_cell],
                                        )}
                                    >
                                        <i
                                            className={classNames(
                                                cls.icon,
                                                {},
                                                ['fa-solid fa-earth-americas'],
                                            )}
                                            data-tooltip-id={`language_${index}`}
                                        />
                                        <i
                                            className={classNames(
                                                cls.icon,
                                                {},
                                                ['fa-regular fa-star'],
                                            )}
                                            style={{ padding: '0px 10px' }}
                                            data-tooltip-id="normal"
                                        />
                                        <i
                                            className={classNames(
                                                cls.icon,
                                                {},
                                                ['fa-solid fa-chart-line'],
                                            )}
                                            data-tooltip-id="graph"
                                            onClick={() =>
                                                handleViewGraph(item.graphData)
                                            }
                                        />
                                        <Tooltip
                                            id={`language_${index}`}
                                            place="top"
                                            content={item.language}
                                        />
                                        <Tooltip
                                            id="graph"
                                            place="top"
                                            content="view graph"
                                        />
                                        <Tooltip
                                            id="normal"
                                            place="top"
                                            content="normal"
                                        />
                                    </td>
                                )}

                                <td
                                    className={classNames(cls.table_cell, {}, [
                                        cls.last_right_cell,
                                    ])}
                                >
                                    {item?.sessionDate}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {userHistory?.length === 0 ? (
                <Button
                    theme={ButtonTheme.BACKGROUND}
                    className={cls.load_more_btn}
                    onClick={() => navigate('/')}
                    style={{ width: '100%' }}
                >
                    You dont have your typing history, make your first attempt
                    now!
                </Button>
            ) : null}
            {userHistory && userHistory.length > visibleRows && (
                <Button
                    theme={ButtonTheme.BACKGROUND}
                    className={cls.load_more_btn}
                    onClick={() => setVisibleRows((prev) => prev + 5)}
                    style={{ width: '100%' }}
                >
                    load more
                </Button>
            )}

            <Modal
                isOpen={openSessionGraph}
                onClose={() => {
                    setOpenSessionGraph(false)
                    dispatch(clearGraphData())
                }}
            >
                <div style={{ paddingTop: '25px' }}>
                    <SessionGraph width={520} height={220} />
                </div>
            </Modal>
        </div>
    )
}

export default memo(UserHistory)
