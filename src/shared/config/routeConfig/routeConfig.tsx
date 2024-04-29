import { TypingPage } from 'pages/TypingPage'
import { NotFoundPage } from 'pages/NotFoundPage'
import { RouteProps } from 'react-router-dom'
import { SessionResultPage } from 'pages/SessionResultPage'
import { AboutPage } from 'pages/AboutPage'

import { LoginPage } from 'pages/LoginPage'
import { ProfilePageAsync } from 'pages/ProfilePage/ui/ProfilePage.async'
import { SettingsPageAsync } from 'pages/SettingsPage'

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean
}

export enum AppRoutes {
    LOGIN = 'login',
    MAIN = 'main',
    SESSION_STAT = 'session_stat',
    ABOUT = 'about',
    PROFILE = 'profile',
    SETTINGS = 'settings',

    // last
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.LOGIN]: '/login',
    [AppRoutes.MAIN]: '/',
    [AppRoutes.SESSION_STAT]: '/session_stat',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.PROFILE]: '/account',
    [AppRoutes.SETTINGS]: '/settings',

    // последний
    [AppRoutes.NOT_FOUND]: '*',
}

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.LOGIN]: {
        path: RoutePath.login,
        element: <LoginPage />,
    },
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <TypingPage />,
    },
    [AppRoutes.SESSION_STAT]: {
        path: RoutePath.session_stat,
        element: <SessionResultPage />,
    },
    [AppRoutes.ABOUT]: {
        path: RoutePath.about,
        element: <AboutPage />,
    },
    [AppRoutes.PROFILE]: {
        path: RoutePath.profile,
        element: <ProfilePageAsync />,
    },
    [AppRoutes.SETTINGS]: {
        path: RoutePath.settings,
        element: <SettingsPageAsync />,
    },
    // last
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
}
