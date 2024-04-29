import { FC, memo, useEffect } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import Table from 'shared/ui/Table/Table'
import cls from './LeaderBoard.module.scss'
import {
    useGetLeaderBoardDataByMode2Query,
    useGetLeaderBoardDataByModeQuery,
} from '../model/services/leaderBoardAPI'

interface LeaderBoardProps {
    update: boolean
}
const LeaderBoard: FC<LeaderBoardProps> = ({ update }) => {
    const { data, isLoading, refetch } = useGetLeaderBoardDataByModeQuery('', {
        refetchOnMountOrArgChange: true,
    })
    const {
        data: data2,
        isLoading: isLoading2,
        refetch: refetch2,
    } = useGetLeaderBoardDataByMode2Query('', {
        refetchOnMountOrArgChange: true,
    })

    const headerData = ['#', 'name', 'wpm', 'raw', 'date']
    useEffect(() => {
        refetch()
        refetch2()
    }, [update])

    return (
        <div className={classNames(cls.wrapper, {}, [])}>
            <div className={classNames(cls.header, {}, [])}>
                <h1>All-Time Russian Leaderboards</h1>
                <h5>Next reload after 11:24</h5>
            </div>
            <div className={classNames(cls.body, {}, [])}>
                <div className={classNames(cls.left_side, {}, [])}>
                    <h5>Words 10</h5>
                    {isLoading || isLoading2 ? (
                        'Loading... '
                    ) : (
                        <Table
                            headerData={headerData}
                            data={data}
                            rowHeight={25}
                        />
                    )}
                </div>
                <div className={classNames(cls.right_side, {}, [])}>
                    <h5>Words 25</h5>
                    {isLoading || isLoading2 ? (
                        'Loading... '
                    ) : (
                        <Table
                            headerData={headerData}
                            data={data2}
                            rowHeight={25}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default memo(LeaderBoard)
