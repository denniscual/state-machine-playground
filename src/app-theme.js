// @flow
import { createGlobalStyle } from 'styled-components'
import initThemes from './theme'
import normalizeCss from './normalize'

// ------------------------------------ //
// Theming
// ------------------------------------ //
const themeVars = {
  backgroundColor: '--bg-color',
  textColor: '--text-color',
  buttonColor: '--button-color',
  buttonTextColor: '--button-text-color',
  borderColor: '--border-color',
}

const lightTheme = {
  [themeVars.backgroundColor]: '#ffffff',
  [themeVars.textColor]: '#000000',
  [themeVars.buttonColor]: '#000000',
  [themeVars.buttonTextColor]: '#ffffff',
  [themeVars.borderColor]: '#000000',
}
const darkTheme = {
  [themeVars.backgroundColor]: '#000000',
  [themeVars.textColor]: '#ffffff',
  [themeVars.buttonColor]: '#ffffff',
  [themeVars.buttonTextColor]: '#000000',
  [themeVars.borderColor]: '#ffffff',
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
    ${themeVars.backgroundColor}: ${props =>
  /* $FlowFixMe */
  props.theme[themeVars.backgroundColor]};
    ${themeVars.textColor}: ${props =>
  /* $FlowFixMe */
  props.theme[themeVars.textColor]};
    ${themeVars.buttonColor}: ${props =>
  /* $FlowFixMe */
  props.theme[themeVars.buttonColor]};
    ${themeVars.buttonTextColor}: ${props =>
  /* $FlowFixMe */
  props.theme[themeVars.buttonTextColor]};
    ${themeVars.borderColor}: ${props =>
  /* $FlowFixMe */
  props.theme[themeVars.borderColor]};
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

const { ThemeProvider, useSwitchTheme } = initThemes(themes)

export { ThemeProvider, useSwitchTheme, GlobalStyle, themeVars }
