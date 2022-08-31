import { css } from '@emotion/react'

export const sectionStyle = {
  margin: '1rem',
}

export const menuFloatRight = {}

export const disableMenuHoverEffects = {
  backgroundColor: 'initial',
  cursor: 'inherit',
}

export const removeHoverBorder = css`
  &:hover::after {
    border-color: transparent !important;
  }
`

export const twoGridCol = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  style: {
    display: 'inline-flex',
    alignSelf: 'stretch',
  },
}

export const threeGridCol = {
  xs: 24,
  sm: 12,
  md: 8,
  lg: 8,
}

export const alignFullGridStyle = {
  display: 'inline-flex',
  alignSelf: 'stretch',
}

export const cardStyle = {
  display: 'flex',
  alignItems: 'start',
  width: '100%',
  height: '300px',
}

export const padding = {
  sm: 8,
  md: 16,
  lg: 24,
}

export const contentStyle = {
  padding: padding.sm,
  minHeight: 'initial',
}
