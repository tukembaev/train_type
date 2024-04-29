import { createContext } from 'react';

export enum Theme {
    LIGHT = 'layout_light_theme',
    DARK = 'layout_dark_theme',
    PURPLEISH = 'layout_purpleish_theme',
    OLIVE = 'layout_olive_theme',
    ROSEPINDOWN = 'layout_rosepindown_theme',
    RETROCAST = 'layout_retrocast_theme',

}


export enum ThemeTitle {
    LIGHT = 'light',
    DARK = 'dark',
    PURPLEISH = 'purpleish',
    OLIVE = 'olive',
    ROSEPINDOWN = 'rosepindown',
    RETROCAST = 'retrocast',

}
export const ThemeFooterTitle: Record<Theme, string> = {
    [Theme.LIGHT]: 'light',
    [Theme.DARK]: 'dark',
    [Theme.PURPLEISH]: 'purpleish',
    [Theme.OLIVE]: 'olive',
    [Theme.ROSEPINDOWN]: 'rosepindown',
    [Theme.RETROCAST]: 'retrocast',

}


export interface ThemeContextProps {
    theme?: Theme;
    setTheme?: (theme: Theme) => void; 
}

export const ThemeContext = createContext<ThemeContextProps>({});

export const LOCAL_STORAGE_THEME_KEY = 'theme';
