import { createGlobalStyle } from 'styled-components'
import initThemes from './theme'
import normalizeCss from './normalize'

// ------------------------------------ //
// Theming
// ------------------------------------ //
const themeVars = {
  mainBackgroundColor: '--main-bg-color',
  mainTextColor: '--main-text-color',
  mainButtonColor: '--main-button-color',
  accentColor: '--accent-color',
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

// ------------------------------------ //
// Global styles
// ------------------------------------ //
const GlobalStyle = createGlobalStyle`
  :root {
    ${themeVars.mainBackgroundColor}: ${props =>
  props.theme[themeVars.mainBackgroundColor]};
    ${themeVars.mainTextColor}: ${props =>
  props.theme[themeVars.mainTextColor]};
    ${themeVars.mainButtonColor}: ${props =>
  props.theme[themeVars.mainButtonColor]};
  }
  /* Include the normalize css */
  ${normalizeCss}
  * {
    letter-spacing: 0.1em;
  }
  body {
    height: 98vh;
    width: 100vw;
    font-family: sans-serif;
  }
  /* Styling the root element */
  #root {
    height: 100%;
  }
`

const { ThemeProvider, SwitchThemeContext } = initThemes(themes)

export { ThemeProvider, SwitchThemeContext, GlobalStyle }
