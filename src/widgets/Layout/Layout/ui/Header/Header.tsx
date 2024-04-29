import { Block, BlockFlex } from 'shared/ui/Block/Block'

import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { classNames } from 'shared/lib/classNames/classNames'

import ProgressBar from '@ramonak/react-progress-bar'
import { LeaderBoard } from 'entities/LeaderBoard'
import { setReload } from 'features/TypingSession'

import { useGetUserByIdQuery, userAPI } from 'entities/User'
import { useDispatch } from 'react-redux'
import { USER_LOCALSTORAGE_ID } from 'shared/const/localstorage'
import { calculateLevelAndXP } from 'shared/lib/functions/userFunctions'
import { useWindowSize } from 'shared/lib/hooks/useWindowSize/useWindowSize'
import { Modal } from 'shared/ui/Modal/Modal'
import cls from './Header.module.scss'
import Logo from './Logo/Logo'

const Header: FC = () => {
    const { isTable, isMobile } = useWindowSize()

    const { data: userData } = useGetUserByIdQuery('')
    const { needToEarnXP } = calculateLevelAndXP(userData?.level ?? 0)
    const currentXP = userData?.currentXP ?? 0

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [openLeaderBoard, setOpenLeaderBoard] = useState(false)

    const handleReload = () => {
        dispatch(setReload())
        navigate('/')
    }
    const [showProgressBar, setShowProgressBar] = useState(false)
    useEffect(() => {
        if (currentXP >= 0) {
            setShowProgressBar(true)
            const timer = setTimeout(() => {
                setShowProgressBar(false)
            }, 2000)
            return () => clearTimeout(timer)
        }
        return () => {}
    }, [currentXP])

    return (
        <div className={cls.wrapper}>
            <div className={cls.left_side}>
                <div className={cls.brand}>
                    {isTable || isMobile ? null : <Logo />}
                    {isTable || isMobile ? null : (
                        <div className={cls.brand_name}>
                            <span>type fast</span>
                            <h2>traintype</h2>
                        </div>
                    )}

                    <div
                        className="flex_row5"
                        style={{
                            gap: '20px',
                            paddingLeft: '10px',
                            paddingBottom: '2px',
                        }}
                    >
                        <i
                            className={classNames(cls.header_icon, {}, [
                                'fa-regular fa-keyboard',
                            ])}
                            onClick={handleReload}
                        />
                        <i
                            className={classNames(cls.header_icon, {}, [
                                'fa-solid fa-chess-king',
                            ])}
                            onClick={() => setOpenLeaderBoard(true)}
                        />
                        <i
                            className={classNames(cls.header_icon, {}, [
                                'fa-solid fa-circle-info',
                            ])}
                            onClick={() => navigate('/about')}
                        />
                        <i
                            className={classNames(cls.header_icon, {}, [
                                'fa-solid fa-gear',
                            ])}
                            onClick={() => navigate('/settings')}
                        />
                    </div>
                </div>
            </div>
            <Block className={cls.right_side} flex={BlockFlex.ROW}>
                {userData ? (
                    <Block flex={BlockFlex.COLUMN}>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                paddingTop: '4px',
                            }}
                        >
                            <Block
                                flex={BlockFlex.ROW}
                                className={classNames(cls.user_block, {}, [
                                    showProgressBar ? cls.user_block_up : '',
                                    !showProgressBar ? cls.user_block_down : '',
                                ])}
                            >
                                {isMobile ? (
                                    <i
                                        className={classNames(
                                            cls.user_icon,
                                            {},
                                            ['fa-solid fa-circle-user'],
                                        )}
                                        onClick={() => navigate('/account')}
                                    />
                                ) : (
                                    <>
                                        <i
                                            className={classNames(
                                                cls.user_icon,
                                                {},
                                                ['fa-solid fa-circle-user'],
                                            )}
                                            onClick={() => navigate('/account')}
                                        />
                                        <p onClick={() => navigate('/account')}>
                                            {userData.username}
                                        </p>
                                        <span className={cls.user_level}>
                                            {userData?.level}
                                        </span>
                                    </>
                                )}
                            </Block>
                            {isMobile ? null : (
                                <ProgressBar
                                    className={classNames(
                                        cls.progress_bar,
                                        {},
                                        [
                                            showProgressBar
                                                ? cls.progress_show
                                                : '',
                                            !showProgressBar
                                                ? cls.progress_hide
                                                : '',
                                        ],
                                    )}
                                    baseBgColor="var(--primary-bg-color)"
                                    bgColor="var(--primary-color)"
                                    isLabelVisible={false}
                                    height="5px"
                                    width="100px"
                                    completed={currentXP}
                                    maxCompleted={needToEarnXP}
                                    transitionDuration="1s"
                                />
                            )}
                        </div>
                    </Block>
                ) : null}
                {/* {userData ? (
                    <i
                        className={classNames(cls.header_icon, {}, [
                            'fa-solid fa-bell',
                        ])}
                        style={{ padding: '4px 5px 0 5px' }}
                    />
                ) : null} */}
                {userData ? (
                    <i
                        className={classNames(cls.header_icon, {}, [
                            'fa-solid fa-arrow-right-from-bracket',
                        ])}
                        style={{ padding: '3px 5px 0 5px' }}
                        onClick={() => {
                            navigate('/login')
                            localStorage.removeItem(USER_LOCALSTORAGE_ID)
                            dispatch(userAPI.util.resetApiState())
                        }}
                    />
                ) : (
                    <i
                        className={classNames(cls.header_icon, {}, [
                            'fa-regular fa-user',
                        ])}
                        style={{ padding: '3px 5px 0 5px' }}
                        onClick={() => navigate('/login')}
                    />
                )}
            </Block>
            <Modal
                isOpen={openLeaderBoard}
                width="90%"
                onClose={() => setOpenLeaderBoard(false)}
            >
                <LeaderBoard update={openLeaderBoard} />
            </Modal>
        </div>
    )
}

export default Header
