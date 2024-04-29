import { memo, ReactNode, useMemo, useState } from 'react'
import { classNames, Mods } from 'shared/lib/classNames/classNames'
import { Block, BlockFlex } from '../Block/Block'
import cls from './Select.module.scss'

export interface SelectOption {
    value: string
    content: string
}

interface SelectProps {
    className?: string
    options?: SelectOption[]
    currentTheme?: string

    onChange?: (value: string) => void
    onClick?: () => void
    children?: ReactNode
}

export const Select = memo((props: SelectProps) => {
    const {
        className,
        options,
        onChange,
        onClick,

        currentTheme,
        children,
    } = props
    const [searchTerm, setSearchTerm] = useState('')

    const filteredOptions = useMemo(() => {
        return options?.filter((option) =>
            option.content.toLowerCase().includes(searchTerm.toLowerCase()),
        )
    }, [options, searchTerm])

    const optionsList = useMemo(
        () =>
            filteredOptions?.map((opt) => (
                <button
                    type="button"
                    className={classNames(
                        cls.option,
                        { [cls.active]: opt.value === currentTheme },
                        [],
                    )}
                    value={opt.value}
                    key={opt.value}
                    onClick={onClick}
                    onMouseEnter={() => {
                        if (onChange) {
                            setTimeout(() => {
                                onChange(opt.value)
                            }, 200)
                        }
                    }}
                >
                    <Block
                        flex={BlockFlex.ROW}
                        className={classNames(
                            cls.option_content,
                            { [cls.active]: opt.value === currentTheme },
                            [],
                        )}
                    >
                        <p>{opt.content}</p>
                        {children}
                    </Block>
                </button>
            )),
        [filteredOptions, children, onChange, currentTheme, onClick],
    )

    const mods: Mods = {}

    return (
        <div className={classNames(cls.Wrapper, mods, [className])}>
            <Block flex={BlockFlex.ROW} className={cls.search_wrapper}>
                <i
                    className={classNames(cls.search_icon, {}, [
                        'fa-solid fa-magnifying-glass',
                    ])}
                />
                <input
                    type="text"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                    placeholder="Search..."
                    className={cls.search_bar}
                />
            </Block>

            {optionsList}
        </div>
    )
})
