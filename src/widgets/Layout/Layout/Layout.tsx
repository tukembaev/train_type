import { useImportThemes } from 'app/providers/ThemeProvider'
import 'app/styles/variables/global.scss'
import { FC, ReactNode, memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'

import cls from './Layout.module.scss'

import Footer from './ui/Footer/Footer'
import Header from './ui/Header/Header'

interface LayoutProps {
    children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
    const importedTheme = useImportThemes()
    return (
        <div className={classNames(cls.wrapper, {}, [importedTheme])}>
            <div className={classNames(cls.wrapper_content)}>
                <Header />
                <div className={cls.children_wrapper}>{children}</div>
                <Footer />
            </div>
        </div>
    )
}

export default memo(Layout)
