import { useAppSelector } from 'app/providers/StoreProvider'
import { getFilter, getMode, toggleFilter } from 'features/TypingSession'
import { FC, memo } from 'react'
import { useDispatch } from 'react-redux'
import { classNames } from 'shared/lib/classNames/classNames'
import { useWindowSize } from 'shared/lib/hooks/useWindowSize/useWindowSize'
import { Block, BlockFlex } from 'shared/ui/Block/Block'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { FilterTextType } from '../../../../model/types/modsSchema'
import cls from './TextFilter.module.scss'

const TextFilter: FC = () => {
    const iconClasses = {
        punctuation: 'fa-solid fa-at',
        numbers: 'fa-solid fa-hashtag',
    }
    const { isTable, isMobile } = useWindowSize()

    const filters = Object.values(FilterTextType)
    const selectedFilters = useAppSelector(getFilter)
    const selectedMode = useAppSelector(getMode)
    const dispatch = useDispatch()
    const handleFilterToggle = (filter: FilterTextType) => {
        dispatch(toggleFilter(filter))
    }

    if (selectedMode === 'zen' || selectedMode === 'quote') {
        return null
    }

    return (
        <Block
            flex={isTable || isMobile ? BlockFlex.COLUMN : BlockFlex.ROW}
            className={cls.wrapper}
        >
            {filters?.map((item) => (
                <Button
                    key={item}
                    theme={
                        isTable || isMobile
                            ? ButtonTheme.BACKGROUND
                            : ButtonTheme.CLEAR
                    }
                    active={selectedFilters?.includes(item)}
                    onClick={() => handleFilterToggle(item)}
                    className={cls.button}
                >
                    {iconClasses[item] && (
                        <i
                            className={classNames(cls.icon, {}, [
                                iconClasses[item],
                            ])}
                        />
                    )}{' '}
                    {item}
                </Button>
            ))}

            <span className={cls.separator}> </span>
        </Block>
    )
}

export default memo(TextFilter)
