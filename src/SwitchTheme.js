// @flow
import React from 'react'
import styled from 'styled-components'
import { useSwitchTheme, themeVars } from './app-theme'

const SC = {
  switchWrapper: styled.div`
    position: fixed;
    bottom: 150px;
    text-align: center;
  `,
  switchTitle: styled.h3`
    color: var(${themeVars.textColor});
    font-size: 0.9rem;
  `,
  switchButton: styled.button`
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
    <SC.switchWrapper>
      <SC.switchTitle>Try to switch theme</SC.switchTitle>
      <SC.switchButton onClick={() => switchTheme('LIGHT')}>
        Light
      </SC.switchButton>
      <SC.switchButton onClick={() => switchTheme('DARK')}>
        Dark
      </SC.switchButton>
    </SC.switchWrapper>
  )
}

export default SwitchTheme
