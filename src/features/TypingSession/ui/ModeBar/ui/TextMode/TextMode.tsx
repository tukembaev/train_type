import { FC, memo } from 'react'

import { useAppSelector } from 'app/providers/StoreProvider'
import { getMode, selectMode } from 'features/TypingSession'
import { TypingSelection } from 'features/TypingSession/model/types/modsSchema'
import { useDispatch } from 'react-redux'
import { classNames } from 'shared/lib/classNames/classNames'
import { useWindowSize } from 'shared/lib/hooks/useWindowSize/useWindowSize'
import { Block, BlockFlex } from 'shared/ui/Block/Block'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import cls from './TextMode.module.scss'
//  если time then BUttonTheme = background for now it will be enough
const TextMode: FC = () => {
    const { isTable, isMobile } = useWindowSize()

    const iconClasses = {
        time: 'fa-solid fa-clock',
        words: 'fa-solid fa-font',
        quote: 'fa-solid fa-quote-left',
        zen: 'fa-solid fa-mountain',
    }
    const allMods = Object.values(TypingSelection)
    const selectedMode = useAppSelector(getMode)
    const dispatch = useDispatch()
    const handleSubmit = (value: string) => {
        dispatch(selectMode(value))
    }

    return (
        <Block
            flex={isTable || isMobile ? BlockFlex.COLUMN : BlockFlex.ROW}
            className={cls.wrapper}
        >
            {allMods?.map((value) => (
                <Button
                    key={value}
                    theme={
                        isTable || isMobile
                            ? ButtonTheme.BACKGROUND
                            : ButtonTheme.CLEAR
                    }
                    active={value === selectedMode ? true : undefined}
                    onClick={() => handleSubmit(value)}
                    className={cls.button}
                >
                    {iconClasses[value] && (
                        <i
                            className={classNames(cls.icon, {}, [
                                iconClasses[value],
                            ])}
                        />
                    )}{' '}
                    {value}
                </Button>
            ))}
        </Block>
    )
}

export default memo(TextMode)
