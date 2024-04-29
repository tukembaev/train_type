import { useContext } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext';

interface UseThemeResult {
    toggleTheme: (theme: string) => void;
    theme: Theme;
}

export function useTheme(): UseThemeResult {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = (theme: string) => {
        let newTheme: Theme;
        switch (theme) {
        case Theme.DARK:
            newTheme = Theme.DARK;
            break;
        case Theme.LIGHT:
            newTheme = Theme.LIGHT;
            break;
        case Theme.PURPLEISH:
            newTheme = Theme.PURPLEISH;
            break;
        case Theme.OLIVE:
            newTheme = Theme.OLIVE;
            break;
        case Theme.RETROCAST:
            newTheme = Theme.RETROCAST;
            break;    
        case Theme.ROSEPINDOWN:
            newTheme = Theme.ROSEPINDOWN;
            break;
        default:
            newTheme = Theme.LIGHT;
        }
        setTheme?.(newTheme);
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    };

    return {
        theme: theme || Theme.LIGHT,
        toggleTheme,
    };
}
