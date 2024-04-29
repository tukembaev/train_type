import { FC, memo, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { Block, BlockFlex } from 'shared/ui/Block/Block'
import { useGetUserByIdQuery, useGetUserStatisticQuery } from 'entities/User'

import { formatOverallTimeSpended } from 'shared/lib/functions/dateFunction'

import ProgressBar from '@ramonak/react-progress-bar'
import { calculateLevelAndXP } from 'shared/lib/functions/userFunctions'

import { Tooltip } from 'react-tooltip'
import { useWindowSize } from 'shared/lib/hooks/useWindowSize/useWindowSize'
import { Modal } from 'shared/ui/Modal/Modal'
import cls from './UserInfo.module.scss'

import EditUser from './EditUser/EditUser'

const UserInfo: FC = () => {
    const { data: userData } = useGetUserByIdQuery('')
    const { data: userStatistic } = useGetUserStatisticQuery('')
    const [openUpdateProfileData, setOpenUpdateProfileData] = useState(false)

    const { needToEarnXP } = calculateLevelAndXP(userData?.level ?? 0)
    const { isPC, isTable, isMobile } = useWindowSize()
    const currentXP = userData?.currentXP ?? 0

    return (
        <Block bg flex={BlockFlex.ROW} className={cls.wrapper}>
            <Block flex={BlockFlex.COLUMN}>
                <Block flex={BlockFlex.ROW}>
                    <Avatar src={userData?.avatar || ''} size={90} cover />
                    <Block flex={BlockFlex.COLUMN} className={cls.username}>
                        <h1>{userData?.username}</h1>
                        <span>Joined 13 Nov 2023</span>
                    </Block>
                </Block>
                <Block flex={BlockFlex.ROW} className={cls.level_progress}>
                    <h4 data-tooltip-id="user-xp">{userData?.level}</h4>
                    <div
                        data-tooltip-id="level-percentage"
                        style={{ cursor: 'pointer' }}
                    >
                        <ProgressBar
                            baseBgColor="var(--primary-bg-color)"
                            bgColor="var(--primary-color)"
                            isLabelVisible={false}
                            height="8px"
                            width={
                                isTable ? '320px' : isMobile ? '100px' : '160px'
                            }
                            completed={currentXP}
                            maxCompleted={needToEarnXP}
                        />
                    </div>

                    <span data-tooltip-id="xp-needed">
                        {currentXP?.toFixed(1)}/{needToEarnXP?.toFixed(1)}
                    </span>
                </Block>
            </Block>
            {isPC ? <span className={cls.separator}> </span> : null}
            <Block flex={BlockFlex.COLUMN} className={cls.overall_statistic}>
                <span>tests started</span>
                <h4>{userStatistic?.completed_tests ?? '-'}</h4>
                <span>highest wpm</span>
                <h4>{userStatistic?.highest_wpm?.toFixed(0) ?? '-'}</h4>
                <span>time typing</span>
                <h4>
                    {formatOverallTimeSpended(
                        userStatistic?.overall_spended_time ?? 0,
                    )}
                </h4>
            </Block>
            {isPC ? <span className={cls.separator}> </span> : null}
            <Block flex={BlockFlex.COLUMN} className={cls.bio}>
                <div>
                    <span>bio</span>
                    <p style={{ wordBreak: 'break-word' }}>{userData?.bio}</p>
                </div>
                <div>
                    <span>keyboard</span>
                    <p>{userData?.keyboard_model}</p>
                </div>
            </Block>
            {isPC ? <span className={cls.separator}> </span> : null}

            <Block flex={BlockFlex.COLUMN} className={cls.actions}>
                <div>
                    <i
                        className={classNames(cls.icon, {}, [
                            'fa-solid fa-edit',
                        ])}
                        onClick={() => setOpenUpdateProfileData(true)}
                    />
                </div>
            </Block>
            <Tooltip
                id="level-percentage"
                place="top"
                content={`${((currentXP / needToEarnXP) * 100)?.toFixed(0)}%`}
            />
            <Tooltip id="user-xp" place="top" content={currentXP.toString()} />
            <Tooltip
                id="xp-needed"
                place="top"
                content={`${(
                    needToEarnXP - currentXP
                ).toString()} xp until next level`}
            />
            <Modal
                isOpen={openUpdateProfileData}
                onClose={() => setOpenUpdateProfileData(false)}
                height="85%"
                width="50%"
            >
                <EditUser closeEditUser={setOpenUpdateProfileData} />
            </Modal>
        </Block>
    )
}

export default memo(UserInfo)
