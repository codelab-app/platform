import { css } from 'styled-components'

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
  lg: 12,
  md: 12,
  sm: 24,
  style: {
    alignSelf: 'stretch',
    display: 'inline-flex',
  },
  xs: 24,
}

export const threeGridCol = {
  lg: 8,
  md: 8,
  sm: 12,
  xs: 24,
}

export const alignFullGridStyle = {
  alignSelf: 'stretch',
  display: 'inline-flex',
}

export const cardStyle = {
  alignItems: 'center',
  display: 'flex',
  width: '100%',
}

export const padding = {
  lg: 24,
  md: 16,
  sm: 8,
}

export const contentStyle = {
  minHeight: 'initial',
  padding: padding.sm,
}
