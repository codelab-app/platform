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
  padding: 0,
}

export const cardStyle = {
  display: 'flex',
  alignItems: 'start',
  width: '400px',
  height: '400px',
  borderRadius: '10px',
  border: 'none',
  marginBottom: '2rem',
  boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
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
