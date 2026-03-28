import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SCHEMES = {
  forest: {
    name: 'Forest',
    bg: '#0f1f1a',
    surface: '#1a3c34',
    card: '#243d36',
    primary: '#2d5a4a',
    accent: '#7cb342',
    text: '#e8f0ed',
    textMuted: '#9cb5ad',
    border: '#2d5a4a',
  },
  earth: {
    name: 'Earth',
    bg: '#1c1912',
    surface: '#2d2819',
    card: '#3d3520',
    primary: '#5c4a32',
    accent: '#c4a35a',
    text: '#f0ebe0',
    textMuted: '#a89f8c',
    border: '#5c4a32',
  },
  sage: {
    name: 'Sage',
    bg: '#141c18',
    surface: '#1e2e26',
    card: '#2a4034',
    primary: '#3d5c4d',
    accent: '#8fbc8f',
    text: '#e2ede8',
    textMuted: '#8fa89a',
    border: '#3d5c4d',
  },
};

const STORAGE_KEYS = {
  scheme: '@agrobot/scheme',
  fontSize: '@agrobot/fontSize',
  background: '@agrobot/background',
};

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [scheme, setSchemeState] = useState('forest');
  const [fontSize, setFontSizeState] = useState('medium'); // small | medium | large
  const [background, setBackground] = useState('default'); // default | light | dark

  const base = SCHEMES[scheme];
  const bgOverride =
    background === 'light'
      ? { bg: '#2a4034', surface: '#3d5c4d', card: '#4a6b5a' }
      : background === 'dark'
        ? { bg: '#0a1410', surface: '#0f1f1a', card: '#152520' }
        : {};
  const theme = {
    ...base,
    ...bgOverride,
    fontSize: fontSize === 'small' ? 14 : fontSize === 'large' ? 18 : 16,
    fontSizeSmall: fontSize === 'small' ? 12 : fontSize === 'large' ? 16 : 14,
    fontSizeLarge: fontSize === 'small' ? 18 : fontSize === 'large' ? 24 : 20,
  };

  useEffect(() => {
    (async () => {
      try {
        const [s, f, b] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.scheme),
          AsyncStorage.getItem(STORAGE_KEYS.fontSize),
          AsyncStorage.getItem(STORAGE_KEYS.background),
        ]);
        if (s && SCHEMES[s]) setSchemeState(s);
        if (f) setFontSizeState(f);
        if (b) setBackground(b);
      } catch (_) {}
    })();
  }, []);

  const setScheme = async (value) => {
    if (!SCHEMES[value]) return;
    setSchemeState(value);
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.scheme, value);
    } catch (_) {}
  };

  const setFontSize = async (value) => {
    setFontSizeState(value);
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.fontSize, value);
    } catch (_) {}
  };

  const setBackgroundPref = async (value) => {
    setBackground(value);
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.background, value);
    } catch (_) {}
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        scheme,
        setScheme,
        fontSize,
        setFontSize,
        background,
        setBackground: setBackgroundPref,
        schemes: Object.keys(SCHEMES),
        schemeNames: SCHEMES,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
