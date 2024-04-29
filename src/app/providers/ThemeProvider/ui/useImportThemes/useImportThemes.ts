import { useTheme } from 'app/providers/ThemeProvider';
import { useCallback, useEffect } from 'react';

const importThemes = async () => {
  try {
    const themeImports = {
      layout_dark_theme: import('app/styles/themes/dark.scss'),
      layout_light_theme: import('app/styles/themes/light.scss'),
      layout_purpleish_theme: import('app/styles/themes/purpleish.scss'),
      layout_olive_theme: import('app/styles/themes/olive.scss'),
      layout_rosepindown_theme: import('app/styles/themes/rosepindown.scss'),
      layout_retrocast_theme: import('app/styles/themes/retrocast.scss'),
    };

    await Promise.all(Object.values(themeImports));
  } catch (error) {
    console.error('Error importing themes:', error);
  }
};

const useImportThemes = () => {
  const { theme } = useTheme();
  const loadThemes = useCallback(async () => {
    await importThemes();
  }, [theme]);

  useEffect(() => {
    loadThemes();
  }, [loadThemes]);

  return theme;
};

export default useImportThemes;
