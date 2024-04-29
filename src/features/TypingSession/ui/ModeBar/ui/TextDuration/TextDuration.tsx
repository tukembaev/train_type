import { useAppSelector } from 'app/providers/StoreProvider'
import { getDuration, getMode, selectDuration } from 'features/TypingSession'
import Cookies from 'js-cookie'
import { FC, memo, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useWindowSize } from 'shared/lib/hooks/useWindowSize/useWindowSize'
import { Block, BlockFlex } from 'shared/ui/Block/Block'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import {
    QuoteType,
    TimeDuration,
    WordsQuantity,
} from '../../../../model/types/modsSchema'
import cls from './TextDuration.module.scss'

const TextDuration: FC = () => {
    const { isTable, isMobile } = useWindowSize()

    let duration: any = []
    const selectedMode = useAppSelector(getMode)
    if (selectedMode === 'time') {
        duration = Object.values(TimeDuration).filter(
            (value) => typeof value === 'number',
        )
    } else if (selectedMode === 'words') {
        duration = Object.values(WordsQuantity).filter(
            (value) => typeof value === 'number',
        )
    } else if (selectedMode === 'quote') {
        duration = Object.values(QuoteType)
    } else {
        duration = undefined
    }
    const selectedDuration = useAppSelector(getDuration)
    const dispatch = useDispatch()

    useEffect(() => {
        let lastDuration: number | string = ''
        if (selectedMode === 'time') {
            const durationFromCookie = Cookies.get('last_time_duration')
            if (durationFromCookie) {
                lastDuration = parseInt(durationFromCookie, 10)
            } else {
                lastDuration = 30
            }
        }
        if (selectedMode === 'words') {
            const durationFromCookie = Cookies.get('last_words_duration')
            if (durationFromCookie) {
                lastDuration = parseInt(durationFromCookie, 10)
            } else {
                lastDuration = 25
            }
        }
        if (selectedMode === 'quote') {
            const durationFromCookie = Cookies.get('last_quote_duration')
            if (durationFromCookie) {
                lastDuration = durationFromCookie
            } else {
                lastDuration = 'short'
            }
        }
        dispatch(selectDuration(lastDuration))
    }, [dispatch, selectedMode])

    if (!duration) {
        return null
    }

    const handleSubmit = (value: string | number) => {
        if (selectedMode === 'time') {
            Cookies.set('last_time_duration', value.toString())
        }
        if (selectedMode === 'words') {
            Cookies.set('last_words_duration', value.toString())
        }
        if (selectedMode === 'quote') {
            Cookies.set('last_quote_duration', value.toString())
        }
        dispatch(selectDuration(value))
    }

    return (
        <Block
            className={cls.wrapper}
            flex={isTable || isMobile ? BlockFlex.COLUMN : BlockFlex.ROW}
        >
            <span className={cls.separator}> </span>

            {duration?.map((value: any) => (
                <Button
                    key={value}
                    theme={
                        isTable || isMobile
                            ? ButtonTheme.BACKGROUND
                            : ButtonTheme.CLEAR
                    }
                    active={value === selectedDuration ? true : undefined}
                    onClick={() => handleSubmit(value)}
                    className={cls.button}
                >
                    {value}
                </Button>
            ))}
        </Block>
    )
}

export default memo(TextDuration)
