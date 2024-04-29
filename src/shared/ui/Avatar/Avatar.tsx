import { classNames, Mods } from 'shared/lib/classNames/classNames'
import { CSSProperties, useMemo } from 'react'
import cls from './Avatar.module.scss'

interface AvatarProps {
    className?: string
    src: string
    size: number
    cover?: boolean
    alt?: string
}

export const Avatar = ({ className, src, size, cover, alt }: AvatarProps) => {
    const clsProp = useMemo<CSSProperties>(
        () => ({
            width: size || 100,
            height: size || 100,
        }),
        [size],
    )
    const mods: Mods = {
        [cls.cover]: cover,
    }
    return (
        <img
            src={src}
            alt={alt}
            style={clsProp}
            className={classNames(cls.Avatar, mods, [className])}
        />
    )
}
