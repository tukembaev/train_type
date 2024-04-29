import {
    Theme,
    ThemeFooterTitle,
    ThemeTitle,
    useTheme,
} from 'app/providers/ThemeProvider'

import { FC, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Modal } from 'shared/ui/Modal/Modal'
import { Select } from 'shared/ui/Select/Select'
import cls from './Footer.module.scss'

const Footer: FC = () => {
    const { theme, toggleTheme } = useTheme()
    const [openThemeSelection, setOpenThemeSelection] = useState(false)

    const themes: { value: Theme; content: ThemeTitle }[] = [
        { value: Theme.LIGHT, content: ThemeTitle.LIGHT },
        { value: Theme.DARK, content: ThemeTitle.DARK },
        { value: Theme.PURPLEISH, content: ThemeTitle.PURPLEISH },
        { value: Theme.OLIVE, content: ThemeTitle.OLIVE },
        { value: Theme.ROSEPINDOWN, content: ThemeTitle.ROSEPINDOWN },
        { value: Theme.RETROCAST, content: ThemeTitle.RETROCAST },
    ]

    return (
        <div className={cls.wrapper}>
            <div className={cls.left_side}>
                <p>Only for educational and show case purpose</p>
            </div>

            <div className={cls.right_side}>
                <p
                    className={cls.theme_btn}
                    onClick={() => setOpenThemeSelection(true)}
                >
                    <i
                        className={classNames(cls.icon, {}, [
                            'fa-solid fa-palette',
                        ])}
                        data-tooltip-id="next"
                    />
                    {ThemeFooterTitle[theme]}
                </p>

                <p>
                    <i
                        className={classNames(cls.icon, {}, [
                            'fa-solid fa-code-branch',
                        ])}
                        data-tooltip-id="next"
                    />
                    version 1.01
                </p>
                <br />
                {/* <p>
                    <i
                        className={classNames(cls.icon, {}, [
                            'fa-solid fa-person-digging',
                        ])}
                        data-tooltip-id="next"
                    />
                    made by Arif T.
                </p> */}
            </div>
            <Modal
                isOpen={openThemeSelection}
                onClose={() => setOpenThemeSelection(false)}
                width="50%"
                height="90%"
            >
                <Select
                    options={themes}
                    currentTheme={theme}
                    onChange={toggleTheme}
                    onClick={() => setOpenThemeSelection(false)}
                />
            </Modal>
        </div>
    )
}

export default Footer
