import { FC, memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { classNames } from 'shared/lib/classNames/classNames'
import { Block, BlockFlex } from 'shared/ui/Block/Block'
import { useDispatch } from 'react-redux'

import { Tooltip } from 'react-tooltip'
import { setReload } from 'features/TypingSession'
import { SessionStatistic } from 'entities/Session'
import ConfettiExplosion from 'react-confetti-explosion'
import cls from './SessionResultPage.module.scss'

const SessionResultPage: FC = () => {
    const [isConfetii, setIsConfetii] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleReload = () => {
        dispatch(setReload())
        navigate('/')
    }

    return (
        <Block className={classNames(cls.wrapper, {}, [])}>
            {isConfetii && (
                <ConfettiExplosion
                    force={0.2}
                    duration={4000}
                    particleCount={40}
                    width={3200}
                />
            )}
            <div className={classNames(cls.top, {}, [])}>
                <SessionStatistic setIsConfetii={setIsConfetii} />
            </div>
            <Block flex={BlockFlex.ROW} className={cls.actions}>
                <i
                    className={classNames(cls.icon, {}, [
                        'fa-solid fa-chevron-right',
                    ])}
                    onClick={handleReload}
                    data-tooltip-id="next"
                />

                {/* <i
                    className={classNames(cls.icon, {}, [
                        'fa-solid fa-rotate-right',
                    ])}
                    onClick={handleReload}
                    data-tooltip-id="repeat"
                /> */}
            </Block>
            <Tooltip id="next" place="bottom" content="next session" />
            <Tooltip id="repeat" place="bottom" content="repeat" />
        </Block>
    )
}

export default memo(SessionResultPage)
