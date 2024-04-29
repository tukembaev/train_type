import { classNames } from 'shared/lib/classNames/classNames'
import { FC } from 'react'

import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import cls from './ErrorWidget.module.scss'

interface ErrorWidgetProps {
    className?: string
}

export const ErrorWidget: FC<ErrorWidgetProps> = ({
    className,
}: ErrorWidgetProps) => {
    const reloadPage = () => {
        // eslint-disable-next-line no-restricted-globals
        location.reload()
    }

    return (
        <div className={classNames(cls.ErrorWidget, {}, [className])}>
            <p>Произошла непредвиденная ошибка</p>
            <Button theme={ButtonTheme.BACKGROUND} onClick={reloadPage}>
                Обновить страницу
            </Button>
        </div>
    )
}
