import { isNumber } from 'remeda'

import { CssProperty } from './css'

export enum Side {
  Bottom = 'bottom',
  Center = 'center',
  Left = 'left',
  Right = 'right',
  Top = 'top',
}

export enum CssUnit {
  Auto = 'auto',
  CH = 'ch',
  EM = 'em',
  PERCENT = '%',
  PX = 'px',
  REM = 'rem',
  SVH = 'svh',
  SVW = 'svw',
  VH = 'vh',
  VW = 'vw',
}

export interface CssValue {
  unit?: CssUnit
  value?: number
}

export const combineCssValue = (value: CssValue) => {
  return `${value.value ?? 0}${value.unit ?? 'px'}`
}

export const parseCssValue = (value?: number | string): CssValue => {
  if (!value) {
    return {
      unit: CssUnit.PX,
      value: 0,
    }
  }

  if (isNumber(value)) {
    return {
      unit: CssUnit.PX,
      value: value,
    }
  }

  if (value === 'auto') {
    return {
      unit: CssUnit.Auto,
    }
  }

  const match = value.match(/^([\d.]+)([a-zA-Z%]+)$/)

  if (match) {
    return {
      unit: match[2] as CssUnit,
      value: parseFloat(match[1] ?? '0'),
    }
  }

  return {
    unit: CssUnit.PX,
    value: 0,
  }
}

export const getCursorForSide = (side: CssProperty) => {
  switch (side) {
    case CssProperty.Bottom:
      return 's-resize'
    case CssProperty.Right:
      return 'e-resize'
    case CssProperty.Top:
      return 'n-resize'
  }

  return 'w-resize'
}

export const getCursorForSideReversed = (side: CssProperty) => {
  switch (side) {
    case CssProperty.Bottom:
      return 'n-resize'
    case CssProperty.Right:
      return 'w-resize'
    case CssProperty.Top:
      return 's-resize'
  }

  return 'e-resize'
}
