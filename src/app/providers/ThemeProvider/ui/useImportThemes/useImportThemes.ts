
import { useTheme } from 'app/providers/ThemeProvider';
import { useCallback, useEffect } from 'react';

const importThemes = async (theme: string): Promise<void> => {
  try {
    if (theme === 'layout_dark_theme') {
      await import('app/styles/themes/dark.scss');
    } else if (theme === 'layout_light_theme') {
      await import('app/styles/themes/light.scss');
    } else if (theme === 'layout_purpleish_theme') {
      await import('app/styles/themes/purpleish.scss');
    } else if (theme === 'layout_olive_theme') {
      await import('app/styles/themes/olive.scss');
    } else if (theme === 'layout_rosepindown_theme') {
      await import('app/styles/themes/rosepindown.scss');
    } else if (theme === 'layout_retrocast_theme') {
      await import('app/styles/themes/retrocast.scss');
    }
  } catch (error) {
    console.error('Error importing theme:', error);
  }
};

const useImportThemes = () => {
  const { theme } = useTheme();
  const loadTheme = useCallback(async () => {
    await importThemes(theme);
  }, [theme]);

  useEffect(() => {
    loadTheme();
  }, [loadTheme]);
  return theme;
};

export default useImportThemes;
