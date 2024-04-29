import { classNames, Mods } from 'shared/lib/classNames/classNames'
import React, { memo } from 'react'
import cls from './Block.module.scss'

export enum BlockFlex {
    ROW = 'flex_row10',
    COLUMN = 'flex_column10',
}

interface BlockProps {
    className?: string
    bg?: boolean
    hover?: boolean
    flex?: BlockFlex
    children: React.ReactNode
}

export const Block = memo((props: BlockProps) => {
    const {
        className,
        children,
        bg,
        hover,

        flex = BlockFlex.COLUMN,
    } = props

    const mods: Mods = {
        [cls.bg]: bg,
        [cls.hover]: hover,
        [cls[flex]]: true,
    }

    return (
        <div className={classNames(cls.block, mods, [className])}>
            {children}
        </div>
    )
})
