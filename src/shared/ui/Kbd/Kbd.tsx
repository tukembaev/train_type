import { FC, ReactNode } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Kbd.module.scss'

interface KbdProps {
    width?: string | number
    children: ReactNode
}

const Kbd: FC<KbdProps> = ({ children, width }) => {
    return (
        <div
            style={{ width }}
            className={classNames(cls.wrapper, {}, [])}
        >
            {children}
        </div>
    )
}

export default Kbd
