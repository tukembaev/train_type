import { FC, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Modal } from 'shared/ui/Modal/Modal'
import { Select } from 'shared/ui/Select/Select'
import {
    getLanguage,
    getMode,
    getText,
    setLanguage,
    typingLanguageSelection,
} from 'features/TypingSession'
import { useAppSelector } from 'app/providers/StoreProvider'
import { useDispatch } from 'react-redux'
import { Block, BlockFlex } from 'shared/ui/Block/Block'
import cls from './LanguageSelection.module.scss'

const LanguageSelection: FC = () => {
    const dispatch = useDispatch()
    const [openLanguageSelection, setOpenLanguageSelection] = useState(false)
    const currentMode = useAppSelector(getMode)
    const currentLanguage = useAppSelector(getLanguage)
    const isStarted = useAppSelector(getText)

    const languages: { value: string; content: typingLanguageSelection }[] = [
        { value: 'russian', content: typingLanguageSelection.RUSSIAN },
        { value: 'english', content: typingLanguageSelection.ENGLISH },
    ]

    const handleChangeLanguage = (language: string) => {
        dispatch(setLanguage(language))
        localStorage.setItem('last_language', language)
    }

    return (
        <div
            className={classNames(
                cls.wrapper,
                { [cls.visible]: isStarted },
                [],
            )}
        >
            {currentMode === 'zen' ? (
                <Block flex={BlockFlex.ROW}>
                    <p>
                        <i className="fa-solid fa-square-poll-vertical" />
                        <span className={cls.user_level}> Shift </span>+
                        <span className={cls.user_level}> Enter</span> to finish
                        zen
                    </p>
                </Block>
            ) : (
                <p
                    className={cls.language_btn}
                    onClick={() => setOpenLanguageSelection(true)}
                >
                    <i
                        className={classNames(cls.icon, {}, [
                            'fa-solid fa-language',
                        ])}
                        data-tooltip-id="next"
                    />
                    {currentLanguage}
                </p>
            )}

            <Modal
                isOpen={openLanguageSelection}
                onClose={() => setOpenLanguageSelection(false)}
                height="50%"
                width="40%"
            >
                <Select
                    options={languages}
                    currentTheme={currentLanguage}
                    onChange={handleChangeLanguage}
                    onClick={() => setOpenLanguageSelection(false)}
                />
            </Modal>
        </div>
    )
}

export default LanguageSelection
