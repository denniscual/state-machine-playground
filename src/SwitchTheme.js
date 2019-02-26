// @flow
import React from 'react'
import styled from 'styled-components'
import { useSwitchTheme, themeVars } from './app-theme'

const SC = {
  switch: styled.div`
    position: fixed;
    bottom: 150px;
    text-align: center;
  `,
  switch__title: styled.h3`
    color: var(${themeVars.textColor});
    font-size: 0.9rem;
  `,
  switch__button: styled.button`
    background-color: var(${themeVars.backgroundColor});
    border: 0;
    color: var(${themeVars.textColor});
    text-decoration: underline;
    outline: 0;
  `,
}

function SwitchTheme() {
  const switchTheme = useSwitchTheme()
  return (
    <SC.switch>
      <SC.switch__title>Try to switch theme</SC.switch__title>
      <SC.switch__button onClick={() => switchTheme('DARK')}>
        Dark
      </SC.switch__button>
      <SC.switch__button onClick={() => switchTheme('LIGHT')}>
        Light
      </SC.switch__button>
      <SC.switch__button onClick={() => switchTheme('INDIGO')}>
        Indigo
      </SC.switch__button>
    </SC.switch>
  )
}

export default SwitchTheme
