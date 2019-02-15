import initThemes from './theme'

// ------------------------------------ //
// Theming
// ------------------------------------ //

const themeVars = {
  mainBackgroundColor: '--main-bg-color',
  mainTextColor: '--main-text-color',
  mainButtonColor: '--main-button-color',
}

const lightTheme = {
  [themeVars.mainBackgroundColor]: '#ffffff',
  [themeVars.mainTextColor]: '#000000',
  [themeVars.mainButtonColor]: '#ffffff',
}
const darkTheme = {
  [themeVars.mainBackgroundColor]: '#000000',
  [themeVars.mainTextColor]: '#ffffff',
  [themeVars.mainButtonColor]: '#000000',
}

const themes = {
  LIGHT: lightTheme,
  DARK: darkTheme,
}

const { ThemeProvider, SwitchThemeContext } = initThemes(themes)

export { ThemeProvider, SwitchThemeContext }
